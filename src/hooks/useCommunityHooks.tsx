import { collection, doc, getDocs, increment, writeBatch } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import { authModalState } from '../atoms/authModalAtom';
import { Community, CommunitySnippet, communityState } from '../atoms/communitiesAtom';
import { auth, firestore } from '../firebase/clientApp';

const useCommunityHooks= () => {
    const [communityStateValue,setCommunityStateValue]=useRecoilState(communityState);
    const [modalState,setModalState]=useRecoilState(authModalState)
    const [user]=useAuthState(auth);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState('')
    const onJoinOrlLeaveCommunity=(communityData:Community,isJoined:boolean)=>{
    // If user is not signed in 
    if(!user)
    {
        setModalState((prev)=>({...prev,open:true,view:'login'}))
        return ;
    }
     
    // if user is signed in 
    if(isJoined)
    {
        leaveCommunity(communityData.id)
        return ;
    }
    joinCommunity(communityData)

    }
    const getMySnippets=async()=>{
        setLoading(true)
        try {
            const snippetDocs=await getDocs(collection(firestore,`/users/${user?.uid}/communitySnippets`))
            const snippetsArray=snippetDocs.docs.map((doc)=>({...doc.data()}))
           
            setCommunityStateValue(item=>({...item,mySnippets:snippetsArray as CommunitySnippet[]}))
        } catch (error) {
            console.log("Here is error from getMSnippets",error)
        }
        finally{
            setLoading(false)
        }
    }
    const joinCommunity=async (communityData:Community)=>{
        // batch write 
        // creating  a new community snippet
        try {
            setLoading(true)
        const batch=writeBatch(firestore);
        const newSnippet:CommunitySnippet={
            communityId:communityData.id,
            imageURL:communityData.imageURL||"",
        }
        batch.set(doc(firestore,`/users/${user?.uid}/communitySnippets/`,communityData.id),newSnippet)
        batch.update(doc(firestore,`communities`,communityData.id),{
            numberOfMembers:increment(1),
        })
        await batch.commit();
        // update the locale communityState
        setCommunityStateValue(prev=>({...prev,mySnippets:[...prev.mySnippets,newSnippet]}))
        } catch (error:any) {
            console.log("Join Community Error",error.message)
            setError(error.message)
            
        }
        finally{
            setLoading(false);
        }
    }
    const leaveCommunity=async(communityId:string)=>{
        try {
            setLoading(true);
            // Create the batch
            const batch=writeBatch(firestore);
            // delete the document
            batch.delete(doc(firestore,`/users/${user?.uid}/communitySnippets/`,communityId));
            // update the community
            batch.update(doc(firestore,`communities`,communityId),{
                numberOfMembers:increment(-1),
            })
            // commit the transactions
            await batch.commit();
            // update the recoil state
            setCommunityStateValue(prev=>({...prev,mySnippets:prev.mySnippets.filter(item=>item.communityId!==communityId)}))


        } catch (error:any) {
            console.log("Leave Community Error",error.message)
            setError(error.message)
            
        }
        finally{
           setLoading(false);
        }
    }

    useEffect(()=>{
        if(!user)
        {
            return ;
        }
        getMySnippets();
    },[user])
    return {
        communityStateValue,
        onJoinOrlLeaveCommunity,
        loading,
        error
    }

}
export default useCommunityHooks;
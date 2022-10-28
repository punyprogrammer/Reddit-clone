import { collection, getDocs } from 'firebase/firestore';
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
    if(!modalState.open)
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
            console.log(snippetDocs.docs)
            console.log("Here are the snippets",snippetsArray)
            setCommunityStateValue(item=>({...item,mySnippets:snippetsArray as CommunitySnippet[]}))
        } catch (error) {
            console.log("Here is error from getMSnippets",error)
        }
        finally{
            setLoading(false)
        }
    }
    const joinCommunity=(communityData:Community)=>{}
    const leaveCommunity=(communitId:string)=>{}

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
import { collection, deleteDoc, doc, writeBatch } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState } from 'recoil'
import { Post, postState, PostVote } from '../atoms/postsAtoms'
import { auth, firestore, storage } from '../firebase/clientApp'

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState)
  const [user]=useAuthState(auth)
  const onVote = async (post:Post,communityId:string,vote:number) => {

    try {
       const {voteStatus}=post;
       const existingVote=postStateValue.postVotes.find(vote=>vote.postId===post.id);
       const batch=writeBatch(firestore);
       const updatedPost={...post};
       const updatedPostState={...postStateValue.posts};
       let updatedPostVotes={...postStateValue.postVotes};
       let voteChange=vote;


      if(!existingVote){    
        // Create a new postVote document
        const postVotesRef=doc(collection(firestore,'users',`${user?.uid}/postVotes`));
        const newVote:PostVote={
          id:postVotesRef.id,
          communityId,
          postId:post.id!,
          voteValue:vote,
        }
        // update docRef
        batch.set(postVotesRef,newVote)
        
        //If the user is voting for the first time on this post
        // Add subtract one from vote status 
        updatedPost.voteStatus=voteStatus+vote;
        updatedPostVotes=[...updatedPostVotes,newVote];




  
  
      }
      else{          //If  the user is removing an existing vote 
  
      }
    } catch (error) {
      console.log("on Vote error" ,error);
      
    }

  }
  const onSelectPost = () => {}

  const onDeletePost = async (post:Post):Promise<boolean> => {
   try {
    // check if image is attached with post -->delete from storage
    if(post.imageURL)
    {
      const imageRef=ref(storage,`posts/${post.id}/image`);
      await deleteObject(imageRef);
    }
    // delete post doc from firestore
    const postDocRef=doc(firestore,'posts',post.id!);
    await deleteDoc(postDocRef);


    // update currentPostStats
    setPostStateValue(prev=>({...prev,posts:prev.posts.filter(item=>item.id!==post.id)}))
   }
    catch (error) {
    return false;
   }


    return true;


  }

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  }
}
export default usePosts

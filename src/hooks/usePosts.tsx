import { deleteDoc, doc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import React from 'react'
import { useRecoilState } from 'recoil'
import { Post, postState } from '../atoms/postsAtoms'
import { firestore, storage } from '../firebase/clientApp'

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState)
  const onVote = async () => {}
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

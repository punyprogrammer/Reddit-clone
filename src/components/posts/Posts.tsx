import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Community } from '../../atoms/communitiesAtom'
import { Post } from '../../atoms/postsAtoms'
import { firestore } from '../../firebase/clientApp'
import usePosts from '../../hooks/usePosts'

type PostsProps = {
  communityData: Community
  // userId?:string;
}

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [loading, setLoading] = useState(false);
  const {postStateValue,setPostStateValue}=usePosts();
  const getPosts = async () => {
    try {
      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      )
      const postDocs = await getDocs(postsQuery)
      // Store in post state
      const posts = postDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setPostStateValue((prev)=>(
        {...prev,posts:posts as Post[]}
      ))
    } catch (error:any) {
      console.log('GetPOsts Error', error.message)
    }
  }
  useEffect(() => {
    getPosts()
  }, [])

  return (
    postStateValue.posts.map((post)=>{
        return <h1>{post.title}</h1>
    })
  )
}
export default Posts

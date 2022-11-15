import { doc, getDoc } from 'firebase/firestore';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { useEffect } from 'react';
import { Community, communityState } from '../../../atoms/communitiesAtom';
import { firestore } from '../../../firebase/clientApp';
import NotFound from "../../../components/community/NotFound"
import Header from '../../../components/community/Header';
import PageContent from '../../../components/Layout/PageContent';
import CreatePostLink from '../../../components/community/CreatePostLink';
import Posts from '../../../components/posts/Posts';
import { useSetRecoilState } from 'recoil';
import About from '../../../components/community/About';

type CommunityPageProps = {
    communityData:Community;
};

const CommunityPage:React.FC<CommunityPageProps> = ({communityData}) => {
   const  setCommunityState=useSetRecoilState(communityState)
   useEffect(()=>{
       setCommunityState((prev)=>(
           {...prev,currentCommunity:communityData}
       ))
   },[])
    if(!communityData)
    {
        return  <NotFound/>
    }
    
    return (
        <>
        <Header communityData={communityData}/>
        <PageContent>
            <>
            <CreatePostLink/>
            <Posts communityData={communityData}/>
            </>
            <>
            <About communityData={communityData}/>
            </>
        </PageContent>
        </>
    )
}
export async function getServerSideProps(
  context:GetServerSidePropsContext  
){
    // get the community data

    try {
    const communityDocRef=doc(firestore,'communities',
    context.query.communityId as string)   
    const communityDoc=await getDoc(communityDocRef) 
    
    return {
        props:{
            communityData:communityDoc.exists()?  JSON.parse(JSON.stringify({id:communityDoc.id,...communityDoc.data()})):"",
        }
    }
    } catch (error) {
         console.log(error)
    }

}
export default CommunityPage;
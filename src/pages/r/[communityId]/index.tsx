import { doc, getDoc } from 'firebase/firestore';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React from 'react';
import { Community } from '../../../atoms/communitiesAtom';
import { firestore } from '../../../firebase/clientApp';
import NotFound from "../../../components/community/NotFound"

type CommunityPageProps = {
    communityData:Community;
};

const CommunityPage:React.FC<CommunityPageProps> = ({communityData}) => {
    console.log(communityData)
    if(!communityData)
    {
        return  <NotFound/>
    }
    
    return <div>Welocome to {communityData.id}</div>
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
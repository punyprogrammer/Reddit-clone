import { doc, getDoc } from 'firebase/firestore';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React from 'react';
import { firestore } from '../../../firebase/clientApp';

type CommunityPageProps = {
    
};

const CommunityPage:React.FC<CommunityPageProps> = ({communityData}) => {
    
    return <div>This is the community page</div>
}
export async function getServerSideProps(
  context:GetServerSidePropsContext  
){
    // get the community data

    try {
    const communityDocRef=doc(firestore,'communities',
    context.query.communityId as string)   
    const communityDoc=await getDoc(communityDocRef) 
    console.log("this is the communit data",communityDoc.data())
    return {
        props:{
            communityData:JSON.parse(JSON.stringify(communityDoc.data())),
        }
    }
    } catch (error) {
         console.log(error)
    }

}
export default CommunityPage;
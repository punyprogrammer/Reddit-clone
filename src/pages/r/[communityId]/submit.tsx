import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import PageContent from '../../../components/Layout/PageContent';
import NewPostForm from '../../../components/posts/NewPostForm';


const SubmitPostPage:React.FC = () => {
    
    return (
         <PageContent>
            <>
             <Box p="14px 0px" borderBottom="1px solid white">
                <Text fontSize={'12pt'} fontWeight={'normal'}>Create a new post</Text>
             </Box>
                <NewPostForm/>
            </>
             <></>
         </PageContent>
    )
}
export default SubmitPostPage;
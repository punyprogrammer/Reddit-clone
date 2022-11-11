import { Flex } from '@chakra-ui/react';
import React ,{ReactNode}from 'react';

type PageContentProps = {
    children:ReactNode[];
};

const PageContent:React.FC<PageContentProps> = ({children}) => {
    
    return (
        <Flex justify="center" padding="10px 6px">
             <Flex width="95%" justify="center" maxWidth="860px">
                  <Flex direction="column" width={{base:"100%" ,md:"70%"}} mr={{base:0,md:6}}>{children&&children[0]}</Flex>
                  <Flex direction="column" display={{base:'none',md:"flex"}} flexGrow={1}>{children&&children[1]}</Flex>
             </Flex>
        </Flex>
    )
}
export default PageContent;
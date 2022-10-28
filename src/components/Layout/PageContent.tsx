import { Flex } from '@chakra-ui/react';
import React from 'react';

type PageContentProps = {
    
};

const PageContent:React.FC<PageContentProps> = ({children}) => {
    
    return (
        <Flex justify="center" padding="10px 6px">
             <Flex width="95%" justify="center" maxWidth="860px">
                  <Flex direction="column" width={{base:"100%" ,md:"60%"}} mr={{base:0,md:6}}>{children&&children[0 as keyof typeof children]}</Flex>
                  <Flex direction="column" display={{base:'none',md:"flex"}} flexGrow={1}>{children&&children[1 as keyof typeof children]}</Flex>
             </Flex>
        </Flex>
    )
}
export default PageContent;
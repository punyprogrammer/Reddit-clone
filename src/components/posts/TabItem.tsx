import { Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { TabItem } from './NewPostForm';

type TabItemProps = {
   item:TabItem, 
   selected:boolean,
   setSelectedTab:(a:string)=>void;
};

const TabItem:React.FC<TabItemProps> = ({item,selected,setSelectedTab}) => {
    
    return (
        <Flex cursor="pointer"  borderBottom={selected?"3px solid":"0px"}color={selected?"blue.500":"gray.500"}flexGrow={1} padding="10px 6px"
        _hover={{bg:'gray.50'}}
        transition="background-color 0.2s ease-in"
        borderColor={selected?"blue.500":"white"}
        borderRight="1px solid "
        borderRightColor="gray.200"
        onClick={()=>setSelectedTab(item.title)}
        maxHeight="60px"
        >
        
              <Flex alignItems={'center'}>
                 <Icon mr={1} as ={item.icon}/>
                  <Text fontSize={{base:'7pt',md:'10pt'}} fontWeight='semibold'>{item.title}</Text>

              </Flex>
        </Flex>
    )
}
export default TabItem;
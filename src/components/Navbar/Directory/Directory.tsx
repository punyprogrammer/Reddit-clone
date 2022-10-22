import React from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
    Icon,
    Flex,
    Text,
    Box,
  } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons';
import {TiHome} from 'react-icons/ti'
import Communities from './Communities';

const Directory:React.FC = () => {
 
  return (
    <>
      <Menu>
  <MenuButton  cursor="pointer" padding="3px 6px" 
  mr={2}
  ml={{base:0,md:2}}
  borderRadius={4}
   _hover={{bg:"gray.200"}}>
    <Flex justify="space-between" align="center"
    width={{base:'auto',lg:"200px"}}>
      <Flex align="center">
        <Icon fontSize={{base:20,md:24}} mr={{base:1,md:2}} as={TiHome}/>
        <Flex display={{base:'none',lg:'flex'}}>

        <Text fontWeight={600} fontSize="10pt">Home</Text>
        </Flex>
      </Flex>
        <ChevronDownIcon/>
    </Flex>
  </MenuButton>
  <MenuList>
   <Communities/>
    
  </MenuList>
</Menu>
</>
    )
}
export default Directory;
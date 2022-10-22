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
import { FaRedditSquare } from "react-icons/fa"
import { VscAccount } from "react-icons/vsc";
import {CgProfile} from "react-icons/cg"
import { signOut, User } from 'firebase/auth';
import {MdOutlineLogin} from "react-icons/md"
import {IoSparkles} from "react-icons/io5"
import { auth } from '../../../firebase/clientApp';
import { useRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';



type UserMenuProps = {
    user?:User|null;
};

const UserMenu:React.FC<UserMenuProps> = ({user}) => {
  const [modalState,setModalState]=useRecoilState(authModalState);
  const modalOpen=()=>{
       setModalState((prev)=>({...prev, open:true,view:"login"}))
  }
  return (
    <>
      <Menu>
  <MenuButton  cursor="pointer" padding="3px 6px" borderRadius={4}
   _hover={{bg:"gray.200"}}>
    {user?
    <Flex align="center">

    <Flex align="center">

     <Icon as={FaRedditSquare} fontSize={24} mr={1} color="orange"/>
    </Flex>
    <ChevronDownIcon/>
    <Box
                  display={{ base: "none", lg: "flex" }}
                  flexDirection="column"
                  fontSize="8pt"
                  alignItems="flex-start"
                  mr={8}
                >
                  <Text fontWeight={700}>
                    {user?.displayName || user?.email?.split("@")[0]}
                  </Text>
                  <Flex alignItems="center">
                    <Icon as={IoSparkles} color="brand.100" mr={1} />
                    <Text color="gray.400">1 karma</Text>
                  </Flex>
                </Box>
    </Flex>

:(<Flex align="center">

      <Icon fontSize={24} color="gray.400" as={VscAccount}/>
      <ChevronDownIcon/>
    </Flex>
    )}
  </MenuButton>
  <MenuList>
    {
      user?(<>
    <MenuItem fontSize={'9pt'} fontWeight={700}
    transition={"all 0.3s ease-in"}
    _hover={{bg:"blue.500", color:"white"}}>
    <Flex align="center">
      <Icon fontSize={20} as={CgProfile} mr={2}/>
       <Text>Profile</Text>
      </Flex>
      </MenuItem>
      <MenuDivider/>
    <MenuItem fontSize={'9pt'} fontWeight={700}
    transition={"all 0.3s ease-in"}
    _hover={{bg:"blue.500", color:"white"}}
    onClick={()=>signOut(auth)}
    >
    <Flex align="center">
       <Icon fontSize={20} as={MdOutlineLogin} mr={2}/>
       <Text>Logout</Text>
      </Flex>
      </MenuItem>
    </>

      ):(
        <>
        <MenuItem fontSize={'9pt'} fontWeight={700}
    transition={"all 0.3s ease-in"}
    _hover={{bg:"blue.500", color:"white"}}
    onClick={modalOpen}
   
    >
    <Flex align="center">
      <Icon fontSize={20} as={MdOutlineLogin} mr={2} onClick={modalOpen}/>
       <Text>Login /Sign Up</Text>
      </Flex>
      </MenuItem>
        </>

)
}
    
  </MenuList>
</Menu>
</>
    )
}
export default UserMenu;
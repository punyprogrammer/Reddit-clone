import React, { useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Flex,
    Text,
  } from '@chakra-ui/react'
import {useRecoilState} from "recoil"
import { authModalState } from '../../../atoms/authModalAtom';
import AuthInputs from './AuthInputs';
import OAuthButtons from './OAuthButtons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/clientApp';
import ResetPassword from './ResetPassword';


const viewTitleMap={
    "login":"Log In",
    "signup":"Sign Up",
    "resetPassword":"Reset Password"
}
const AuthModal:React.FC = () => {
    
    const [modalState,setModalState]=useRecoilState(authModalState);
    const [user,loading,error]=useAuthState(auth)
    const handleClose=()=>{
        setModalState((prev)=>({
            ...prev,
            open:false,
        }))
    }

    // Once the user is logged in 
    useEffect(()=>{
      if(user) handleClose();
      console.log(user)
    },[
      user
    ])
    return (
      <>
        <Modal isOpen={modalState.open} onClose={handleClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">{viewTitleMap[modalState.view]}</ModalHeader>
            <ModalCloseButton />
            <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            pb={6}
            >
            <Flex
            direction="column"
            align="center"
            justify="center"
            width="70%"
           
            >
               {modalState.view!=="resetPassword"?
               
              <>
              <OAuthButtons/>
                <Text color="gray.500" fontWeight={700}>OR</Text>
                <AuthInputs/>
              </>:<ResetPassword/>
              }

            </Flex>
            
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
}
export default AuthModal;
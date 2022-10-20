import { Button, Flex, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useSetRecoilState } from 'recoil'
import { authModalState } from '../../../atoms/authModalAtom'
import {auth} from "../../../firebase/clientApp"
import {FIREBASE_ERRORS} from "../../../firebase/firebaseErrors"

type LoginProps = {}

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState=useSetRecoilState(authModalState)
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    loginError,
  ] = useSignInWithEmailAndPassword(auth);
  const onSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    signInWithEmailAndPassword(loginForm.email,loginForm.password)

  }
  const onChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setLoginForm(prev=>({
        ...prev,
        [event.target.name]:event.target.value
    }))
  }

  return (
    <form onSubmit={onSubmit}>
      <Input required name='email' type='email'mt={4} mb={2} onChange={onChange} fontSize='10pt'
      bg="gray.50" 
      _placeholder={{color:"gray.500"}}
      _hover={{
        bg:"white",
        border:"1px solid",
        borderColor:"blue.500"
      }}
      _focus={{
        outline:"none",
        bg:"white",
        border:"1px solid",
        borderColor:"blue.500"
      }}

      />
      <Input required name='password' type='password' mb={2} onChange={onChange} fontSize='10pt'
       bg="gray.50" 
       _placeholder={{color:"gray.500"}}
       _hover={{
         bg:"white",
         border:"1px solid",
         borderColor:"blue.500"
       }}
       _focus={{
         outline:"none",
         bg:"white",
         border:"1px solid",
         borderColor:"blue.500"
       }}/>
       <Text textAlign="center" color="red" fontSize='9pt'>
        {loginError&&FIREBASE_ERRORS[loginError["message"] as keyof typeof FIREBASE_ERRORS]}
       </Text>
      <Button type="submit" width="100%" height="36px" mb={2} mt={2}
      isLoading={loading}>Log In</Button>
      <Flex fontSize='9pt' justifyContent="center">
        <Text mr={1}>New here?</Text>
        <Text color="blue.500" fontWeight={700} cursor="pointer"
        onClick={()=>setAuthModalState((prev)=>({
          ...prev,
          view:'signup'
        }))}
        >SIGN UP</Text>

      </Flex>
    </form>
  )
}
export default Login

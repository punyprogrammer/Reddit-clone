import { Input, Button, Flex, Text } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';
import  {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth"
import {auth} from "../../../firebase/clientApp"
import {FIREBASE_ERRORS} from "../../../firebase/firebaseErrors"


const SignUp:React.FC = () => {
  const setAuthModalState=useSetRecoilState(authModalState)
  const signUpFormRef=useRef();
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    confirmPassword:'',
  })
  const [error,setError]=useState('')
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    signUpError,
  ] = useCreateUserWithEmailAndPassword(auth);
  const onSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    // reset error
    setError('');
    if(signUpForm.password!==signUpForm.confirmPassword)
    {
      setError("Passwords do not match")
      return ;
    }

  createUserWithEmailAndPassword(signUpForm.email,signUpForm.password)
  }
  const onChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
   setSignUpForm(prev=>({
        ...prev,
        [event.target.name]:event.target.value
    }))
  }

  return (
    <form onSubmit={onSubmit} ref={signUpFormRef}>
      <Input required name='email' type='email' mt={4} mb={2} onChange={onChange} fontSize='10pt'
      bg="gray.50" 
      placeholder="Enter Your Email"
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
       placeholder="Enter Your Password"
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
      <Input required name='confirmPassword' type='password' mb={2} onChange={onChange} fontSize='10pt'
       bg="gray.50" 
       placeholder="Please Confirm Your Password"
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
       <Text textAlign="center" color="red" fontSize="9pt">{error||FIREBASE_ERRORS[signUpError?.["message"] as keyof typeof FIREBASE_ERRORS]}</Text>
      <Button type="submit" width="100%" height="36px" mb={2} mt={2} isLoading={loading}>Sign Up</Button>
      <Flex fontSize='9pt' justifyContent="center">
        <Text mr={1}>Already a redditor?</Text>
        <Text color="blue.500" fontWeight={700} cursor="pointer"
        onClick={()=>setAuthModalState((prev)=>({
          ...prev,
          view:'login'
        }))}
        >LOG IN</Text>

      </Flex>
    </form>
  )
}
export default SignUp;
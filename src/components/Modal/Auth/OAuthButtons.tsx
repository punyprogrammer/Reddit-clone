import { Button, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import {useSignInWithGoogle} from "react-firebase-hooks/auth"
import {auth} from "../../../firebase/clientApp"


const OAuthButtons:React.FC = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const handleSubmit=()=>{
        signInWithGoogle();
        console.log("Google OAuth Error",error);
        console.log("User Info",user)
    }
    
   return (
    <Flex direction="column" width="100%" mt={4}>
        <Button variant="oauth" isLoading={loading} onClick={handleSubmit}>
            <Image src="/images/googlelogo.png" height="20px"  mr={2}/>
            Continue with Google
        </Button>
    </Flex>
   )
}
export default OAuthButtons;
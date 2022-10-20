import { Flex } from '@chakra-ui/react';
import React from 'react';
import {useRecoilValue} from "recoil"
import { authModalState } from '../../../atoms/authModalAtom';
import  Login from "./Login"
import SignUp from './SignUp';

// type AuthInputsProps = {
    
// };
const authToRender={
    "login":<Login/>,
    "signup":<SignUp/>,
    "resetPassword":<h1>Hello</h1>

}

const AuthInputs:React.FC = () => {
    const  modalState=useRecoilValue(authModalState);

    
    return (<>
        <Flex direction="column" align="center" width="100%" >
           {authToRender[modalState.view]}

        </Flex>
    </>
    )
}
export default AuthInputs;
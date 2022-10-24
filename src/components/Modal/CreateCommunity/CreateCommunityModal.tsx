import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Box, Divider, Text, Input, Stack, Checkbox, Flex, Icon } from '@chakra-ui/react';
import { doc, Firestore, getDoc, runTransaction, serverTimestamp, setDoc } from 'firebase/firestore';
import React,{useState} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsFillEyeFill } from 'react-icons/bs';
import { auth, firestore } from '../../../firebase/clientApp';

type CreateCommunityModalProps = {
    open:boolean;
    handleClose:()=>void;

    
};

const CreateCommunityModal:React.FC<CreateCommunityModalProps> = ({open,handleClose}) => {
    const [user]=useAuthState(auth)
    const [communityName,setCommunityName]=useState('');
    const [communityType,setCommunityType]=useState('public')
    const [error,setError]=useState('')
    const [loading,setLoading]=useState(false)
    const changeCommunityType=(event:React.ChangeEvent)=>{
        setCommunityType(event.target.name)
    }
const handleCreateCommunity=async()=>{
  // reset error
  setError('')
//  Validate the community\
const  noSpecialCharsRegEx = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; 
if(noSpecialCharsRegEx.test(communityName)||communityName.length<3)
{
  setError('Community names must be less than 3 characters ,and can only contain alphanumeric characters and underscores')
  return ;
}
setLoading(true);
try {
  
  // Create the comminuty in the firestore
  // Check whether the commmunity name exists or not 
  // If valid create the community
  const communityDocRef=doc(firestore,'communities',communityName);
  // Run a transation to change both of thr databses
  await runTransaction(firestore,async(transaction)=>{
    const communityDoc=await transaction.get(communityDocRef);
    if(communityDoc.exists())
    {
      throw new Error(`Sorry the name r/${communityName} is already taken ,try a different name`);
      return;
    }
    // Create a community
    transaction.set(communityDocRef,{
      creatorId:user?.uid,
      createdAt:serverTimestamp(),
      numberOfMembers:1,
      privacyType:communityType
    })
    // Create communitySnippet in uer
    transaction.set(doc(firestore,`users/${user?.uid}/communitySnippets`,communityName),{
      communityId:communityName,
      isModerator:true,
    })
    

  })

} catch (error:any) {
   console.log('Handle Create Community error',error)
   setError(error.message)
}


setLoading(false);


}

    
    return (
        <>
        
    
          <Modal isOpen={open} onClose={handleClose} size="lg"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader display={'flex'} flexDirection='column'
              padding={3}
              fontSize={15} >Create Community</ModalHeader>
              <Box pl={3} pr={3}>
                <Divider/>
              <ModalCloseButton />
              <ModalBody display={'flex'} flexDirection={'column'} padding={'10px 0px'}>
                <Text fontWeight = {600} fontSize={15}>Name</Text>
                <Text fontSize={11} color="gray.500">
                    Community names including capitalization cannot be changed
                </Text>
                <Text
                position="relative"
                top="28px"
                pl="22px"
                width="100px"
                right={'15px'}
                color="gray.400">
                    {`r/`}
                </Text>
                <Input position="relative"
                pl="22px"
                size="sm"
                maxLength={21}
              
                 value={communityName} onChange={(e)=>setCommunityName(e.target.value)}/>
                 <Text fontSize={10} color={communityName?.length===21&&"red"}
                mt={2}
                 >{21-communityName?.length} characters remaining</Text>
                 <Text fontSize={'9pt'} color="red" >{error}</Text>
                 <Box mt={4} mb={4}>
                    <Text fontWeight={600} fontSize={15}>Community Type </Text>
                    <Stack>
                        <Checkbox name="public" isChecked={communityType==="public"} onChange={changeCommunityType}><Flex align="center">
                            <Icon as={BsFillEyeFill} color={"gray.500"} mr={1.5}/>
                            <Text fontSize="10pt" >Public</Text>
                            <Text fontSize="8pt" color="gray.700" mt={1} ml={1.5}>Anyone can view,comment and post </Text>
                            
                            </Flex></Checkbox>
                        <Checkbox name="restricted" isChecked={communityType==="restricted"} onChange={changeCommunityType}><Flex align="center">
                            <Icon as={BsFillEyeFill} color={"gray.500"} mr={1.5}/>
                            <Text fontSize="10pt" >Restricted</Text>
                            <Text fontSize="8pt" color="gray.700" mt={1} ml={1.5}>Anyone can view but only approved members can commment and post </Text>
                            
                            </Flex></Checkbox>
                        <Checkbox name="private" isChecked={communityType==="private"} onChange={changeCommunityType}><Flex align="center">
                            <Icon as={BsFillEyeFill} color={"gray.500"} mr={1.5}/>
                            <Text fontSize="10pt" >Private</Text>
                            <Text fontSize="8pt" color="gray.700" mt={1} ml={1.5}>Only approved members can view and post </Text>
                            
                            </Flex></Checkbox>
                        
                    </Stack>
                 </Box>

              </ModalBody>
    

              </Box>
              <ModalFooter bg="gray.200" 
            //   padding="20px 0"
            borderRadius={"0px 0px 10px 10px"}
              >
                <Button  height="30px" variant={'outline'} mr={3} onClick={handleClose}>
                  Close
                </Button>
                <Button  isLoading={loading} onClick={handleCreateCommunity} height="30px">Create Community</Button>
                
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
    )
}
export default CreateCommunityModal;
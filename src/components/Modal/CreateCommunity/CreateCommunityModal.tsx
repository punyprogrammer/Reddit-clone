import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Box, Divider, Text, Input, Stack, Checkbox, Flex, Icon } from '@chakra-ui/react';
import React,{useState} from 'react';
import { BsFillEyeFill } from 'react-icons/bs';

type CreateCommunityModalProps = {
    open:boolean;
    handleClose:()=>void;

    
};

const CreateCommunityModal:React.FC<CreateCommunityModalProps> = ({open,handleClose}) => {
    const [communityName,setCommunityName]=useState('');
    const [communityType,setCommunityType]=useState('public')
    const changeCommunityType=(event:React.ChangeEvent)=>{
        setCommunityType(event.target.name)
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
                <Button  height="30px">Create Community</Button>
                
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
    )
}
export default CreateCommunityModal;
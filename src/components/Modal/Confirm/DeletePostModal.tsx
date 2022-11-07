import React from 'react';
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
    Divider,
    Text,
    Flex,
  } from '@chakra-ui/react'

type DeletePostModalProps={
  open:boolean;
  setOpen:(ard:boolean)=>void;
  handleDelete:()=>void;
}
const DeletePostModal:React.FC<DeletePostModalProps> = ({open,setOpen,handleDelete}) => {
    
    const { isOpen,onOpen, onClose } = useDisclosure();
    const handleConfirm=()=>{
      setDeleteConfirm(true);
      onClose();
    }

    return (
      <>
      
  
        <Modal isOpen={open} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontWeight="bold" color="black" fontSize="12pt">Delete Post?</ModalHeader>
            <ModalCloseButton onClick={()=>setOpen(false)} />
            <Divider/>
            <ModalBody>
             <Text p="8px 0px" fontWeight="medium" fontSize="10pt">Are you sure you want to delete this? You can't undo this</Text>
            </ModalBody>
  
            <ModalFooter bg="gray.100" borderRadius={"0px 0px 10px 10px"} p={"8px  4px"}>
              <Flex>
              <Button variant="outline" colorScheme='blue' mr={3} onClick={()=>setOpen(false)} height={"28px"}>
                Cancel
              </Button>
              <Button  height="28px"
              _hover={{bg:"red.500"}}
              onClick={handleDelete}
              >Delete Post</Button>
                
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}
export default DeletePostModal;
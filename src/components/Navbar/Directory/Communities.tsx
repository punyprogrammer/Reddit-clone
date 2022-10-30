import { Flex, Icon, MenuItem, Spinner } from '@chakra-ui/react';
import React,{useState} from 'react';
import { GrAdd } from 'react-icons/gr';
import useCommunityHooks from '../../../hooks/useCommunityHooks';
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal"
import { FaReddit } from 'react-icons/fa'
import Link from 'next/link';

type CommunitiesProps = {
    
};

const Communities:React.FC<CommunitiesProps> = () => {
    const [open,setOpen]= useState(false);
    // get the communities
    const { communityStateValue, onJoinOrlLeaveCommunity,loading,error } = useCommunityHooks()
  
  
    
    return (
        <>
         <CreateCommunityModal open={open} handleClose={()=>setOpen(false)}/>
         <MenuItem width='100%' fontSize='10pt' _hover={{
            bg:'gray.100'
         }}
         onClick={()=>setOpen(true)}>
          <Flex align="center" >
            <Icon as={GrAdd} mr={2} fontSize={20}/>
            Create Community
          </Flex>
         </MenuItem>
         {/* render the joined communities */}
         {
          loading?(<Flex justify="center" align="center">
            <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/>
          </Flex>):(
            
      communityStateValue?.mySnippets.map((item)=>{
        return (
          <Link href={`/r/${item.communityId}`}>
         <MenuItem width='100%' fontSize='10pt' _hover={{
           bg:'gray.100'
        }}>
         <Flex align="center" >
           <Icon as={FaReddit} mr={2} fontSize={20} color="blue.500"/>
            {item.communityId}
         </Flex>
        </MenuItem>
          `````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````</Link>
        )
      })
    
          )
          }
         
        </>
    )
        }

export default Communities;
import React from 'react';
import { Community } from '../../atoms/communitiesAtom';
import  {HiOutlineDotsHorizontal} from "react-icons/hi"
import { Box, Button, Divider, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { FaBirthdayCake } from 'react-icons/fa';
import { BiCake } from 'react-icons/bi';
import moment from 'moment';

type AboutProps = {
    communityData:Community;
};

const About:React.FC<AboutProps> = ({communityData}) => {
    console.log("This is the community data in about page",communityData)
    
    return (
        <Box>
            <Flex p={3} bg="blue.400" justify='space-between' align="center" color="white" borderRadius="4px 4px 0px 0px">
                <Text fontSize="10pt" fontWeight={700}>About Community</Text>
                <Icon as={HiOutlineDotsHorizontal}/>
            </Flex>
            <Flex p={4} bg="white" borderRadius="0px 0px 4px 4px">
                <Stack align="center" width="100%" flexDirection="column">
                    <Flex width="100%"fontWeight="700" fontSize='9pt' flexGrow={1} justify="space-between">
                        <Flex flexDirection={'column'} alignItems="center" flexGrow={1}>
                            <Text>Members</Text>
                             <Text>{communityData?.numberOfMembers}</Text>
                        </Flex>
                        <Flex flexDirection={'column'} alignItems="center" flexGrow={1}>
                            <Text>Online Members</Text>
                             <Text>{communityData?.numberOfMembers}</Text>
                        </Flex>
                        
                    </Flex>
                    <Divider/>
                    <Flex p={1} align="center">
                      <Icon fontSize={18} as ={BiCake} mr={2}/>
                      <Text fontSize="10pt">{communityData.createdAt&&`Created on ${moment(new Date(communityData.createdAt?.seconds*1000)).format("MMM DD,YYYY")}`}</Text>
                    </Flex>
        

                    <Button mt={4} height="30px" width="80%">
                        Create Post
                    </Button>
             

                </Stack>
            </Flex>

        </Box>
    )
}
export default About;
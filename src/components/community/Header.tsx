import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { FaReddit } from 'react-icons/fa'
import { Community } from '../../atoms/communitiesAtom'
import useCommunityHooks from '../../hooks/useCommunityHooks'

type HeaderProps = {
  communityData: Community
}

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const { communityStateValue, onJoinOrlLeaveCommunity,loading,error } = useCommunityHooks()
  const isJoined = communityStateValue?.mySnippets?.find(
    item => item.communityId === communityData.id
  )?true:false;
  console.log("Header State Value",communityStateValue)
  return (
    <Flex direction='column' width='100%' height='146px'>
      <Box height='50%' bg='blue.500' />
      <Flex justify='center' bg='white' flexGrow={1}>
        <Flex width='95%' maxWidth='860px'>
          {communityData.imageURL ? (
            <Image />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position='relative'
              top='-4'
              color='blue.500'
              border='4px solid white'
              borderRadius={'50%'}
            />
          )}
          <Flex padding='10px 16px'>
            <Flex direction='column' mr={6}>
              <Text fontWeight={600} fontSize='16pt'>
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize='10pt' color='gray.400'>
                r/{communityData.id}
              </Text>
            </Flex>
            <Button
              height='30px'
              pl={6}
              pr={6}
              isLoading={loading}
              onClick={() => onJoinOrlLeaveCommunity(communityData, isJoined)}
              variant={isJoined?"outline":"solid"}

            >
              {isJoined ? 'Joined' : 'Join'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
export default Header
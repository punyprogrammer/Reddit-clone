import React, { useState } from 'react'
import { Post } from '../../atoms/postsAtoms'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsChat, BsDot } from 'react-icons/bs'
import { FaReddit } from 'react-icons/fa'
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline
} from 'react-icons/io5'
import { Flex, Icon, Image, Skeleton, Stack, Text } from '@chakra-ui/react'
import moment from 'moment'
import DeletePostModal from '../Modal/Confirm/DeletePostModal'

type PostItemProps = {
  post: Post
  userIsCreator: boolean
  userVoteValue?: number
  onVote: () => void
  onDeletePost: (post:Post)=>Promise<boolean>
  onSelectPost: () => void
}

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost
}) => {
  const [imageLoading, setImageLoading] = useState(true)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [error, setError] = useState(false)

  // const handleDelete
  const handleDelete = async () => {
    try {
      const success = await onDeletePost(post)
      if (!success) {
        throw new Error('Something went wrong while deleting the post')
      }
    } catch (error:any) {
      setError(error.message)
      console.log('handle Delete Error', error.message)
    }
  }

  return (
    <Flex
      border={'1px solid'}
      bg='white'
      borderColor='gray.300'
      borderRadius={4}
      _hover={{ borderColor: 'gray.500' }}
      cursor='pointer'
      onClick={onSelectPost}
    >
      <Flex
        direction='column'
        align='center'
        bg='gray.100'
        p={2}
        width='50px'
        borderRadius={4}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? 'brand.100' : 'gray.400'}
          fontSize={22}
          onClick={onVote}
          cursor='pointer'
        />
        <Text fontSize={'9pt'}>{post.voteStatus}</Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? '#4279ff' : 'gray.400'}
          fontSize={22}
          onClick={onVote}
          cursor='pointer'
        />
      </Flex>
      <Flex direction='column' width='100%'>
        <Stack spacing={1} padding='10px'>
          <Stack direction={'row'} align='center' spacing={0.6} fontSize='9pt'>
            <Text>
              Posted by u/{post.creatorDisplayName}{' '}
              {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize='12pt' fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize='10pt'>{post.body}</Text>
          {post.imageURL && (
            <Flex justify="center" align="center" p={2}>
             
              
              <Image
                // width="80%"
                // maxWidth="500px"
                maxHeight="460px"
                src={post.imageURL}
                display={imageLoading ? "none" : "flex"}
                onLoad={() => setImageLoading(false)}
                alt="Post Image"
              />
              
            </Flex>
          )}
        </Stack>
        <Flex ml={1} mb={0.5} color='gray.500' fontWeight={400}>
          <Flex
            align='center'
            p='8px 10px'
            borderRadius={4}
            _hover={{ bg: 'gray.200' }}
            cursor='pointer'
          >
            <Icon as={BsChat} mr={1} />
            <Text fontSize='9pt'>{post.numberOfComments}</Text>
          </Flex>
          <Flex
            align='center'
            p='8px 10px'
            borderRadius={4}
            _hover={{ bg: 'gray.200' }}
            cursor='pointer'
          >
            <Icon as={IoArrowRedoOutline} mr={1} />
            <Text fontSize='9pt'>Share</Text>
          </Flex>
          <Flex
            align='center'
            p='8px 10px'
            borderRadius={4}
            _hover={{ bg: 'gray.200' }}
            cursor='pointer'
          >
            <Icon as={IoBookmarkOutline} mr={1} />
            <Text fontSize='9pt'>Save</Text>
          </Flex>
          {userIsCreator && (
            <Flex
              align='center'
              p='8px 10px'
              borderRadius={4}
              _hover={{ bg: 'gray.200' }}
              cursor='pointer'
              onClick={() => setDeleteModalOpen(true)}
            >
              <Icon as={AiOutlineDelete} mr={1} />
              <Text fontSize='9pt'>Delete</Text>
            </Flex>
          )}
        </Flex>
      </Flex>

      <DeletePostModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        handleDelete={handleDelete}
      />
    </Flex>
  )
}
export default PostItem

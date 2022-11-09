import { Box, Flex, Icon, Text, useToast } from '@chakra-ui/react'
import React, { useId, useState } from 'react'
import { BsLink45Deg, BsMic } from 'react-icons/bs'
import { IoDocumentText, IoImageOutline } from 'react-icons/io5'
import { BiPoll } from 'react-icons/bi'
import TabItem from './TabItem'
import TextInputs from './TextInputs'
import ImageUpload from './ImageUpload'
import { Post } from '../../atoms/postsAtoms'
import { User } from 'firebase/auth'
import { useRouter } from 'next/router'
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc
} from 'firebase/firestore'
import { firestore, storage } from '../../firebase/clientApp'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { setDefaultResultOrder } from 'dns/promises'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react'

type NewPostFormProps = {
  user: User
}
const formTabs: TabItem[] = [
  {
    title: 'Post',
    icon: IoDocumentText
  },
  {
    title: 'Images & Video',
    icon: IoImageOutline
  },
  {
    title: 'Link',
    icon: BsLink45Deg
  },
  {
    title: 'Poll',
    icon: BiPoll
  },
  {
    title: 'Mic',
    icon: BsMic
  }
]

export type TabItem = {
  title: string
  icon: typeof Icon.arguments
}

const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
  const toast = useToast()
  const router = useRouter()
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState(false)
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title)
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<string>('')
  const [textInputs, setTextInputs] = useState({
    title: '',
    body: ''
  })
  const handleCreatePost = async () => {
    const { communityId } = router.query
    // Create a new post object
    const newPost: Post = {
      communityId: communityId as string,
      creatorId: user?.uid,
      creatorDisplayName: user.email!.split('@')[0],
      title: textInputs.title,
      body: textInputs.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp
    }
    // Store image in db
    try {
      setLoading(true)
      const postDocRef = await addDoc(collection(firestore, 'posts'), newPost)
      //  check for selected File
      if (selectedFile) {
        // store in storage and getDownloadURL
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`)
        await uploadString(imageRef, selectedFile, 'data_url')
        const downloadURL = await getDownloadURL(imageRef)

        // update post Doc
        await updateDoc(postDocRef, {
          imageURL: downloadURL
        })
      }
      setSuccess(true)
      setTimeout(() => {
        router.back()
      }, 3000)
    } catch (error) {
      console.log('handleCreatePostError', error.message)
      setError('Something went wrong with uploading your post')
    } finally {
      setLoading(false)
    }
  }
  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0])
    }
    reader.onload = readerEvent => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string)
      }
    }
  }
  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value }
    } = event
    setTextInputs(prev => ({ ...prev, [name]: value }))
  }
  return (
    <Flex direction={'column'} bgColor='white' borderRadius={4} mt={2}>
      <Flex width='100%'>
        {formTabs.map(item => (
          <TabItem
            setSelectedTab={setSelectedTab}
            selected={item.title === selectedTab}
            item={item}
            key={item.title}
          />
        ))}
      </Flex>
      {selectedTab === 'Post' && (
        <TextInputs
          textInputs={textInputs}
          handleCreatePost={handleCreatePost}
          onChange={onTextChange}
          loading={loading}
        />
      )}
      {selectedTab === 'Images & Video' && (
        <ImageUpload
          selectedFile={selectedFile}
          setSelectedTab={setSelectedTab}
          onSelectImage={onSelectImage}
          setSelectedFile={setSelectedFile}
        />
      )}
      {error && (
        <Alert status='error'>
          <AlertIcon />
          <Text>{'Something went wrong'}</Text>
        </Alert>
      )}
      {success && (
        <Alert status='success'>
          <AlertIcon />
          <Text>{'Your post has been successfully submitted'}</Text>
        </Alert>
      )}
    </Flex>
  )
}
export default NewPostForm

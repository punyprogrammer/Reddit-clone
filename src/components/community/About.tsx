import React, { useRef, useState } from 'react'
import { Community, communityState } from '../../atoms/communitiesAtom'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Stack,
  Text
} from '@chakra-ui/react'
import { FaBirthdayCake, FaReddit } from 'react-icons/fa'
import { BiCake } from 'react-icons/bi'
import moment from 'moment'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore, storage } from '../../firebase/clientApp'
import useFileSelect from '../../hooks/useFileSelect'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'
import { useSetRecoilState } from 'recoil'

type AboutProps = {
  communityData: Community
}

const About: React.FC<AboutProps> = ({ communityData }) => {
  const router = useRouter()
  const [user] = useAuthState(auth)
  const { onFileSelect, selectedFile, setSelectedFile } = useFileSelect()
  const selectedFileRef = useRef<HTMLInputElement>(null)
  const [uploadingImage, setUploadingImage] = useState<boolean>(false)
  const setCommmunityStateValue=useSetRecoilState(communityState)

  const onUpdateImage = async () => {
    if(!selectedFile) return;
    setUploadingImage(true);
    try {
        const imageRef=ref(storage,`communities/${communityData.id}/image`);
        await uploadString(imageRef,selectedFile,'data_url');
        const downloadURL=await getDownloadURL(imageRef);
        await updateDoc(doc(firestore,'communities',communityData.id),{
            imageURL:downloadURL
        })
        setCommmunityStateValue((prev)=>(
            {
                ...prev,
                currentCommunity:{
                    ...prev.currentCommunity,
                    imageURL:downloadURL
                } as Community,
            }
        ))
    } catch (error) {
        console.log("Something went Wrong while uploding",error)
    }
    setUploadingImage(false)
  }

  return (
    <Box>
      <Flex
        p={3}
        bg='blue.400'
        justify='space-between'
        align='center'
        color='white'
        borderRadius='4px 4px 0px 0px'
      >
        <Text fontSize='10pt' fontWeight={700}>
          About Community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} />
      </Flex>
      <Flex p={4} bg='white' borderRadius='0px 0px 4px 4px'>
        <Stack align='center' width='100%' flexDirection='column'>
          <Flex
            width='100%'
            fontWeight='700'
            fontSize='9pt'
            flexGrow={1}
            justify='space-between'
          >
            <Flex flexDirection={'column'} alignItems='center' flexGrow={1}>
              <Text>Members</Text>
              <Text>{communityData?.numberOfMembers}</Text>
            </Flex>
            <Flex flexDirection={'column'} alignItems='center' flexGrow={1}>
              <Text>Online Members</Text>
              <Text>{communityData?.numberOfMembers}</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex p={1} align='center'>
            <Icon fontSize={18} as={BiCake} mr={2} />
            <Text fontSize='10pt'>
              {communityData.createdAt &&
                `Created on ${moment(
                  new Date(communityData.createdAt?.seconds * 1000)
                ).format('MMM DD,YYYY')}`}
            </Text>
          </Flex>

          <Link href={`/r/${router.query.communityId}/submit`}>
            <Button mt={4} height='30px' width='80%'>
              Create Post
            </Button>
          </Link>
          {user?.uid === communityData.creatorId && (
            <>
              <Divider />
              <Stack
                width='100%'
                align='flex-start'
                spacing={1}
                fontSize='10pt'
              >
                <Text fontWeight={600}>Admin</Text>
                <Flex width='100%' align='center' justify='space-between'>
                  <Text
                    color='blue.500'
                    cursor='pointer'
                    _hover={{ textDecoration: 'underline' }}
                    onClick={() => selectedFileRef?.current?.click()}
                  >
                    Change Image
                  </Text>
                  {communityData.imageURL || selectedFile ? (
                    <Image
                      alt='Communit Image'
                      src={selectedFile || communityData.imageURL}
                      borderRadius='full'
                      boxSize='40px'
                    />
                  ) : (
                    <Icon
                      as={FaReddit}
                      fontSize={40}
                      mr={2}
                      color='brand.100'
                    />
                  )}
                </Flex>
                {selectedFile && (
                  <Button
                    isLoading={uploadingImage}
                    height='28px'
                    onClick={onUpdateImage}
                    fontSize="9pt"
                    fontWeight={300}
                  >
                    Save Changes
                  </Button>
                )}
                <input
                   type='file'
                   ref={selectedFileRef}
                   hidden
                   onChange={onFileSelect}
                />
              </Stack>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  )
}
export default About

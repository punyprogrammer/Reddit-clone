import { Button, Flex, Image, Stack } from '@chakra-ui/react'
import React, { useRef } from 'react'

type ImageUploadProps = {
  selectedFile?: string
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void
  setSelectedTab: (value: string) => void
  setSelectedFile: (value: string) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFile,
  onSelectImage,
  setSelectedTab,
  setSelectedFile
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null)

  return (
    <Flex
      align='center'
      padding='12px'
      width='100%'
      direction='column'
      justify={'center'}
    >
      {selectedFile ? (
        <>
          <Image maxHeight='400px' maxWidth='400px' src={selectedFile} />
          <Stack direction='row' mt={2}>
            <Button height='28px' onClick={() => setSelectedTab('Post')}>
              Back to Post
            </Button>
            <Button
              height='28px'
              variant='outline'
              onClick={() => setSelectedFile('')}
            >
              Remove
            </Button>
          </Stack>
        </>
      ) : (
        <Flex align='center' justify={'center'} borderRadius={10} p={20}>
          <Button
            variant='outline'
            height='28px'
            onClick={() => selectedFileRef?.current?.click()}
          >
            Upload
          </Button>
          <input
            type='file'
            ref={selectedFileRef}
            hidden
            onChange={onSelectImage}
          />
          <img src={selectedFile} />
        </Flex>
      )}
    </Flex>
  )
}
export default ImageUpload

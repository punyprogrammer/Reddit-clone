import React, { useState } from 'react'

const useFileSelect = () => {
  const [selectedFile, setSelectedFile] = useState('')
  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  return {
    selectedFile,
    setSelectedFile,
    onFileSelect
  }
}
export default useFileSelect

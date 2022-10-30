import { Flex, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import {BiPoll} from "react-icons/bi"
import TabItem from './TabItem';
import TextInputs from './TextInputs';
import ImageUpload from './ImageUpload';

type NewPostFormProps = {
    
};
const formTabs:TabItem[]=[
    {
        title:"Post",
        icon:IoDocumentText,
    },
    {
        title:"Images & Video",
        icon:IoImageOutline,
    },
    {
        title:"Link",
        icon:BsLink45Deg,
    },
    {
        title:"Poll",
        icon:BiPoll,
    },
    {
        title:"Mic",
        icon:BsMic,
    },
]

export type TabItem={
    title:string,
    icon:typeof Icon.arguments,
}

const NewPostForm:React.FC<NewPostFormProps> = () => {
    const [selectedTab,setSelectedTab]=useState(formTabs[0].title)
    const [loading,setLoading]=useState(false)
    const [selectedFile,setSelectedFile]=useState<string>('')
    const [textInputs,setTextInputs]=useState({
        title:'',
        body:'',
    })
    const handleCreatePost=async()=>{
    
    }
    const onSelectImage=(event:React.ChangeEvent<HTMLInputElement>)=>{
         const reader=new  FileReader();
         if(event.target.files?.[0])
         {
            reader.readAsDataURL(event.target.files[0])
         }
         reader.onload=(readerEvent)=>{
            if(readerEvent.target?.result)
            {
                setSelectedFile(readerEvent.target.result as string);
            }

         }

    }
    const onTextChange=(event:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
        const {target:{name,value}}=event;
        setTextInputs((prev)=>(
            {...prev,[name]:value}
        ))
        
    
    }
    return (
         <Flex direction={'column'} bgColor="white" borderRadius={4}
          mt={2}>
         <Flex width="100%">
             {formTabs.map(item=><TabItem setSelectedTab={setSelectedTab} selected={item.title===selectedTab}item={item}/>)}
         </Flex>
       {
        selectedTab==="Post"&&<TextInputs textInputs={textInputs} handleCreatePost={handleCreatePost}
        onChange={onTextChange} 
        loading={loading}/>

       }
       {
        selectedTab==="Images & Video"&& <ImageUpload selectedFile={selectedFile}
        setSelectedTab={setSelectedTab}
        onSelectImage={onSelectImage}
        setSelectedFile={setSelectedFile}
        />
       }          

         </Flex>
    )
}
export default NewPostForm;
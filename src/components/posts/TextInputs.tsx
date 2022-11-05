import { Button, Flex, Input, Stack, Textarea } from '@chakra-ui/react';
import React from 'react';

type TextInputsProps = {
    textInputs:{
    title:string,
    body:string,
    },
    onChange:(event:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>void,
    handleCreatePost:()=>void,
    loading:boolean,

    
};

const TextInputs:React.FC<TextInputsProps> = ({
    textInputs,
    onChange,
    handleCreatePost,
    loading,
}) => {
    
    return (
        <Stack spacing={{base:5,md:3}} padding="15px 8px">
            <Input
            name="title"
            value={textInputs.title}
            borderRadius={4}
            onChange={onChange}
            placeholder="Enter a eye catching title"
            fontSize={'10pt'}
            _placeholder={{color:'gray.500'}}
            _focus={{outline:"none" ,bg:'white'}}
            />
            <Textarea
           name="body"
           value={textInputs.body}
           height="160px"
           borderRadius={4}
           onChange={onChange}
           placeholder="Enter the description "
           fontSize={'10pt'}
           _placeholder={{color:'gray.500'}}
           _focus={{outline:"none" ,bg:'white'}}
            />
            <Flex justify={'flex-end'}>
                <Button disabled={!textInputs.title} onClick={handleCreatePost} isLoading={loading}>Post</Button>
            </Flex>

        </Stack>
    )
}
export default TextInputs;
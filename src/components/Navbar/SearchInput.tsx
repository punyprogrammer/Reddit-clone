import { SearchIcon } from '@chakra-ui/icons';
import { Button, Flex, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import React from 'react';

type SearchInputProps = {
    // user
};

const SearchInput:React.FC<SearchInputProps> = () => {
    
    return(
        <Flex flexGrow={1} mr={2} align="center" >
            <InputGroup >
      <InputLeftElement>
         <SearchIcon color="gray.300" mb={1}/>
      </InputLeftElement>
      <Input
        fontSize="10pt"
        placeholder='Search Reddit '
        _placeholder={{color:"gray.500"}}
        _hover={{
            bg:'white',
            border:'1px solid',
            borderColor:'blue.500'
        }}
        _focus={{
            outline:"none",
            border:"1px solid",
            borderColor:"blue.500"
        }}
        height="34px"
        bg="bg.50"
      />
    </InputGroup>

        </Flex>
    )
}
export default SearchInput;
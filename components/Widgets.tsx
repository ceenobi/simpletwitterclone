import React from 'react'
import {
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Box,
  Icon,
  GridItem,
} from '@chakra-ui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

export default function Widgets() {
  return (
    <GridItem colSpan={2} display={{ base: 'none', lg: 'inline' }}>
      <Box px={2} mt={2}>
        <InputGroup
          mb={2}
          p={3}
          bg='gray.100'
          rounded='full'
          alignItems='center'
        >
          <InputLeftElement>
            <Icon
              as={MagnifyingGlassIcon}
              w='6'
              h='6'
              aria-label='Search Tweet'
              color='gray.400'
              cursor='pointer'
              type='submit'
            />
          </InputLeftElement>
          <Input
            placeholder='Search Tweet'
            _placeholder={{ color: 'gray.700' }}
            variant='unstyled'
            type='text'
          />
        </InputGroup>
        <TwitterTimelineEmbed
          sourceType='profile'
          screenName='ceenobii'
          options={{ height: 1000 }}
        />
      </Box>
    </GridItem>
  )
}

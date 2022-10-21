import React, { useState, useRef } from 'react'
import {
  Flex,
  Avatar,
  chakra,
  Input,
  Button,
  Icon,
  HStack,
  Image,
  Box,
} from '@chakra-ui/react'
import {
  MagnifyingGlassCircleIcon,
  FaceSmileIcon,
  CalendarIcon,
  MapPinIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { TweetBody, Tweet } from '../types/type'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
  setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>
}

export default function TweetBox({ setTweets }: Props) {
  const [input, setInput] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [mediaBoxOpen, setMediaBoxOpen] = useState<boolean>(false)
  const { data: session } = useSession()
  const imgInputRef = useRef<HTMLInputElement>(null)

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    if (!imgInputRef.current?.value) return
    setImage(imgInputRef.current.value)
    imgInputRef.current.value = ''
    setMediaBoxOpen(false)
  }

  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: input,
      username: session?.user?.name || 'Unknown user',
      profileImg: session?.user?.image || 'https://bit.ly/broken-link',
      image: image,
    }
    const result = await fetch(`/api/postTweet`, {
      body: JSON.stringify(tweetInfo),
      method: 'POST',
    })
    const json = await result.json()
    const newTweets = await fetchTweets()
    setTweets(newTweets)
    toast('Tweet Posted')
    return json
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    postTweet()
    setInput('')
    setImage('')
    setMediaBoxOpen(false)
  }

  const hoverStyle = {
    _hover: {
      cursor: 'pointer',
      transition: 'transform',
      transitionDuration: '500 ease-out',
      transform: 'scale(1.33)',
    },
  }
  return (
    <Flex p={5} gap={2}>
      <Avatar name={session?.user?.name} src={session?.user?.image} />
      <Flex flex='1' align='center' w='full'>
        <chakra.form w='full'>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type='text'
            placeholder="What's happening?"
            _placeholder={{ opacity: 1, color: 'gray.700', fontSize: 'xl' }}
            size='large'
            variant='unstyled'
          />
          <Flex align='center' mt={2}>
            <HStack spacing={2} color='twitter' flex='1'>
              <Icon
                as={PhotoIcon}
                w='5'
                h='5'
                sx={hoverStyle}
                onClick={() => setMediaBoxOpen(!mediaBoxOpen)}
              />
              <Icon as={MagnifyingGlassCircleIcon} w='5' h='5' />
              <Icon as={FaceSmileIcon} w='5' h='5' />
              <Icon as={CalendarIcon} w='5' h='5' />
              <Icon as={MapPinIcon} w='5' h='5' />
            </HStack>
            <Button
              bg='twitter'
              px={5}
              py={2}
              fontWeight='bold'
              color='white'
              rounded='full'
              variant='solid'
              _hover={{ bg: 'twitter' }}
              disabled={!input || !session}
              onClick={handleSubmit}
              size={{base:'sm', lg:'md'}}
            >
              Tweet
            </Button>
          </Flex>
          {mediaBoxOpen && (
            <Box mt={2} py={2}>
              <HStack spacing={2}>
                <Input
                  type='text'
                  placeholder='insert image url'
                  ref={imgInputRef}
                />
                <Button onClick={addImageToTweet}>Add Image</Button>
              </HStack>
            </Box>
          )}
          {image && <Image src={image} alt='imagepreview' boxSize='50%' />}
        </chakra.form>
      </Flex>
    </Flex>
  )
}

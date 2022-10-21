import React, { useState, useEffect } from 'react'
import {
  Box,
  Text,
  Avatar,
  Flex,
  Icon,
  HStack,
  chakra,
  Input,
  Button,
} from '@chakra-ui/react'
import Image from 'next/image'
import TimeAgo from 'react-timeago'
import {
  ChatBubbleBottomCenterIcon,
  ArrowsRightLeftIcon,
  HeartIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { Tweet, Comment, CommentBody } from '../types/type'
import { fetchComments } from '../utils/fetchComments'

interface Props {
  tweet: Tweet
}
export default function TweetComponent({ tweet }: Props) {
  const [comment, setComment] = useState<Comment[]>([])
  const [input, setInput] = useState<string>('')
  const [commentBox, setCommentBox] = useState<boolean>(false)
  const { data: session } = useSession()

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id)
    setComment(comments)
  }

  useEffect(() => {
    refreshComments()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const commentToast = toast.loading('Posting Comment...')
    const comment: CommentBody = {
      comment: input,
      tweetId: tweet._id,
      username: session?.user?.name || 'Unknown User',
      profileImg: session?.user?.image || 'https://bit.ly/broken-link',
    }

    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(comment),
      method: 'POST',
    })

    console.log('WOOHOO we made it', result)
    toast.success('Comment Posted!', {
      id: commentToast,
    })

    setInput('')
    setCommentBox(false)
    refreshComments()
  }

  return (
    <Flex direction='column' gap={3} p={5} borderY='.5px solid #A0AEC0'>
      <Flex gap={3}>
        <Avatar name={tweet.username} src={tweet.profileImg} />
        <Flex direction='column' gap={3} w='full'>
          <Flex align='center' gap={1}>
            <Text mr={1} fontWeight='bold'>
              {tweet.username}
            </Text>
            <Text
              fontSize='sm'
              color='gray'
              display={{ base: 'none', sm: 'inline' }}
            >
              @{tweet.username.replace(/\s+/g, '').toLowerCase()} .
            </Text>
            <TimeAgo
              date={tweet._createdAt}
              style={{ fontSize: '12px', color: 'gray' }}
            />
          </Flex>
          <Text>{tweet.text}</Text>
          {tweet.image && (
            <Box>
              <Image
                src={tweet.image}
                alt='image'
                blurDataURL='URL'
                placeholder='blur'
                objectFit='cover'
                layout='responsive'
                width='50%'
                height='50%'
                className='tweetImage'
              />
            </Box>
          )}
          <Flex align='center' justify='space-between'>
            <HStack
              spacing={2}
              onClick={() => session && setCommentBox(!commentBox)}
              cursor='pointer'
            >
              <Icon
                as={ChatBubbleBottomCenterIcon}
                w='5'
                h='5'
                _hover={{ color: 'twitter' }}
              />
              <Text>{comment.length}</Text>
            </HStack>
            <Icon as={ArrowsRightLeftIcon} w='5' h='5' cursor='pointer' />
            <Icon as={HeartIcon} w='5' h='5' cursor='pointer' />
            <Icon as={ArrowUpTrayIcon} w='5' h='5' cursor='pointer' />
          </Flex>
        </Flex>
      </Flex>
      {commentBox && (
        <chakra.form display='flex' p={4} gap={3} onSubmit={handleSubmit}>
          <Avatar name={session?.user?.name} src={session?.user?.image} />
          <Input
            type='text'
            placeholder='Write a comment...'
            size='lg'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            size={{ base: 'sm', lg: 'md' }}
            bg='twitter'
            px={5}
            py={2}
            fontWeight='bold'
            color='white'
            rounded='full'
            variant='solid'
            _hover={{ bg: 'twitter' }}
            disabled={!input}
            type='submit'
          >
            Post
          </Button>
        </chakra.form>
      )}
      {comment?.length > 0 && (
        <Box
          my={2}
          mt={5}
          maxH='11rem'
          overflowY='scroll'
          p={5}
          borderY='.5px solid #A0AEC0'
        >
          {comment.map((item) => (
            <Flex key={item._id} gap={2} pos='relative'>
              {/* <Divider
                orientation='vertical'
                pos='absolute'
                top={10}
                left={5}
                h={8}
                borderY='.5px'
                borderColor='twitter'
              /> */}
              <Avatar name={item.username} src={item.profileImg} />
              <Box>
                <HStack spacing={2} align='center'>
                  <Text mr={1} fontWeight='bold'>
                    {item.username}
                  </Text>
                  <Text
                    fontSize='sm'
                    color='gray'
                    display={{ base: 'none', sm: 'inline' }}
                  >
                    @{item.username.replace(/\s+/g, '').toLowerCase()}.
                  </Text>
                  <TimeAgo
                    date={item._createdAt}
                    style={{ fontSize: '12px', color: 'gray' }}
                  />
                </HStack>
                <Text>{item.comment}</Text>
              </Box>
            </Flex>
          ))}
        </Box>
      )}
    </Flex>
  )
}

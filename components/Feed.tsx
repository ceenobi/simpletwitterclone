import React, { useState } from 'react'
import { Box, Text, Flex, GridItem, IconButton } from '@chakra-ui/react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import TweetBox from '../components/TweetBox'
import { Tweet } from '../types/type'
import TweetComponent from './TweetComponent'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
  tweets: Tweet[]
}

export default function Feed({ tweets: tweetsProp }: Props) {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)

  const handleRefresh = async () => {
    const refreshToast = toast.loading('Refreshing...')
    const tweets = await fetchTweets()
    setTweets(tweets)
    toast.success('Feed updated!', {
      id: refreshToast
    })
  }
  return (
    <GridItem
      colSpan={{ base: 7, lg: 5 }}
      borderX='.5px solid #A0AEC0'
       maxH='100vh'
      overflow='scroll'
    >
      <Flex justify='space-between' align='center'>
        <Text p={4} fontWeight='bold' fontSize='lg'>
          Home
        </Text>
        <IconButton
          icon={<ArrowPathIcon />}
          w='8'
          h='8'
          aria-label='Refresh tweet'
          variant='unstyled'
          cursor='pointer'
          color='twitter'
          mr='5'
          transition='all'
          transitionDuration='500 ease-out'
          _active={{ transform: 'scale(1.33)', rotate: '180deg' }}
          _hover={{ rotate: '180deg' }}
          onClick={handleRefresh}
          title='refresh tweet'
        />
      </Flex>
      <Box>
        <TweetBox setTweets={setTweets} />
      </Box>
      <Box>
        {tweets.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </Box>
    </GridItem>
  )
}

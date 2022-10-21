import React from 'react'
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  UserIcon,
  HomeIcon,
  EnvelopeIcon,
  QueueListIcon,
  EllipsisHorizontalCircleIcon,
} from '@heroicons/react/24/outline'
import { Image, Flex, GridItem } from '@chakra-ui/react'
import { useSession, signIn, signOut } from 'next-auth/react'
import SidebarRow from './SidebarRow'

export default function Sidebar() {
  const { data: session } = useSession()
  return (
    <GridItem colSpan={2}>
      <Flex direction='column' align={{ base: 'center', md: 'start' }} px={4}>
        <Image
          src='https://res.cloudinary.com/ceenobi/image/upload/v1666168276/icons/Logo_blue_qbscqf.svg'
          alt='twittericon'
          boxSize={10}
          m={3}
        />
        <SidebarRow icon={HomeIcon} title='Home' />
        <SidebarRow icon={HashtagIcon} title='Explore' />
        <SidebarRow icon={BellIcon} title='Notification' />
        <SidebarRow icon={EnvelopeIcon} title='Messages' />
        <SidebarRow icon={BookmarkIcon} title='Bookmarks' />
        <SidebarRow icon={QueueListIcon} title='Lists' />
        <SidebarRow
          icon={UserIcon}
          onClick={session ? signOut : signIn}
          title={session ? 'Sign Out' : 'Sign In'}
        />
        <SidebarRow icon={EllipsisHorizontalCircleIcon} title='More' />
      </Flex>
    </GridItem>
  )
}

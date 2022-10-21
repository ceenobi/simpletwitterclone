import React, { SVGProps } from 'react'
import { Flex, Text, Icon } from '@chakra-ui/react'

interface Props {
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  title: string
  onClick?: () => {}
}

export default function SidebarRow({ icon, title, onClick }: Props) {
  return (
    <Flex
      align='center'
      gap={2}
      px={4}
      py={3}
      rounded='full'
      _hover={{ bg: 'gray.100' }}
      cursor='pointer'
      transition={{ transition: 'all', duration: '200' }}
      role='group'
      maxW='fit-content'
      onClick={() => onClick?.()}
      fontWeight='bold'
    >
      <Icon as={icon} w='6' h='6' />
      <Text
        _groupHover={{ color: 'twitter' }}
        display={{ base: 'none', md: 'inline-flex' }}
        fontSize={{ lg: 'lg' }}
      >
        {title}
      </Text>
    </Flex>
  )
}

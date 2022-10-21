import { Bars } from 'react-loader-spinner'
import { Flex } from '@chakra-ui/react'

export default function Spinner() {
  return (
    <Flex justifyContent='center' align='center' h='100vh'>
      <Bars
        height='80'
        width='80'
        color='#4fa94d'
        ariaLabel='bars-loading'
        wrapperStyle={{}}
        wrapperClass='comment-wrapper'
        visible={true}
      />
    </Flex>
  )
}

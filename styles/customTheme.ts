import { extendTheme } from '@chakra-ui/react'

const breakpoints = {
  sm: '360px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}

const theme = extendTheme(
  {
    fonts: {
      heading: `'Metropolis', sans-serif`,
      body: `'Metropolis', sans-serif`,
    },
    colors: {
      lightGray: '#A0AEC0',
      twitter: '#00ADED',
    },

    p: {
      fontFamily: 'Ramus Med',
    },
    styles: {
      global: () => ({
        a: {
          textDecoration: 'none !important',
          _hover: {
            color: 'red.400',
            transition: 'all 0.5s ease',
          },
        },
        '::-webkit-scrollbar': {
          width: '1px',
        },
        '.tweetImage': {
          rounded: 'lg',
          shadow: 'sm',
          maxH: '15rem',
          m: 5,
          ml: 0,
          mb: 1,
        },
      }),
    },
  },
  { breakpoints }
)
export default theme

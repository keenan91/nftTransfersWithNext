import '../styles/globals.css'
import {ChakraProvider} from '@chakra-ui/react'
import {MoralisProvider} from 'react-moralis'
import theme from '../theme'
function MyApp({Component, pageProps}) {
  return (
    <MoralisProvider
      appId="Q4SFp1T2sY07hT7TEF9kVtNFcWsdDd6etdYGHCxS"
      serverUrl="https://gvrhkyktpyjl.usemoralis.com:2053/server"
    >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </MoralisProvider>
  )
}

export default MyApp

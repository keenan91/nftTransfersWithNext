import {useEffect, useState, useRef} from 'react'
import {useAtom} from 'jotai'
import {contractAtom, collectionJSONAtom} from '../../State/atom'
import {
  Box,
  Grid,
  SimpleGrid,
  Flex,
  Button,
  Container,
  Heading,
  Text,
  Badge,
  Link,
  Select,
  Image,
  useColorMode,
} from '@chakra-ui/react'
import {useMoralis} from 'react-moralis'

export default function CollectionDescription() {
  const [contract] = useAtom(contractAtom)
  const [collectionJSON, setCollectionJSON] = useAtom(collectionJSONAtom)
  const {Moralis} = useMoralis()
  let appId = 'Q4SFp1T2sY07hT7TEF9kVtNFcWsdDd6etdYGHCxS'
  let serverUrl = 'https://gvrhkyktpyjl.usemoralis.com:2053/server'
  Moralis.start({appId, serverUrl})

  useEffect(() => {
    const fetchCollectionJSON = async () => {
      const options = {address: contract, chain: 'Eth'}
      const metaData = await Moralis.Web3API.token.getNFTMetadata(options)
      setCollectionJSON(metaData)
    }
    fetchCollectionJSON()
  }, [contract])
  return (
    <>
      <Heading as="h1" size="lg" align="center">
        {collectionJSON?.name} - {collectionJSON?.symbol}
      </Heading>
    </>
  )
}

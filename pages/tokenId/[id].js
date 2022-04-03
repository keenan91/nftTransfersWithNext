import {useRouter} from 'next/router'
import NextLink from 'next/link'
import {useAtom} from 'jotai'
import {isLoadingAtom} from '../../State/atom'
import M3O from 'm3o'
import {
  Flex,
  Heading,
  Text,
  Badge,
  Link,
  Image,
  Button,
  Box,
  Avatar,
  AvatarBadge,
  AvatarGroup,
} from '@chakra-ui/react'
import {ExternalLinkIcon, ArrowForwardIcon} from '@chakra-ui/icons'

export async function getServerSideProps({query}) {
  const {id} = query
  let stringAry = id.split('&')
  let tokenId = stringAry[0]
  let contractAddress = stringAry[1]
  let apiKey = process.env.API_KEY
  let m3o = new M3O(apiKey)
  let rsp = await m3o.nft.asset({
    contract_address: contractAddress,
    token_id: tokenId,
  })
  return {
    props: {rsp},
  }
}

const TokenId = ({rsp}) => {
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom)
  const {image_url, permalink, token_id} = rsp.asset
  const {address, profile_url, username} = rsp.asset.owner
  const avatar_img = rsp.asset.collection.image_url
  const addressTruncated = address?.slice(0, 6) + '...' + address.slice(-4)
  const clickHandler = () => {
    setIsLoading(true)
  }

  return (
    <Box mt="2rem" fontSize="xl">
      <Flex direction="column" justify="center" alignItems="center">
        <Avatar src={avatar_img} size="2xl" />
        <Text mt="1rem">Owner</Text>
        <Text>
          {username} <ArrowForwardIcon mx="2px" />{' '}
          <Link isExternal href={`https://etherscan.io/address/${address}`}>
            {addressTruncated} <ExternalLinkIcon mx="2px" />{' '}
          </Link>
        </Text>
        <Link isExternal href={permalink}>
          View on Opensea <ExternalLinkIcon mx="2px" />{' '}
        </Link>
        <NextLink href={`/`}>
          <a>
            <Button onClick={clickHandler} mt=".5rem">
              Back To Transacations
            </Button>
          </a>
        </NextLink>
        <Image alt="A picture of the NFT" src={image_url} mt="2rem" />
        <Heading mt="1rem">TokenId - {token_id}</Heading>
      </Flex>
    </Box>
  )
}
export default TokenId

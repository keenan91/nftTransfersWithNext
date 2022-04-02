import {Flex, Heading, Text, Badge, Link, Image} from '@chakra-ui/react'
import {ExternalLinkIcon, ArrowForwardIcon} from '@chakra-ui/icons'

export default function Transaction({transaction}) {
  return (
    <Flex
      direction="column"
      alignItems="center"
      boxShadow="md"
      rounded="md"
      bg="rgba(234,176,90,.1)"
      border="1px"
      borderColor="#eab05a"
      maxW="512px"
      margin="auto"
      p="1rem"
    >
      <Text>
        <Badge colorScheme="red">From:</Badge>{' '}
        <Link href={transaction?.fromLink} isExternal>
          <ArrowForwardIcon mx="2px" />
          {transaction?.from}
          <ExternalLinkIcon mx="2px" />
        </Link>
      </Text>
      <Text>
        <Badge colorScheme="green">To:</Badge>{' '}
        <Link isExternal href={transaction?.toLink}>
          <ArrowForwardIcon mx="2px" />
          {transaction?.to} <ExternalLinkIcon mx="2px" />{' '}
        </Link>
      </Text>
      <Text>Token Id {transaction?.tokenId}</Text>
      {transaction?.time ? (
        <Text>UTC: {transaction?.time}</Text>
      ) : (
        <Text>Time: Not Available</Text>
      )}
    </Flex>
  )
}

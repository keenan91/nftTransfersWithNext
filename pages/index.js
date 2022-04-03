import Head from 'next/head'
import {Box, Flex, Heading} from '@chakra-ui/react'
import CollectionDescription from './Components/CollectionDescription'
import HandleSelect from './Components/HandleSelect'
import TransactionList from './Components/TransactionList'
import ContractInput from './Components/ContractInput'

export default function Home() {
  return (
    <>
      <Box w={['98%', '98%', '98%', '90%', '90%']} margin="auto" mt="2rem">
        <Flex
          justify="center"
          alignItems="center"
          direction={['column', 'column', 'row']}
          gap="1rem"
        >
          <Heading textAlign="center" mb="1rem">
            Recent Transfer History
          </Heading>
          <Flex gap="1rem">
            <HandleSelect />
            <ContractInput />
          </Flex>
        </Flex>
        <CollectionDescription />
        <TransactionList />
      </Box>
    </>
  )
}

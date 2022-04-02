import {SimpleGrid} from '@chakra-ui/react'
import useTransaction from '../../State/useTransaction'
import Transaction from './Transaction'
export default function TransactionList() {
  const transactions = useTransaction()

  return (
    <>
      <SimpleGrid
        columns={[1, 2, 2, 3, 4]}
        spacing={[2, 2, 5, 10]}
        maxW="1200px"
        m="auto"
        mt="1rem"
      >
        {transactions.map((transaction, index) => (
          <Transaction key={index} transaction={transaction} />
        ))}
      </SimpleGrid>
    </>
  )
}

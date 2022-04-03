import {useAtom} from 'jotai'
import {isLoadingAtom} from '../../State/atom'
import {
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Flex,
  Box,
} from '@chakra-ui/react'
import {motion} from 'framer-motion'
import useTransaction from '../../State/useTransaction'
import Transaction from './Transaction'
import {v4 as uuidv4} from 'uuid'
export default function TransactionList() {
  const ary = Array.from(Array(40).keys())
  const transactions = useTransaction()
  const [isLoading] = useAtom(isLoadingAtom)

  const MotionBox = motion(Box)
  return (
    <>
      <SimpleGrid
        columns={[1, 2, 2, 3, 4]}
        spacing={[2, 2, 5, 10]}
        maxW="1200px"
        m="auto"
        mt="1rem"
      >
        {isLoading
          ? ary.map((_, index) => (
              <Flex
                direction="column"
                alignItems="center"
                maxW="512px"
                margin="auto"
                key={uuidv4()}
              >
                <Skeleton minH="130px" minW="270px" />
              </Flex>
            ))
          : transactions.map((transaction, index) => (
              <MotionBox key={uuidv4()} whileHover={{scale: 1.1}}>
                <Transaction transaction={transaction} />
              </MotionBox>
            ))}
      </SimpleGrid>
    </>
  )
}

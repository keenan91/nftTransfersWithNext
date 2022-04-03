import {useAtom} from 'jotai'
import {useForm} from 'react-hook-form'
import {
  Flex,
  Select,
  Input,
  Button,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Text,
} from '@chakra-ui/react'
import {ArrowForwardIcon} from '@chakra-ui/icons'
import {
  contractAtom,
  isLoadingAtom,
  transcationAtom,
  InputErrorAtom,
} from '../../State/atom'
import {ethers} from 'ethers'
import {useMoralis} from 'react-moralis'

export default function ContractInput() {
  const [error, setError] = useAtom(InputErrorAtom)
  const [contract, setContract] = useAtom(contractAtom)
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom)
  const [, setTransaction] = useAtom(transcationAtom)
  const {
    handleSubmit,
    register,
    formState: {errors, isSubmitting},
  } = useForm()
  const {Moralis} = useMoralis()
  let appId = 'Q4SFp1T2sY07hT7TEF9kVtNFcWsdDd6etdYGHCxS'
  let serverUrl = 'https://gvrhkyktpyjl.usemoralis.com:2053/server'
  Moralis.start({appId, serverUrl})
  const onSubmit = async (values) => {
    const {contract} = values
    const isValid = ethers.utils.isAddress(contract)
    // Filter out non valid Ethereum addresses
    if (isValid == false) {
      setError(true)
    } else {
      const options = {
        address: contract,
        chain: 'Eth',
      }
      const nftTransfers = await Moralis.Web3API.token.getContractNFTTransfers(
        options,
      )
      if (nftTransfers.result.length > 0) {
        setError(false)
        setIsLoading(true)
        setContract(contract)
      } else {
        setError(true)
      }
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={error}>
        <Flex gap="1rem">
          <Input
            id="contract"
            placeholder="Enter a Contract"
            {...register('contract', {
              required: 'This is required',
            })}
          />

          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="teal"
            variant="outline"
            isLoading={isSubmitting}
            type="submit"
          ></Button>
        </Flex>
        <FormErrorMessage>
          <Text>Enter a Valid Ethereum NFT Collection address</Text>
        </FormErrorMessage>
      </FormControl>
    </form>
  )
}

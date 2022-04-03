import {useAtom} from 'jotai'
import {contractAtom, transcationAtom, isLoadingAtom} from '../State/atom'
import {useEffect, useRef, useState} from 'react'
import {useMoralis} from 'react-moralis'
import {ethers} from 'ethers'
import abi from '../pages/abi.json'

export default function useTransaction() {
  const [tx, setTx] = useAtom(transcationAtom)
  const [contract] = useAtom(contractAtom)
  const [, setIsLoading] = useAtom(isLoadingAtom)
  const {Moralis} = useMoralis()
  const Provider = new ethers.providers.JsonRpcProvider(
    'https://rpc.ankr.com/eth',
  )
  const Contract = new ethers.Contract(contract, abi, Provider)

  let appId = 'Q4SFp1T2sY07hT7TEF9kVtNFcWsdDd6etdYGHCxS'
  let serverUrl = 'https://gvrhkyktpyjl.usemoralis.com:2053/server'
  Moralis.start({appId, serverUrl})

  const handleLiveTransferUpdate = async (from, to, tokenId) => {
    const utcStr = new Date().toISOString().replace('T', ' ').replace('Z', '')
    let localTime = new Date(utcStr)
    let localTimeString = localTime.toLocaleString()
    let truncateFrom = from.slice(0, 6) + '...' + from.slice(-4)
    let truncateTo = to.slice(0, 6) + '...' + to.slice(-4)
    setTx((prev) => [
      {
        from: truncateFrom,
        to: truncateTo,
        tokenId: tokenId.toString(),
        time: localTimeString,
        fromLink: `https://etherscan.io/address/${from}`,
        toLink: `https://etherscan.io/address/${to}`,
      },
      ...prev,
    ])
  }

  useEffect(() => {
    const fetchNFTS = async () => {
      const options = {
        address: contract,
        chain: 'Eth',
      }
      const nftTransfers = await Moralis.Web3API.token.getContractNFTTransfers(
        options,
      )

      const nftTransfersArray = nftTransfers.result.map((transfer, index) => {
        let blockTimeStamp = transfer.block_timestamp
          .replace('T', ' ')
          .replace('Z', '')
        let localTime = new Date(blockTimeStamp)
        let localTimeString = localTime.toLocaleString()
        let truncateFrom =
          transfer.from_address.slice(0, 6) +
          '...' +
          transfer.from_address.slice(-4)
        let truncateTo =
          transfer.to_address.slice(0, 6) +
          '...' +
          transfer.to_address.slice(-4)

        return {
          time: localTimeString,
          from: truncateFrom,
          to: truncateTo,
          tokenId: transfer.token_id,
          fromLink: `https://etherscan.io/address/${transfer.from_address}`,
          toLink: `https://etherscan.io/address/${transfer.to_address}`,
          hash: transfer.transaction_hash,
          contract: contract,
        }
      })

      setTx((prev) => [...nftTransfersArray, ...prev])
      setIsLoading(false)
    }
    fetchNFTS()
    Contract.on('Transfer', handleLiveTransferUpdate)
    return () => {
      Contract.removeAllListeners('Transfer')
      setTx([])
    }
  }, [contract])

  return tx
}

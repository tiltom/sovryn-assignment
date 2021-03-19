import Web3 from 'web3'

export const formatAvailableBalance = (web3: Web3, balance: string) => parseFloat(web3.utils.fromWei(balance)).toFixed(2);
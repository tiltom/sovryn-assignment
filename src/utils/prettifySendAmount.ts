import Web3 from 'web3';
import { balanceStringToNumber } from './balanceStringToNumber';

export const prettifySendAmount = (web3: Web3, balance: string, multiplier: number): string => `${balanceStringToNumber(
    web3.utils.toBN(parseInt(balance) * multiplier).toString()
  )}` 
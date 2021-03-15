import { useInitializeWeb3 } from './useInitializeWeb3';
import { weenusTokenABI } from '../contracts/weenusTokenABI';
import { Contract } from 'web3-eth-contract';

const weenusTokenContractAddress = '0x101848D5C5bBca18E6b4431eEdF6B95E9ADF82FA';

export const useInitializeWeenusContract = (): [contract: Contract] => {
   const [web3] = useInitializeWeb3();

   const contract = new web3.eth.Contract(weenusTokenABI, weenusTokenContractAddress);

   return [contract];
};
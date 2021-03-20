import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { weenusTokenABI } from '../contracts/weenusTokenABI';

const ethereum = (window as any).ethereum;
const weenusTokenContractAddress = '0x101848D5C5bBca18E6b4431eEdF6B95E9ADF82FA';

export const useInitializeBlockchainApi = (): [web3: Web3, contract: Contract] => {
    const web3 = new Web3(ethereum);
    const contract = new web3.eth.Contract(weenusTokenABI, weenusTokenContractAddress, { gasPrice: "20000000000", gas: 51379 });

    return [web3, contract];
}
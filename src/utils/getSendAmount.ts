import Web3 from 'web3';

export const getSendAmount = (web3: Web3, balance: string, multiplier: number) => {
    const tokenBalance = web3.utils.fromWei(balance);
 
    return web3.utils.toWei(`${parseFloat(tokenBalance) * multiplier}`);
}
import Web3 from 'web3';

export const formatSendAmount = (web3: Web3, balance: string, multiplier: number): string => {
  const baseBalance = web3.utils.fromWei(balance);
  const sendAmount = parseFloat(baseBalance) * multiplier;

  return sendAmount.toFixed(2);
}
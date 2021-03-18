export const shortenTxHash = (txHash: string): string => {
    if(!txHash) return '';

    return `${txHash.substring(0, 10)}....${txHash.substring((txHash.length - 10))}`;
}
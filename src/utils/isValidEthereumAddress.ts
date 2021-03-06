export const isValidEthereumAddress = (address: string): boolean => {
    const regex = new RegExp('^0x[a-fA-F0-9]{40}$');

    return regex.test(address);
};
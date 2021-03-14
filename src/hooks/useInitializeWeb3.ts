import { useEffect, useState } from 'react'
import Web3 from 'web3';

const ethereum = (window as any).ethereum;

export const useInitializeWeb3 = (): [web3: Web3, ethereum: any] => {
    const [web3, setWeb3] = useState<Web3>(null);

    useEffect(() => {
        setWeb3(new Web3(ethereum));
    }, []);

    return [web3, ethereum];
}
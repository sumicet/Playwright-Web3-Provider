import { Web3Provider } from '@ethersproject/providers';

const setProvider = async () => {
    try {
        window.ethereum = 'hi';
        const { EthereumPrivateKeyProvider } = await import('@web3auth/ethereum-provider');
        const init = await EthereumPrivateKeyProvider.getProviderInstance({
            chainConfig: {
                rpcTarget: 'https://rpc-mumbai.maticvigil.com',
                chainId: '0x13881', // hex chain id
                blockExplorer: '',
                displayName: 'Matic Mumbai Testnet',
                ticker: 'matic',
                tickerName: 'matic',
            },
            privKey: process.env.PRIVATE_KEY,
        });

        if (!init?.provider) {
            return;
        }

        const provider = new Web3Provider(init.provider);

        window.ethereum = {
            ...provider.provider,
            request: async (...args) => {
                console.log(args[0].method);
                if (args[0].method === 'eth_requestAccounts') {
                    args[0].method = 'eth_accounts';
                }
                const result = await provider.provider?.request?.(...args);
                console.log(result, 'from', args[0].method);
                return result;
            },
            once: async (...args) => provider.once(...args),
            on: async (...args) => provider.on(...args),
            isMetaMask: true,
        };
    } catch (error) {
        console.log(error);
    }
};

setProvider();

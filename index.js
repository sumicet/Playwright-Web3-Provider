const HDWalletProvider = require('@truffle/hdwallet-provider');

const provider = new HDWalletProvider({
    mnemonic: process.env.SECRET_RECOVERY_PHRASE,
    providerOrUrl: 'https://matic-mumbai.chainstacklabs.com',
    addressIndex: 0,
    numberOfAddresses: 1,
    pollingInterval: 10000,
});

window['ethereum'] = provider;

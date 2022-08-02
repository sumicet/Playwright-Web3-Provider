import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { Eip1193Bridge } from '@ethersproject/experimental/lib/eip1193-bridge';

const TEST_ADDRESS = Wallet.fromMnemonic(process.env.SECRET_RECOVERY_PHRASE).address;

class CustomizedBridge extends Eip1193Bridge {
    async sendAsync(...args) {
        return this.send(...args);
    }

    async send(...args) {
        const isCallbackForm = typeof args[0] === 'object' && typeof args[1] === 'function';
        let callback;
        let method;
        let params;
        if (isCallbackForm) {
            callback = args[1];
            // eslint-disable-next-line prefer-destructuring
            method = args[0].method;
            // eslint-disable-next-line prefer-destructuring
            params = args[0].params;
        } else {
            method = args[0];
            params = args[1];
        }
        if (method === 'eth_requestAccounts' || method === 'eth_accounts') {
            if (isCallbackForm) {
                return callback({ result: [TEST_ADDRESS] });
            }
            return Promise.resolve([TEST_ADDRESS]);
        }
        if (method === 'eth_chainId') {
            if (isCallbackForm) {
                return callback(null, { result: '0x13881' }); // 80001
            }
            return Promise.resolve('0x13881'); // 80001
        }
        try {
            let result = null;
            if (method === 'personal_sign') {
                result = await super.send('eth_sign', [params[1], params[0]]);
            } else if (method === 'eth_sendTransaction') {
                // Hexlify will not take gas, must be gasLimit, set this property to be gasLimit
                params[0].gasLimit = params[0].gas;
                delete params[0].gas;
                // If from is present on eth_sendTransaction it errors, removing it makes the library set
                // from as the connected wallet which works fine
                delete params[0].from;
                const req = JsonRpcProvider.hexlifyTransaction(params[0]);
                // Hexlify sets the gasLimit property to be gas again and send transaction requires gasLimit
                req.gasLimit = req.gas;
                delete req.gas;
                // Send the transaction
                const tx = await this.signer.sendTransaction(req);
                result = tx.hash;
            } else {
                result = await super.send(method, params);
            }
            if (isCallbackForm) {
                return callback(null, { result });
            }
            return result;
        } catch (error) {
            if (isCallbackForm) {
                return callback(error, null);
            }
            throw error;
        }
    }
}

const rpcProvider = new JsonRpcProvider('https://matic-mumbai.chainstacklabs.com', 80001);
const privateKey = Wallet.fromMnemonic(process.env.SECRET_RECOVERY_PHRASE).privateKey;
const signer = new Wallet(privateKey, rpcProvider);

const provider = new CustomizedBridge(signer, rpcProvider);

window['ethereum'] = provider;

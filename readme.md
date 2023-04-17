## Web3 Provider for Playwright

### What does this do?

Normally we get the ethereum provider from a wallet extension. Running tests in
headless mode means we have no extensions installed => no ethereum provider.
This script will inject a customized provider with a wallet that signs
transactions automatically. It can:
- send transactions
- sign transactions
- request accounts
- contract calls

For now, it only works for Mumbai, but you can easily customize it to work with
other chains by changing the `rpc url` and the `chain id` (`0x13881`).

### How to setup?

1. Initialize a var called `PRIVATE_KEY` inside an .env file

2. Run `npm run bundle` to compile `index.js` with webpack

3. The result is `bundle`.

4. Open `test.html` and console log `window.ethereum` to test the code.

5. Copy this file in the project where you use
   `Playwright`. Usage:
   ```js
   await page.addInitScript({ path: './bundle/734.provider.js' });
   await page.addInitScript({ path: './bundle/895.provider.js' });
   await page.addInitScript({ path: './bundle/provider.js' });
   ```

6. Test if it works: `expect(await page.evaluate(() =>
   window['ethereum'])).toBeTruthy();`

7. You can mimic `MetaMask` or other wallets by changing the wallet field
   (`isMetaMask`, `isCoinbaseWallet`, etc.) from `index.js`.

Warning: The `provider.js` file will contain your private key.

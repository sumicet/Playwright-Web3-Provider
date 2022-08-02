## Web3 Provider for Playwright

1. Initialize a var called `SECRET_RECOVERY_PHRASE` inside an .env file

2. Run `npm run bundle` to compile `index.js` with webpack

3. The result is `bundle/provider.js`.

4. Open test.html and console log window.ethereum to test the code.

5. Copy this file in the project where you use
   `Playwright`. Usage: `await page.addInitScript({ path: _path_to_provider.js });`

6. Test if it works: `expect(await page.evaluate(() =>
   window['ethereum'])).toBeTruthy();`

7. You can mimic `MetaMask` or other wallets by changing the wallet field
   (`isMetaMask`, `isCoinbaseWallet`, etc.) like below
```
await page.addInitScript(() => {
    window['ethereum']['isMetaMask'] = true;
});
```

Warning: The `provider.js` file will contain your secret recovery phrase so
watch where you post this code.
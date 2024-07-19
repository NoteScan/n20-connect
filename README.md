
<div align="center">
  <a href="https://github.com/NoteScan/n20-connect/blob/main/README_ZH.md">中文</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/NoteScan/n20-connect/blob/main/doc.md">Document</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <br />
  <a href="https://github.com/IceHugh/btc-connect">Thanx to btc-connect</a>
  <br />
  <a href="https://noteprotocol.org/">NOTE Protocol</a>
</div>

<div align="center">
  <img src="https://github.com/NoteScan/n20-connect/blob/main/images/example_black.jpg" width="300">
  <img src="https://github.com/NoteScan/n20-connect/blob/main/images/example_white.jpg" width="300">
  <br />
</div>

# N20 Connect

N20 Connect is a library that allows you to easily integrate N20 compatible Bitcoin wallets (Unisat, ChainBow and NOTEMarketWallet) into your web application. With this library, you can enable your users to manage their Bitcoin addresses, send and receive transactions, and interact with Bitcoin wallets directly from your web app.

## Features

- Connect to popular N20 compatible (Unisat, ChainBow and NOTEMarketWallet)
- Manage Bitcoin addresses and check balances
- Send and receive Bitcoin transactions
- Sign messages and PSBTs
- Push transactions and PSBTs to the network
- Switch between different connectors and networks
- Customizable UI theme (light and dark)
- Typescript support
- Support for React components
- Support for pure JavaScript usage (compatible with Vue, vanilla JS, etc.)

## Installation

You can install the package via npm, yarn, pnpm or bun:

### npm
```bash
npm install n20-connect
```

### Yarn
```bash
yarn add n20-connect
```

### pnpm
```bash
pnpm add n20-connect
```

### bun
```bash
bun add n20-connect
```

## Requirements

For React:
- react (>=16.8.0)
- react-dom (>=16.8.0)

The library also uses the `zustand` state management library for React hooks.

## Usage

### React

Import the `WalletConnectReact` component and wrap your application with it:

```jsx
import React from 'react';
import { WalletConnectReact } from 'n20-connect/dist/react';
import "n20-connect/dist/style/index.css";

const App = () => {
  const config = {
    network: 'BTClivenet', // or 'testnet'
    defaultConnectorId: 'chainbow', // or 'chainbow'
  };

  return (
    <WalletConnectReact
      config={config}
      onConnectSuccess={(btcWallet) => {
        // Handle successful connection
      }}
      theme="dark"
      onConnectError={(error) => {
        // Handle connection error
      }}
      onDisconnectSuccess={() => {
        // Handle successful disconnection
      }}
      onDisconnectError={(error) => {
        // Handle disconnection error
      }}
    >
      {/* Your app components */}
    </WalletConnectReact>
  );
};

export default App;
```

You can also use the `useReactWalletStore` hook to access the wallet store and perform various actions:

```jsx
import React from 'react';
import { useReactWalletStore } from 'n20-connect/dist/react';

const MyComponent = () => {
  const walletStore = useReactWalletStore();

  const connect = () => {
    walletStore.connect();
  };

  const disconnect = () => {
    walletStore.disconnect();
  };

  const sendBitcoin = async () => {
    const toAddress = '...';
    const amount = 1000;
    const txid = await walletStore.btcWallet?.sendToAddress(toAddress, amount);
    console.log('Transaction ID:', txid);
  };

  return (
    <div>
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
      <button onClick={sendBitcoin}>Send Bitcoin</button>
    </div>
  );
};

export default MyComponent;
```

### Pure JavaScript

You can use the `BtcWalletConnect` class directly in your JavaScript code:

```javascript
import BtcWalletConnect from 'n20-connect';

const config = {
  network: 'BTClivenet', // or 'testnet'
  defaultConnectorId: 'chainbow', // or 'chainbow'
};

const btcWallet = new BtcWalletConnect(config);

// Connect to the wallet
btcWallet.connect()
  .then(() => {
    // Handle successful connection
  })
  .catch((error) => {
    // Handle connection error
  });

// Send Bitcoin
const toAddress = '...';
const amount = 1000;
btcWallet.sendToAddress(toAddress, amount)
  .then((txid) => {
    console.log('Transaction ID:', txid);
  })
  .catch((error) => {
    // Handle error
  });

// Disconnect from the wallet
btcWallet.disconnect()
  .then(() => {
    // Handle successful disconnection
  })
  .catch((error) => {
    // Handle disconnection error
  });
```

This pure JavaScript usage makes it compatible with Vue, vanilla JavaScript, and other frameworks or libraries.

For more detailed information and examples, please refer to the [Doc](https://github.com/NoteScan/n20-connect/doc.md).

## TODO

- Support NOTE Protocol directly


## License

N20 Connect is licensed under the [MIT License](https://github.com/NoteScan/n20-connect/blob/main/LICENSE).

## Support and Donation

If you find this project helpful and you would like to support its continued development, feel free to make a donation through one of the following methods. Your support is a tremendous encouragement for us!

You can also donate N20 Token using the following cryptocurrency addresses:

- BTC: bc1pxdh2tzxdt5kvcpsppg0e3vh3z7jzhksqwcuyg084uwj0n8ktgv2s4s2kh6
<img src="https://github.com/NoteScan/n20-connect/blob/main/images/btc_qrcode.jpg" width="300" >
Thank you to every supporter for your contributions!

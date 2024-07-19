<div align="center">
  <a href="https://github.com/NoteScan/n20-connect/blob/main/README.md">英文</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/NoteScan/n20-connect/blob/main/doc.md">文档</a>
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

N20 Connect 是一个库，可以让你轻松地将NOTE协议兼容的比特币钱包（Unisat, ChainBow 和 NOTEMarketWallet）集成到你的 Web 应用程序中。使用这个库，你可以让用户管理他们的比特币地址、发送和接收交易，并直接从你的 Web 应用程序与比特币钱包进行交互。

## 特性

- 连接流行的NOTE协议兼容的比特币钱包（Unisat, ChainBow 和 NOTEMarketWallet）
- 管理比特币地址并查看余额
- 发送和接收比特币交易
- 签署消息和 PSBT
- 将交易和 PSBT 推送到网络
- 在不同的连接器和网络之间切换
- 可自定义 UI 主题（浅色和深色）
- 支持 TypeScript
- 支持 React 组件
- 支持纯 JavaScript 使用（兼容 Vue、原生 JS 等）

## 安装

你可以通过 npm、yarn、pnpm 或 bun 安装这个包：

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

## 要求

对于 React:
- react (>=16.8.0)
- react-dom (>=16.8.0)

该库还使用了 `zustand` 状态管理库，用于 React hooks。

## 使用

### React

导入 `WalletConnectReact` 组件，并将其包裹在你的应用程序中：

```jsx
import React from 'react';
import { WalletConnectReact } from 'n20-connect/dist/react';
import "n20-connect/dist/style/index.css";

const App = () => {
  const config = {
    network: 'BTClivenet', // 或 'BTCtestnet', 'livenet', 'testnet'
    defaultConnectorId: 'chainbow', // 或 'unisat', 'notemarket'
  };

  return (
    <WalletConnectReact
      config={config}
      theme="dark"
      onConnectSuccess={(btcWallet) => {
        // 处理成功连接
      }}
      onConnectError={(error) => {
        // 处理连接错误
      }}
      onDisconnectSuccess={() => {
        // 处理成功断开连接
      }}
      onDisconnectError={(error) => {
        // 处理断开连接错误
      }}
    >
      {/* 你的应用组件 */}
    </WalletConnectReact>
  );
};

export default App;
```

你还可以使用 `useReactWalletStore` hook 来访问钱包存储和执行各种操作：

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
    console.log('交易 ID:', txid);
  };

  return (
    <div>
      <button onClick={connect}>连接</button>
      <button onClick={disconnect}>断开连接</button>
      <button onClick={sendBitcoin}>发送比特币</button>
    </div>
  );
};

export default MyComponent;
```

### 纯 JavaScript

你可以直接在你的 JavaScript 代码中使用 `BtcWalletConnect` 类：

```javascript
import BtcWalletConnect from 'n20-connect';

const config = {
  network: 'BTClivenet', // 或 'BTCtestnet', 'livenet', 'testnet'
  defaultConnectorId: 'chainbow', // 或 'unisat', 'notemarket'
};

const btcWallet = new BtcWalletConnect(config);

// 连接钱包
btcWallet.connect()
  .then(() => {
    // 处理成功连接
  })
  .catch((error) => {
    // 处理连接错误
  });

// 发送比特币
const toAddress = '...';
const amount = 1000;
btcWallet.sendToAddress(toAddress, amount)
  .then((txid) => {
    console.log('交易 ID:', txid);
  })
  .catch((error) => {
    // 处理错误
  });

// 断开钱包连接
btcWallet.disconnect()
  .then(() => {
    // 处理成功断开连接
  })
  .catch((error) => {
    // 处理断开连接错误
  });
```

这种纯 JavaScript 的使用方式使其兼容 Vue、原生 JavaScript 和其他框架或库。

更多详细信息和示例，请参阅 [Doc](https://github.com/NoteScan/n20-connect/doc.md)。

## 待办事项

- 直接支持NOTE协议


## 许可证

N20 Connect 使用 [MIT 许可证](https://github.com/NoteScan/n20-connect/blob/main/LICENSE)。

## 支持与捐赠

如果你觉得这个项目对你有帮助，并且你愿意支持项目的持续发展，欢迎通过以下方式进行捐赠。你的支持是我们持续改进的动力！


你还可以通过以下加密货币地址捐赠N20 Token：

- NOTE: bc1pxdh2tzxdt5kvcpsppg0e3vh3z7jzhksqwcuyg084uwj0n8ktgv2s4s2kh6
<img src="https://github.com/NoteScan/n20-connect/blob/main/images/btc_qrcode.jpg" width="300">

感谢每一位支持者的贡献！

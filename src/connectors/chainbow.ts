import { chainbowLogo } from '../assets';
import { WalletNetwork, Balance } from '../types';
import { BtcConnector } from './base';

const getChainBowNetwork = (network: WalletNetwork): WalletNetwork => {
  switch (network) {
    case 'BTCtestnet':
      return 'BTCtestnet';
    default:
      return 'BTClivenet';
  }
};

export namespace ChainBowWalletTypes {
  export type AccountsChangedEvent = (
    event: 'accountsChanged' | 'networkChanged',
    handler: (accounts: Array<string> | string) => void,
  ) => void;

  export type Inscription = {
    inscriptionId: string;
    inscriptionNumber: string;
    address: string;
    outputValue: string;
    content: string;
    contentLength: string;
    contentType: string;
    preview: string;
    timestamp: number;
    offset: number;
    genesisTransaction: string;
    location: string;
  };

  export type GetInscriptionsResult = { total: number; list: Inscription[] };

  export type SendInscriptionsResult = { txid: string };

  export type Network = 'BTClivenet' | 'BTCtestnet';
}
export type PsbtOption = {
  autoFinalized?: boolean;
  toSignInputs: {
    index: number;
    address?: string;
    publicKey?: string;
    sighashTypes?: number[];
    disableTweakSigner?: boolean;
  }[];
};
export type ChainBow = {
  requestAccounts: () => Promise<string[]>;
  getAccounts: () => Promise<string[]>;
  on: ChainBowWalletTypes.AccountsChangedEvent;
  removeListener: ChainBowWalletTypes.AccountsChangedEvent;
  switchNetwork: (network: 'BTClivenet' | 'BTCtestnet') => Promise<void>;
  getNetwork: () => Promise<ChainBowWalletTypes.Network>;
  getPublicKey: () => Promise<string>;
  getBalance: () => Promise<Balance>;
  sendBitcoin: (
    address: string,
    atomicAmount: number,
    options?: { feeRate: number },
  ) => Promise<string>;
  pushTx: ({ rawtx }: { rawtx: string }) => Promise<string>;
  pushPsbt: (psbtHex: string) => Promise<string>;
  signMessage: (
    message: string,
    type?: 'ecdsa' | 'bip322-simple',
  ) => Promise<string>;
  signPsbt: (psbtHex: string, options?: PsbtOption) => Promise<string>;
  finishPsbt: (psbtHex: string, options?: PsbtOption) => Promise<string>;
  signPsbts: (psbtHexs: string[], options?: PsbtOption[]) => Promise<string[]>;
};

declare global {
  interface Window {
    chainbow: ChainBow;
  }
}

export class ChainBowConnector extends BtcConnector {
  readonly id = 'chainbow';
  readonly name: string = 'ChainBow';
  readonly logo: string = chainbowLogo;
  readonly networks: WalletNetwork[] = ['BTClivenet', 'BTCtestnet'];
  public homepage = 'https://chainbow.io';
  public banance: Balance = { confirmed: 0, unconfirmed: 0, total: 0 };
  public chainbow: ChainBow;

  constructor(network: WalletNetwork) {
    super(network);
    this.chainbow = window.chainbow;
  }
  on(event: 'accountsChanged' | 'networkChanged', handler: any) {
    if (!this.chainbow) {
      throw new Error('ChainBow not installed');
    }
    this.chainbow.on(event, handler);
  }
  removeListener(event: 'accountsChanged' | 'networkChanged', handler: any) {
    if (!this.chainbow) {
      throw new Error('ChainBow not installed');
    }
    this.chainbow.removeListener(event, handler);
  }
  async connect(): Promise<boolean> {
    this.connected = false;
    try {
      if (!this.chainbow) {
        throw new Error('ChainBow not installed');
      }
      await this.requestAccounts();
      await this.getCurrentInfo();
      this.connected = true;
      return true;
    } catch (error) {
      throw error;
    }
  }
  async requestAccounts() {
    if (!this.chainbow) {
      throw new Error('ChainBow not installed');
    }
    return this.chainbow.requestAccounts();
  }
  async getCurrentInfo() {
    if (!this.chainbow) {
      throw new Error('ChainBow not installed');
    }
    const accounts = await this.chainbow.getAccounts();
    if (accounts.length) {
      this.address = accounts[0];
      const [publicKey, network, banance] = await Promise.all([
        this.chainbow.getPublicKey(),
        this.chainbow.getNetwork(),
        this.chainbow.getBalance(),
      ]);
      this.publicKey = publicKey;
      this.network = network;
      this.banance = banance;
      this.connected = true;
    }
  }
  async disconnect(): Promise<void> {
    this.address = undefined;
    this.publicKey = undefined;
    this.connected = false;
    this.banance = { confirmed: 0, unconfirmed: 0, total: 0 };
  }
  async getAccounts(): Promise<string[]> {
    if (!this.chainbow) {
      throw new Error('ChainBow not installed');
    }
    return this.chainbow.getAccounts();
  }
  async sendToAddress(toAddress: string, amount: number) {
    if (!this.chainbow) {
      throw new Error('ChainBow not installed');
    }
    return this.chainbow.sendBitcoin(toAddress, amount);
  }
  async switchNetwork(network: WalletNetwork) {
    if (!this.chainbow) {
      throw new Error('ChainBow not installed');
    }
    await this.chainbow.switchNetwork(
      getChainBowNetwork(network) as ChainBowWalletTypes.Network,
    );
  }

  async getPublicKey() {
    if (!this.chainbow) {
      throw new Error('ChainBow not installed');
    }
    return this.chainbow.getPublicKey();
  }

  async getBalance() {
    if (!this.chainbow) {
      throw new Error('ChainBow not installed');
    }
    return this.chainbow.getBalance();
  }
  async signPsbt(psbtHex: string, options?: any) {
    if (!this.chainbow) {
      throw new Error('ChainBow not installed');
    }
    return this.chainbow.signPsbt(psbtHex, options);
  }
  async signMessage(message: string) {
    if (!this.chainbow) {
      throw new Error('ChainBow not installed');
    }
    return this.chainbow.signMessage(message);
  }
  async signPsbts(psbtHexs: string[], options?: any) {
    if (!this.chainbow) {
      throw new Error('ChainBow not installed');
    }
    return this.chainbow.signPsbts(psbtHexs, options);
  }
  async pushTx(rawTx: string) {
    if (!this.chainbow) {
      throw new Error('ChainBow not installed');
    }
    return this.chainbow.pushTx({ rawtx: rawTx });
  }
  async pushPsbt(psbtHex: string) {
    if (!this.chainbow) {
      throw new Error('ChainBow not installed');
    }
    return this.chainbow.pushPsbt(psbtHex);
  }
  async finishPsbt(psbtHex: string, options?: any) {
    if (!this.chainbow) {
      throw new Error('ChainBow not installed');
    }
    return this.chainbow.finishPsbt(psbtHex, options);
  }
}

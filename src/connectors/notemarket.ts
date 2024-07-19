import { notemarketLogo } from '../assets';
import { WalletNetwork, Balance } from '../types';
import { BtcConnector } from './base';

const getNoteMarketNetwork = (network: WalletNetwork): WalletNetwork => {
  switch (network) {
    case 'testnet':
      return 'testnet';
    default:
      return 'livenet';
  }
};

export namespace NoteMarketWalletTypes {
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

  export type Network = 'livenet' | 'testnet';
}
export type NoteMarket = {
  requestAccounts: () => Promise<string[]>;
  getAccounts: () => Promise<string[]>;
  on: NoteMarketWalletTypes.AccountsChangedEvent;
  removeListener: NoteMarketWalletTypes.AccountsChangedEvent;
  getInscriptions: (
    cursor: number,
    size: number,
  ) => Promise<NoteMarketWalletTypes.GetInscriptionsResult>;
  sendInscription: (
    address: string,
    inscriptionId: string,
    options?: { feeRate: number },
  ) => Promise<NoteMarketWalletTypes.SendInscriptionsResult>;
  switchNetwork: (network: 'livenet' | 'testnet') => Promise<void>;
  getNetwork: () => Promise<NoteMarketWalletTypes.Network>;
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
  signPsbt: (
    psbtHex: string,
    options?: {
      autoFinalized?: boolean;
      toSignInputs: {
        index: number;
        address?: string;
        publicKey?: string;
        sighashTypes?: number[];
        disableTweakSigner?: boolean;
      }[];
    },
  ) => Promise<string>;

  signPsbts: (
    psbtHexs: string[],
    options?: {
      autoFinalized?: boolean;
      toSignInputs: {
        index: number;
        address?: string;
        publicKey?: string;
        sighashTypes?: number[];
        disableTweakSigner?: boolean;
      };
    }[],
  ) => Promise<string[]>;
};

declare global {
  interface Window {
    NOTEMarketWallet: NoteMarket;
  }
}

export class NoteMarketConnector extends BtcConnector {
  readonly id = 'NOTEMarketWallet';
  readonly name: string = 'NOTEMarket';
  readonly logo: string = notemarketLogo;
  readonly networks: WalletNetwork[] = ['livenet', 'testnet'];
  public homepage = 'https://notemarket.io';
  public banance: Balance = { confirmed: 0, unconfirmed: 0, total: 0 };
  public NOTEMarketWallet: NoteMarket;

  constructor(network: WalletNetwork) {
    super(network);
    this.NOTEMarketWallet = window.NOTEMarketWallet;
  }
  on(event: 'accountsChanged' | 'networkChanged', handler: any) {
    if (!this.NOTEMarketWallet) {
      throw new Error('NoteMarket not installed');
    }
    this.NOTEMarketWallet.on(event, handler);
  }
  removeListener(event: 'accountsChanged' | 'networkChanged', handler: any) {
    if (!this.NOTEMarketWallet) {
      throw new Error('NoteMarket not installed');
    }
    this.NOTEMarketWallet.removeListener(event, handler);
  }
  async connect(): Promise<boolean> {
    this.connected = false;
    try {
      if (!this.NOTEMarketWallet) {
        throw new Error('NoteMarket not installed');
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
    if (!this.NOTEMarketWallet) {
      throw new Error('NoteMarket not installed');
    }
    return this.NOTEMarketWallet.requestAccounts();
  }
  async getCurrentInfo() {
    if (!this.NOTEMarketWallet) {
      throw new Error('NoteMarket not installed');
    }
    const accounts = await this.NOTEMarketWallet.getAccounts();
    if (accounts.length) {
      this.address = accounts[0];
      const [publicKey, network, banance] = await Promise.all([
        this.NOTEMarketWallet.getPublicKey(),
        this.NOTEMarketWallet.getNetwork(),
        this.NOTEMarketWallet.getBalance(),
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
    if (!this.NOTEMarketWallet) {
      throw new Error('NoteMarket not installed');
    }
    return this.NOTEMarketWallet.getAccounts();
  }
  async sendToAddress(toAddress: string, amount: number) {
    if (!this.NOTEMarketWallet) {
      throw new Error('NoteMarket not installed');
    }
    return this.NOTEMarketWallet?.sendBitcoin(toAddress, amount);
  }

  async switchNetwork(network: WalletNetwork) {
    if (!this.NOTEMarketWallet) {
      throw new Error('NoteMarket not installed');
    }
    await this.NOTEMarketWallet.switchNetwork(
      getNoteMarketNetwork(network) as NoteMarketWalletTypes.Network,
    );
  }

  async getPublicKey() {
    if (!this.NOTEMarketWallet) {
      throw new Error('NoteMarket not installed');
    }
    return this.NOTEMarketWallet.getPublicKey();
  }

  async getBalance() {
    if (!this.NOTEMarketWallet) {
      throw new Error('NoteMarket not installed');
    }
    return this.NOTEMarketWallet.getBalance();
  }
  async signPsbt(psbtHex: string, options?: any) {
    if (!this.NOTEMarketWallet) {
      throw new Error('NoteMarket not installed');
    }
    return this.NOTEMarketWallet.signPsbt(psbtHex, options);
  }
  async signMessage(message: string) {
    if (!this.NOTEMarketWallet) {
      throw new Error('NoteMarket not installed');
    }
    return this.NOTEMarketWallet.signMessage(message);
  }
  async signPsbts(psbtHexs: string[], options?: any) {
    if (!this.NOTEMarketWallet) {
      throw new Error('NoteMarket not installed');
    }
    return this.NOTEMarketWallet.signPsbts(psbtHexs, options);
  }
  async pushTx(rawTx: string) {
    if (!this.NOTEMarketWallet) {
      throw new Error('NoteMarket not installed');
    }
    return this.NOTEMarketWallet.pushTx({ rawtx: rawTx });
  }
  async pushPsbt(psbtHex: string) {
    if (!this.NOTEMarketWallet) {
      throw new Error('NoteMarket not installed');
    }
    return this.NOTEMarketWallet.pushPsbt(psbtHex);
  }
}

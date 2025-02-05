// Generated by dts-bundle-generator v9.5.1

import React$1 from 'react';

export type WalletNetwork = "livenet" | "testnet" | "BTClivenet" | "BTCtestnet";
export type Balance = {
	confirmed: number;
	unconfirmed: number;
	total: number;
};
export interface BtcWalletConnectOptions {
	network?: WalletNetwork;
	defaultConnectorId?: BtcConnectorId;
}
export type BtcConnectorId = "unisat" | "chainbow" | "notemarket";
export type MessageType = "ecdsa" | "bip322-simple";
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
export type Address = string;
declare abstract class BtcConnector {
	/** Unique connector id */
	abstract readonly id: string;
	/** Connector name */
	abstract readonly name: string;
	abstract readonly logo: string;
	/** Extension or Snap homepage */
	abstract homepage: string;
	/** Whether connector is usable */
	ready: boolean;
	connected: boolean;
	address: Address | undefined;
	publicKey: string | undefined;
	network: WalletNetwork;
	networks: WalletNetwork[];
	constructor(network: WalletNetwork);
	abstract connect(): Promise<boolean>;
	abstract sendToAddress(toAddress: string, amount: number): Promise<string>;
	abstract signPsbt(psbtHex: string, options?: any): Promise<string>;
	disconnect(): void;
	getAccount(): string | undefined;
	isAuthorized(): boolean;
	getNetwork(): Promise<WalletNetwork>;
	getPublicKey(): Promise<string>;
}
declare namespace UnisatWalletTypes {
	type AccountsChangedEvent = (event: "accountsChanged" | "networkChanged", handler: (accounts: Array<string> | string) => void) => void;
	type Inscription = {
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
	type GetInscriptionsResult = {
		total: number;
		list: Inscription[];
	};
	type SendInscriptionsResult = {
		txid: string;
	};
	type Network = "livenet" | "testnet";
}
export type Unisat = {
	requestAccounts: () => Promise<string[]>;
	getAccounts: () => Promise<string[]>;
	on: UnisatWalletTypes.AccountsChangedEvent;
	removeListener: UnisatWalletTypes.AccountsChangedEvent;
	switchNetwork: (network: "livenet" | "testnet") => Promise<void>;
	getNetwork: () => Promise<UnisatWalletTypes.Network>;
	getPublicKey: () => Promise<string>;
	getBalance: () => Promise<Balance>;
	sendBitcoin: (address: string, atomicAmount: number, options?: {
		feeRate: number;
	}) => Promise<string>;
	pushTx: ({ rawtx }: {
		rawtx: string;
	}) => Promise<string>;
	pushPsbt: (psbtHex: string) => Promise<string>;
	signMessage: (message: string, type?: "ecdsa" | "bip322-simple") => Promise<string>;
	signPsbt: (psbtHex: string, options?: PsbtOption) => Promise<string>;
	signPsbts: (psbtHexs: string[], options?: PsbtOption[]) => Promise<string[]>;
};
declare class UnisatConnector extends BtcConnector {
	readonly id = "unisat";
	readonly name: string;
	readonly logo: string;
	readonly networks: WalletNetwork[];
	homepage: string;
	banance: Balance;
	unisat: Unisat;
	constructor(network: WalletNetwork);
	on(event: "accountsChanged" | "networkChanged", handler: any): void;
	removeListener(event: "accountsChanged" | "networkChanged", handler: any): void;
	connect(): Promise<boolean>;
	requestAccounts(): Promise<string[]>;
	getCurrentInfo(): Promise<void>;
	disconnect(): Promise<void>;
	getAccounts(): Promise<string[]>;
	sendToAddress(toAddress: string, amount: number): Promise<string>;
	switchNetwork(network: WalletNetwork): Promise<void>;
	getPublicKey(): Promise<string>;
	getBalance(): Promise<Balance>;
	signPsbt(psbtHex: string, options?: any): Promise<string>;
	signMessage(message: string): Promise<string>;
	signPsbts(psbtHexs: string[], options?: any[]): Promise<string[]>;
	pushTx(rawTx: string): Promise<string>;
	pushPsbt(psbtHex: string): Promise<string>;
}
declare namespace NoteMarketWalletTypes {
	type AccountsChangedEvent = (event: "accountsChanged" | "networkChanged", handler: (accounts: Array<string> | string) => void) => void;
	type Inscription = {
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
	type GetInscriptionsResult = {
		total: number;
		list: Inscription[];
	};
	type SendInscriptionsResult = {
		txid: string;
	};
	type Network = "livenet" | "testnet";
}
export type NoteMarket = {
	requestAccounts: () => Promise<string[]>;
	getAccounts: () => Promise<string[]>;
	on: NoteMarketWalletTypes.AccountsChangedEvent;
	removeListener: NoteMarketWalletTypes.AccountsChangedEvent;
	switchNetwork: (network: "livenet" | "testnet") => Promise<void>;
	getNetwork: () => Promise<NoteMarketWalletTypes.Network>;
	getPublicKey: () => Promise<string>;
	getBalance: () => Promise<Balance>;
	sendBitcoin: (address: string, atomicAmount: number, options?: {
		feeRate: number;
	}) => Promise<string>;
	pushTx: ({ rawtx }: {
		rawtx: string;
	}) => Promise<string>;
	pushPsbt: (psbtHex: string) => Promise<string>;
	signMessage: (message: string, type?: "ecdsa" | "bip322-simple") => Promise<string>;
	signPsbt: (psbtHex: string, options?: PsbtOption) => Promise<string>;
	signPsbts: (psbtHexs: string[], options?: PsbtOption[]) => Promise<string[]>;
};
declare class NoteMarketConnector extends BtcConnector {
	readonly id = "NOTEMarketWallet";
	readonly name: string;
	readonly logo: string;
	readonly networks: WalletNetwork[];
	homepage: string;
	banance: Balance;
	NOTEMarketWallet: NoteMarket;
	constructor(network: WalletNetwork);
	on(event: "accountsChanged" | "networkChanged", handler: any): void;
	removeListener(event: "accountsChanged" | "networkChanged", handler: any): void;
	connect(): Promise<boolean>;
	requestAccounts(): Promise<string[]>;
	getCurrentInfo(): Promise<void>;
	disconnect(): Promise<void>;
	getAccounts(): Promise<string[]>;
	sendToAddress(toAddress: string, amount: number): Promise<string>;
	switchNetwork(network: WalletNetwork): Promise<void>;
	getPublicKey(): Promise<string>;
	getBalance(): Promise<Balance>;
	signPsbt(psbtHex: string, options?: any): Promise<string>;
	signMessage(message: string): Promise<string>;
	signPsbts(psbtHexs: string[], options?: any[]): Promise<string[]>;
	pushTx(rawTx: string): Promise<string>;
	pushPsbt(psbtHex: string): Promise<string>;
}
declare namespace ChainBowWalletTypes {
	type AccountsChangedEvent = (event: "accountsChanged" | "networkChanged", handler: (accounts: Array<string> | string) => void) => void;
	type Inscription = {
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
	type GetInscriptionsResult = {
		total: number;
		list: Inscription[];
	};
	type SendInscriptionsResult = {
		txid: string;
	};
	type Network = "BTClivenet" | "BTCtestnet";
}
export type ChainBow = {
	requestAccounts: () => Promise<string[]>;
	getAccounts: () => Promise<string[]>;
	on: ChainBowWalletTypes.AccountsChangedEvent;
	removeListener: ChainBowWalletTypes.AccountsChangedEvent;
	switchNetwork: (network: "BTClivenet" | "BTCtestnet") => Promise<void>;
	getNetwork: () => Promise<ChainBowWalletTypes.Network>;
	getPublicKey: () => Promise<string>;
	getBalance: () => Promise<Balance>;
	sendBitcoin: (address: string, atomicAmount: number, options?: {
		feeRate: number;
	}) => Promise<string>;
	pushTx: ({ rawtx }: {
		rawtx: string;
	}) => Promise<string>;
	pushPsbt: (psbtHex: string) => Promise<string>;
	signMessage: (message: string, type?: "ecdsa" | "bip322-simple") => Promise<string>;
	signPsbt: (psbtHex: string, options?: PsbtOption) => Promise<string>;
	finishPsbt: (psbtHex: string, options?: PsbtOption) => Promise<string>;
	signPsbts: (psbtHexs: string[], options?: PsbtOption[]) => Promise<string[]>;
};
declare class ChainBowConnector extends BtcConnector {
	readonly id = "chainbow";
	readonly name: string;
	readonly logo: string;
	readonly networks: WalletNetwork[];
	homepage: string;
	banance: Balance;
	chainbow: ChainBow;
	constructor(network: WalletNetwork);
	on(event: "accountsChanged" | "networkChanged", handler: any): void;
	removeListener(event: "accountsChanged" | "networkChanged", handler: any): void;
	connect(): Promise<boolean>;
	requestAccounts(): Promise<string[]>;
	getCurrentInfo(): Promise<void>;
	disconnect(): Promise<void>;
	getAccounts(): Promise<string[]>;
	sendToAddress(toAddress: string, amount: number): Promise<string>;
	switchNetwork(network: WalletNetwork): Promise<void>;
	getPublicKey(): Promise<string>;
	getBalance(): Promise<Balance>;
	signPsbt(psbtHex: string, options?: any): Promise<string>;
	signMessage(message: string): Promise<string>;
	signPsbts(psbtHexs: string[], options?: any[]): Promise<string[]>;
	pushTx(rawTx: string): Promise<string>;
	pushPsbt(psbtHex: string): Promise<string>;
	finishPsbt(psbtHex: string, options?: any): Promise<string>;
}
export type Connector = UnisatConnector | ChainBowConnector | NoteMarketConnector;
export interface BtcConnectors {
	id: BtcConnectorId;
	instance: Connector;
	installed: boolean;
}
declare class BtcWalletConnect {
	private local_storage_key;
	private local_disconnect_key;
	connectorId: BtcConnectorId;
	localConnectorId?: BtcConnectorId;
	disConnectStatus: boolean;
	connected: boolean;
	address?: string;
	publicKey?: string;
	network: WalletNetwork;
	balance: Balance;
	connectors: BtcConnectors[];
	connector?: Connector;
	constructor({ network, defaultConnectorId, }: BtcWalletConnectOptions);
	switchConnector(id: BtcConnectorId): Connector;
	connect(): Promise<boolean>;
	private getCurrentInfo;
	check(): Promise<false | undefined>;
	disconnect(): Promise<void>;
	getAccounts(): Promise<string[]>;
	getNetwork(): Promise<WalletNetwork>;
	switchNetwork(network: WalletNetwork): Promise<void>;
	sendToAddress(toAddress: string, amount: number): Promise<string>;
	signMessage(message: string, type?: MessageType): Promise<string>;
	signPsbt(psbtHex: string, options?: any): Promise<string>;
	signPsbts(psbtHexs: string[], options?: any[]): Promise<string[]>;
	pushTx(rawTx: string): Promise<string>;
	pushPsbt(psbtHex: string): Promise<string>;
	on(event: "networkChanged" | "accountsChanged" | "accountChanged", handler: any): void;
	removeListener(event: "networkChanged" | "accountsChanged" | "accountChanged", handler: any): void;
}
export interface WalletConnectReactProps {
	config?: BtcWalletConnectOptions;
	theme?: "light" | "dark";
	ui?: {
		connectClass?: string;
		disconnectClass?: string;
		modalClass?: string;
		modalZIndex?: number;
	};
	text?: {
		connectText?: string;
		disconnectText?: string;
		modalTitle?: string;
	};
	onConnectSuccess?: (btcWallet: BtcWalletConnect) => void;
	onConnectError?: (error: any) => void;
	onDisconnectSuccess?: () => void;
	onDisconnectError?: (error: any) => void;
	children?: any;
}
export declare const WalletConnectReact: ({ config: { network, defaultConnectorId }, theme, ui: { connectClass, disconnectClass, modalClass, modalZIndex, }, text: { connectText, disconnectText, modalTitle, }, onConnectSuccess, onConnectError, onDisconnectSuccess, onDisconnectError, children, }: WalletConnectReactProps) => React$1.JSX.Element;
export type WalletState = {
	btcWallet?: BtcWalletConnect;
	balance: Balance;
	publicKey: string;
	address: string;
	connected: boolean;
	initStatus: boolean;
	modalVisible: boolean;
	network: WalletNetwork;
	connectorId?: BtcConnectorId;
	localConnectorId?: BtcConnectorId;
	connector?: Connector;
	connectors?: {
		id: BtcConnectorId;
		name: string;
		logo: string;
		connector: any;
		installed: boolean;
	}[];
};
export type WalletActions = {
	init: (config: BtcWalletConnectOptions) => void;
	check: () => void;
	connect: () => void;
	disconnect: () => void;
	switchConnector: (id: BtcConnectorId) => void;
	switchNetwork: () => void;
	setModalVisible: (visible: boolean) => void;
};
export type WalletStore = WalletState & WalletActions;
export declare const useReactWalletStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<WalletStore>, "setState"> & {
	setState<A extends string | {
		type: string;
	}>(partial: WalletStore | Partial<WalletStore> | ((state: WalletStore) => WalletStore | Partial<WalletStore>), replace?: boolean | undefined, action?: A | undefined): void;
}>;

export {};

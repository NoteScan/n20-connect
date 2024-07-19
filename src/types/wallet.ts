export type WalletNetwork = 'livenet' | 'testnet' | 'BTClivenet' | 'BTCtestnet';

export type Balance = { confirmed: number; unconfirmed: number; total: number };

export interface BtcWalletConnectOptions {
  network?: WalletNetwork;
  defaultConnectorId?: BtcConnectorId;
}
export type BtcConnectorId = 'unisat' | 'chainbow' | 'notemarket';

export type AccountsChangedEvent = (
  event: 'accountsChanged',
  handler: (accounts: Array<string>) => void
) => void;
export type AccountChangedEvent = (
  event: 'accountChanged',
  handler: (account: any) => void
) => void;

export type NetworkChangedEvent = (
  event: 'networkChanged',
  handler: (network: WalletNetwork) => void
) => void;

export type MessageType = 'ecdsa' | 'bip322-simple';


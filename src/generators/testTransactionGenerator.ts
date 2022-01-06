import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import * as R from 'ramda';

/**
 * Contains all generation methods as static async functions
**/
export class testTransactionGenerator {
    /**
     * Sends test transaction from Alice to Bob.
     * @param {ApiPromise} api Connected API Promise.
    **/
    public static async testTransaction(api: ApiPromise, walletSender, walletReceiverAddress) {
      const transfer = api.tx.assets.transferNative(walletReceiverAddress, 12345678910, true);
      const hash = await transfer.signAndSend(walletSender, { nonce: -1 });
      console.debug('Transfer sent with hash', hash.toHex());
    }
  }
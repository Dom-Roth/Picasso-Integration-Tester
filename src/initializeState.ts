/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/**
 * Inserts default values into the devnet for development.
 **/
import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import * as R from 'ramda';

// ToDo: Change endpoint to be read from env variables or run parameters.
const endpoint = 'ws://127.0.0.1:9988';
const provider = new WsProvider(endpoint);

let walletAlice: KeyringPair;
let walletBob: KeyringPair;
let walletCharlie: KeyringPair;
let walletDave: KeyringPair;
let walletEve: KeyringPair;
let walletFerdie: KeyringPair;

/**
 * Contains all generation methods as static async functions
**/
class Generator {
  /**
   * Sends test transaction from Alice to Bob.
   * @param {ApiPromise} api Connected API Promise.
  **/
  public static async testTransaction(api: ApiPromise) {
    const transfer = api.tx.assets.transferNative(walletBob.address, 12345678910, true);
    const hash = await transfer.signAndSend(walletAlice, { nonce: -1 });
    console.debug('Transfer sent with hash', hash.toHex());
  }

  public static async testCrowdloanRewards(api: ApiPromise, sudoKey: KeyringPair) {
    /*
      Populate
      Initialize
      Associate (automatically execute first claim)
     */

    const toHexString = bytes =>
      Array.prototype.map.call(bytes, x => ('0' + (x & 0xFF).toString(16)).slice(-2)).join('');

    const delay = () => new Promise(res => setTimeout(res, 24_000));

    const vesting48weeks = 100800;
    const accounts =
      R.unfold(n => n > 100 ? false : [[
        { RelayChain: walletAlice.derive("/contributor-" + n.toString()).publicKey },
        n * 1_000_000_000_000,
        vesting48weeks
      ], n + 1], 1);

    const populateHash =
      await api.tx.sudo.sudo(
        api.tx.crowdloanRewards.populate(accounts)
      ).signAndSend(sudoKey);
    console.debug('Populated crowdloan with hash: ', populateHash.toHex());

    await delay();

    const initializeHash =
      await api.tx.sudo.sudo(
        api.tx.crowdloanRewards.initialize()
      ).signAndSend(sudoKey);

    console.debug('Initialized crowdloan with hash: ', initializeHash.toHex());

    await delay();

    const contributor: KeyringPair = walletAlice.derive("/contributor-1");
    console.log('Contributor public key: ' + toHexString(contributor.publicKey));

    const contributorRewardAccount: KeyringPair = contributor.derive("/reward");
    console.log('Contributor reward account public key: ' + toHexString(contributorRewardAccount.publicKey));

    const message = "<Bytes>picasso-" + toHexString(contributorRewardAccount.publicKey) + "</Bytes>";
    console.log('Message to sign: ' + message);

    const proof = contributor.sign(message);
    console.log('Proof: ' + proof);

    const associateHash =
      await api.tx.sudo.sudo(
        api.tx.crowdloanRewards.associate(
          contributorRewardAccount.publicKey,
          { RelayChain: [contributor.publicKey, { Sr25519: proof }]}
        )
      ).signAndSend(sudoKey);

    console.debug('Associated with hash: ', associateHash.toHex());

    //TODO(hussein-aitlahcen): check that we got the upfront liquidity in the reward account.
  }

  // ToDo: Add more generation functions here.
}

/**
 * Call default generation here.
 * @param {ApiPromise} api Connected API Promise.
**/
async function createDefaultData(api: ApiPromise, sudoKey: KeyringPair) {
  await Generator.testTransaction(api);
  await Generator.testCrowdloanRewards(api, sudoKey);
  // ToDo: Add additional data generator calls here.
}

/**
 * Application entry point
**/
async function main() {
  // Instantiate the API
  const api = await ApiPromise.create({ provider: provider });
  // Constuct the keyring after the API (crypto has an async init)
  const keyring = new Keyring({ type: 'sr25519' });

  /*  Get keys for dev accounts.
      ToDo: Read public/private keys from external file to be usable in live environment.
            and ability to specify keys using env variables or using run parameters.
  */
  walletAlice = keyring.addFromUri('//Alice');
  walletBob = keyring.addFromUri('//Bob');
  walletCharlie = keyring.addFromUri('//Charlie');
  walletDave = keyring.addFromUri('//Dave');
  walletEve = keyring.addFromUri('//Eve');
  walletFerdie = keyring.addFromUri('//Ferdie');

  console.info('Creating dummy data...');

  await createDefaultData(api, walletAlice);

  console.info('Finished creating dummy data.');
}
main().catch(console.error).finally(() => process.exit());

import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import * as R from 'ramda';

/**
 * Contains all generation methods as static async functions
**/
export class crowdloanRewardGenerator {
  public static async testCrowdloanRewards(api: ApiPromise, sudoKey: KeyringPair, walletAlice: KeyringPair) {
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
}
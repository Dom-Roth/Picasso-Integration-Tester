/* eslint-disable no-trailing-spaces */
import { ApiPromise } from '@polkadot/api';
import { expect } from 'chai';
import R from 'ramda';


export class TxCrowdloanRewardsTests {
  /**
   * ToDo: Split crowdloanRewardGenerator.ts into multiple tests below
   * 
   * Task order list:
   *  * Populate
   *  * Initialize
   *  * Associate
   *  * Claim
   */
  public static runTxCrowdloanRewardsTests() {
    describe('tx.crowdloanRewards Tests', function () {
      it('tx.crowdloanRewards.populate', async () => {
        await TxCrowdloanRewardsTests.txCrowdloanRewardsPopulateTest();
      });
    });
  }

  /**
   * 
   */
  private static async txCrowdloanRewardsPopulateTest() {
    // ToDo (D. Roth): Pass api and keyring instead of directly reading from global.
    const sudoKey = global.walletAlice;
    const vesting48weeks = 100800;
    const accounts =
      R.unfold(n => n > 100 ? false : [[
        { RelayChain: global.walletAlice.derive("/contributor-" + n.toString()).publicKey },
        n * 1_000_000_000_000,
        vesting48weeks
      ], n + 1], 1);
    const populateHash = await global.api.tx.sudo.sudo(
        global.api.tx.crowdloanRewards.populate(accounts)
      ).signAndSend(sudoKey, { nonce: -1 }, (result) => {
        console.log(`Current status is ${result.status}`);

        if (result.status.isInBlock) {
          console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
        } else if (result.status.isFinalized) {
          console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
          populateHash();
        }
    });
    console.debug('Populated crowdloan with hash: ', populateHash.toHex());
  }
}

// Uncomment to debug
TxCrowdloanRewardsTests.runTxCrowdloanRewardsTests();
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
      this.timeout(0);
      it('tx.crowdloanRewards.populate', async function (done) {
        await TxCrowdloanRewardsTests.txCrowdloanRewardsPopulateTest(done);
      });

      it('tx.crowdloanRewards.initialize', async function (done) {
        await TxCrowdloanRewardsTests.txCrowdloanRewardsInitializeTest(done);
        done();
      });
    });
  }

  /**
   * tx.crowdloanRewards.populate
   */
  private static async txCrowdloanRewardsInitializeTest(done) {
    // ToDo (D. Roth): Pass api and keyring instead of directly reading from global.

    const sudoKey = global.walletAlice;
    const initializeHash =
      await global.api.tx.sudo.sudo(
        global.api.tx.crowdloanRewards.initialize()
      ).signAndSend(sudoKey, { nonce: -1 }, ({ events=[], status }) => {
        console.debug('txCrowdloanRewardsInitializeTest: Transaction status:', status.type);
        if (status.isFinalized) {
          console.debug('txCrowdloanRewardsInitializeTest: Finalized Transaction status:', status.type);
          done();
        }
    });
    // ToDo (D. Roth): Add checks
    console.debug('Initialized crowdloan with hash: ', initializeHash.toHex());
  }

  /**
   * 
   */
  private static async txCrowdloanRewardsPopulateTest(done) {
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
      ).signAndSend(sudoKey, { nonce: -1 }, ({ events=[], status }) => {
        console.debug('txCrowdloanRewardsPopulateTest: Transaction status:', status.type);
        if (status.isFinalized) {
          console.debug('txCrowdloanRewardsPopulateTest: Finalized Transaction status:', status.type);
          done();
        }
    });
    // ToDo (D. Roth): Add checks
    
  }
}

// Uncomment to debug
TxCrowdloanRewardsTests.runTxCrowdloanRewardsTests();
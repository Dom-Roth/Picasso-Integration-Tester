/* eslint-disable no-trailing-spaces */
import { ApiPromise } from '@polkadot/api';
import { expect } from 'chai';
import R from 'ramda';
import {Promise} from 'bluebird';

Promise.config({
  // Enable warnings
  warnings: true,
  // Enable long stack traces
  longStackTraces: true,
  // Enable cancellation
  cancellation: true,
  // Enable monitoring
  monitoring: true,
  // Enable async hooks
  asyncHooks: true,
});

process.on("promiseFulfilled", function(promise, child) {
  // promise - The parent promise the child was chained from
  // child - The created child promise.
  console.debug();
});

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
      it('tx.crowdloanRewards.populate', async function () {
        await TxCrowdloanRewardsTests.txCrowdloanRewardsPopulateTest().finally(function() {
          console.debug("YAY");
        });
        console.debug();
      });

      /* ToDo (D. Roth): Re- Implement using the way of the populate function.
      it('tx.crowdloanRewards.initialize', async function (done) {
        await TxCrowdloanRewardsTests.txCrowdloanRewardsInitializeTest(done);
        done();
      });*/
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
    try {
      return new Promise(function (resolve, reject) {
        global.api.tx.sudo.sudo(
          global.api.tx.crowdloanRewards.populate(accounts)
        ).signAndSend(sudoKey, { nonce: -1 }, ({ events=[], status }) => {
          console.debug('txCrowdloanRewardsPopulateTest: Transaction status:', status.type);
          if (status.isFinalized) {
            console.debug('txCrowdloanRewardsPopulateTest: Finalized Transaction status:', status.type);

            // ToDo (D. Roth): Call resolve when system.extrinsicSuccess
            events
            // find/filter for failed events
            .filter(({ event }) =>
              global.api.events.system.ExtrinsicFailed.is(event)
            )
            // we know that data for system.ExtrinsicFailed is
            // (DispatchError, DispatchInfo)
            .forEach(({ event: { data: [error, info] } }) => {
              if (error.isModule) {
                // for module errors, we have the section indexed, lookup
                const decoded = global.api.registry.findMetaError(error.asModule);
                const { docs, method, section } = decoded;

                console.log(`${section}.${method}: ${docs.join(' ')}`);
                throw new Error('txCrowdloanRewardsPopulateTest: ExtrinsicFailed!');
              } else {
                // Other, CannotLookup, BadOrigin, no extra info
                console.log(error.toString());
                throw new Error('txCrowdloanRewardsPopulateTest: ExtrinsicFailed!');
              }
            });
            resolve();
          }
        });
      });
    }catch (exc) {
      console.error(exc);
    }
    
    // ToDo (D. Roth): Add checks
    
  }
}

// Uncomment to debug
TxCrowdloanRewardsTests.runTxCrowdloanRewardsTests();
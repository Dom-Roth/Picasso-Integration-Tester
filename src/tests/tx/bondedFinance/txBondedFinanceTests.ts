/* eslint-disable no-trailing-spaces */
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

/**
 * Contains all TX tests for the pallet:
 * bondedFinance
 */
export class TxBondedFinanceTests {
  /**
   * Runs all tx tests for the bondedFinance pallet.
   */
  public static runTxBondedFinanceTests() {
    describe('tx.bondedFinance Tests', function () {
      this.timeout(0);
      it('tx.bondedFinance.offer', async function () {
        await TxBondedFinanceTests.txBondedFinanceOfferTest();
      });
    });
  }

  /**
   * Tests tx.bondedFinance.offer successfully. SUDO Check!
   */
  private static async txBondedFinanceOfferTest() {
    // ToDo (D. Roth): Pass api and keyring instead of directly reading from global.
    const sudoKey = global.walletAlice;
    const requestParameters = {
      beneficiary: sudoKey.publicKey,
      asset: 0,
      bondPrice: 10,
      nbOfBonds: 10,
      maturity: 'Infinite',
      reward: {asset:0, amount: 10, maturity: 1}
    };
    try {
      return new Promise(function (resolve, reject) {
        global.api.tx.sudo.sudo(
          global.api.tx.bondedFinance.offer(requestParameters)
        ).signAndSend(sudoKey, { nonce: -1 }, ({ events=[], status }) => {
          console.debug('txBondedFinanceOfferTest: Transaction status:', status.type);
          if (status.isFinalized) {
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
                throw new Error('txBondedFinanceOfferTest: ExtrinsicFailed!');
              } else {
                // Other, CannotLookup, BadOrigin, no extra info
                console.log(error.toString());
                throw new Error('txBondedFinanceOfferTest: ExtrinsicFailed!');
              }
            });
            // ToDo (D. Roth): Add checks
            resolve();
          }
        });
      });
    } catch (exc) {
      console.error(exc);
    }
  }
}

// Uncomment to debug
TxBondedFinanceTests.runTxBondedFinanceTests();
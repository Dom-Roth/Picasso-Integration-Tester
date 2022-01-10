/* eslint-disable no-trailing-spaces */
/**
 * Contains all tests which are bound to a wallet.
**/
import { expect } from 'chai';
 
/**
* QuerySystemAccountTests:class
*    checkBalance(api)
**/
export class QueryCrowdloanRewardsTests {
  /**
   * 
   * @param api 
   * @param walletAlice 
   */
  static runQueryCrowdloanRewardsTests() {
    describe('query.crowdloanRewards.account Tests', function () {
      it('Wallet balance check should result >0', async () => {
        QueryCrowdloanRewardsTests.queryCrowdloanRewardsTest();
      });
    });
  }

  /**
  * Tests by checking the balance of the supplied account is >0
  * @param {ApiPromise} api Connected API Promise.
  * @param {string} walletAddress wallet public key
  */
  private static async queryCrowdloanRewardsTest() {
    // ToDo (D. Roth): STUB
    
  }
}
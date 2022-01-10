/* eslint-disable no-trailing-spaces */
/**
 * Contains all tests which are bound to a wallet.
**/
import { ApiPromise } from '@polkadot/api';
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
  public static runQueryCrowdloanRewardsTests() {
    describe('query.crowdloanRewards.account Tests', function () {
      it('STUB', async () => {
        QueryCrowdloanRewardsTests.queryCrowdloanRewardsTest();
      });

      it('query.crowdloanRewards.claimedRewards Tests', function() {
        QueryCrowdloanRewardsTests.queryCrowdloanRewardsClaimedRewardsTest();
      });

      it('query.crowdloanRewards.totalContributors Tests', function() {
        QueryCrowdloanRewardsTests.queryCrowdloanRewardsTotalContributorsTest();
      });

      it('query.crowdloanRewards.totalRewards Tests', function() {
        QueryCrowdloanRewardsTests.queryCrowdloanRewardsTotalRewardsTest();
      });

      it('query.crowdloanRewards.vestingBlockStart Tests', function() {
        QueryCrowdloanRewardsTests.queryCrowdloanRewardsVestingBlockStartTest();
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
    expect(true).to.equal(true);
  }

  /**
   * Checks for a successful return of
   * query.crowdloanRewards.claimedRewards()
   */
  private static async queryCrowdloanRewardsClaimedRewardsTest() {
    // ToDo (D. Roth): Consider removing expected value test and only check for result type.
    console.debug('queryCrowdloanRewardsClaimedRewardsTest');
    const expectedClaimedRewards = 500000000000;
    const claimedRewards = await global.api.query.crowdloanRewards.claimedRewards();
    console.debug("claimedRewards: " + claimedRewards);
    expect(claimedRewards).to.satisfy((s)=>{return typeof(s) == typeof(Object)});
    expect(parseInt(claimedRewards)).to.equal(expectedClaimedRewards);
  }

  /**
   * Checks for a successful return of
   * query.crowdloanRewards.totalContributors()
   */
  private static async queryCrowdloanRewardsTotalContributorsTest() {
    // ToDo (D. Roth): Consider removing expected value test and only check for result type.
    console.debug('queryCrowdloanRewardsTotalContributorsTest');
    const expectedTotalContributors = 100;
    const totalContributors = await global.api.query.crowdloanRewards.totalContributors();
    expect(totalContributors).to.satisfy((s)=>{return typeof(s) == typeof(Object)});
    expect(parseInt(totalContributors)).to.equal(expectedTotalContributors);
  }

  /**
   * Checks for a successful return of
   * query.crowdloanRewards.totalRewards()
   */
   private static async queryCrowdloanRewardsTotalRewardsTest() {
    // ToDo (D. Roth): Consider removing expected value test and only check for result type.
    console.debug('queryCrowdloanRewardsTotalRewardsTest');
    const expectedTotalRewards = 5050000000000000;
    const totalRewards = await global.api.query.crowdloanRewards.totalRewards();
    expect(totalRewards).to.satisfy((s)=>{return typeof(s) == typeof(Object)});
    expect(parseInt(totalRewards)).to.equal(expectedTotalRewards);
  }

  /**
   * Checks for a successful return of
   * query.crowdloanRewards.vestingBlockStart()
   */
   private static async queryCrowdloanRewardsVestingBlockStartTest() {
    // ToDo (D. Roth): Consider removing expected value test and only check for result type.
    console.debug('queryCrowdloanRewardsVestingBlockStartTest');
    const expectedVestingBlockStart = 1;
    const vestingBlockStart = await global.api.query.crowdloanRewards.vestingBlockStart();
    expect(vestingBlockStart).to.satisfy((s)=>{return typeof(s) == typeof(Object)});
    expect(parseInt(vestingBlockStart)).to.equal(expectedVestingBlockStart);
  }
}

// Uncomment to debug
QueryCrowdloanRewardsTests.runQueryCrowdloanRewardsTests();
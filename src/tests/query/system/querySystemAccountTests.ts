/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/**
 * Contains all tests which are bound to a wallet.
 **/
 import {expect} from 'chai';
 
 
 /**
  * AccountTests:class
  *    checkBalance(api)
  *    listAssetAmounts(api)
 **/
 export class QuerySystemAccountTests {
  static async runQuerySystemAccountTests(api, walletAlice) {
    it('Wallet balance check should result >0', async () => {
      await QuerySystemAccountTests.checkBalance(api, walletAlice.address);
    });
  }

   /**
    * Tests by checking the balance of the supplied account is >0
    * @param {ApiPromise} api Connected API Promise.
    * @param {string} walletAddress generated key through Keyring class
    */
   private static async checkBalance(api, walletAddress:string) {
     const {nonce, data: balance} = await api.query.system.account(walletAddress);
     expect(parseInt(balance.free)).to.be.a('number');
     expect(parseInt(nonce)).to.be.a('number');
     expect(parseInt(balance.free)).to.be.greaterThan(0);
   }
 }
 
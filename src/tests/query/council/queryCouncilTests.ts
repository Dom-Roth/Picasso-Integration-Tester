import { Keyring } from "@polkadot/api";

/**
 * 
**/
export class QueryCouncilTests {

  /**
  * Tests governance functionalities
  **/
  static async runAccountGovernanceTests(api, walletAlice, testSudoCommands:boolean) {
    if (testSudoCommands === true) {
      it('Council.setMembers(newMembers, prime, oldCount) test', async () => {
        await QueryCouncilTests.governanceSudoCouncilSetMembersTest(api, walletAlice);
      });
    }

    it('Submit proposal test', async () => {
      await QueryCouncilTests.governanceCouncilSubmitProposalTest(api, walletAlice);
    });
  }

    /**
     * First checks if walletKey is in council.members()
     * Then submits a new proposal to council.propose()
     * @param {ApiPromise} api Connected API Promise.
     * @param {Object} walletKey generated key through Keyring class
    **/
  private static async governanceSudoCouncilSetMembersTest(api, walletKey) {
    // ToDo (D.Roth): STUB
  }

  /**
   * First checks if walletKey is in council.members()
   * Then submits a new proposal to council.propose()
   * @param {ApiPromise} api Connected API Promise.
   * @param {Object} walletKey generated key through Keyring class
  **/
  private static async governanceCouncilSubmitProposalTest(api, walletKey) {
    const councilMembers = await api.query.council.members();
    const keyring = new Keyring();
    for (const councilMember of councilMembers) {
      if (keyring.encodeAddress(councilMember) == walletKey.address) {
        // ToDo (D. Roth): Implement propsal submission
        break;
      }
    }
  }
}
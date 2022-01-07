/**
 * Defines the tests to be run on the picasso parachain node.
 *
 * describe()                 Runs the tests using Mocha.
 *                            All tests can be found in the ./tests/ folder.
 **/

import { QuerySystemAccountTests } from './tests/query/system/querySystemAccountTests';
import { QueryTokenTests } from './tests/query/tokens/queryTokenTests';
import { txCouncilTests } from './tests/tx/txCouncilTests';



// Query Tests

describe('query.system Tests', function () {
  
  // Query.System.Account Tests
  QuerySystemAccountTests.runQuerySystemAccountTests();
});

describe('query.token Tests', function() {
  // Query.Token Tests
  QueryTokenTests.runQueryTokenTests();
});

// TX Tests

describe('tx.council tests', function() {
  // Governance Tests
  //QueryCouncilTests.runAccountGovernanceTests(api, walletAlice, testSudoCommands);
  txCouncilTests.runTxCouncilTests();
});

  // ToDo
  // Vault 101 Tests

  // ToDo
  // Swap Tests

  // ToDo
  // Liquidity Tests

  // ToDo
  // Vesting tests


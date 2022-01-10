/**
 * Defines the tests to be run on the picasso parachain node.
 *
 * describe()                 Runs the tests using Mocha.
 *                            All tests can be found in the ./tests/ folder.
 **/

import { QueryCrowdloanRewardsTests } from './tests/query/crowdloanRewards/queryCrowdloanRewardsTests';
import { QuerySystemAccountTests } from './tests/query/system/querySystemAccountTests';
import { QueryTokenTests } from './tests/query/tokens/queryTokenTests';
import { TxCouncilTests } from './tests/tx/council/txCouncilTests';



// Query Tests

// Query.System.Account Tests
QuerySystemAccountTests.runQuerySystemAccountTests();

// Query.Token Tests
QueryTokenTests.runQueryTokenTests();

// Query Crowdloan Rewards Tests
QueryCrowdloanRewardsTests.runQueryCrowdloanRewardsTests();


// TX Tests

// Governance Tests
TxCouncilTests.runTxCouncilTests();


// RPC Tests

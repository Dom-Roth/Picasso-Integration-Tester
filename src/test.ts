/* eslint-disable max-len */
/**
 * Defines the tests to be run on the picasso parachain node.
 *
 * Settings will later be configured using either a configuration
 * file or using environment variables. Until then, please set
 * the constant variables below.
 *
 * Index:
 *    before()                Gets called before the tests and connects the API object.
 *    after()                 Gets called after all tests are finished and disconnects from the API.
 *
 *    describe()              Runs the tests using Mocha.
 *                            All tests can be found in the ./tests/ folder.
 **/

import {ApiPromise, Keyring, WsProvider} from '@polkadot/api';
import { QuerySystemAccountTests } from './tests/query/system/querySystemAccountTests';
import { QueryTokenTests } from './tests/query/tokens/queryTokenTests';
import { QueryCouncilTests } from './tests/query/council/queryCouncilTests';
import { txCouncilTests } from './tests/tx/txCouncilTests';

// ToDo: Change endpoint to be read from env variables or run parameters.
const testSudoCommands = true;
const useTestnetWallets = true;
const endpoint = 'ws://127.0.0.1:9988';
const provider = new WsProvider(endpoint);
let api:ApiPromise;
let keyring:Keyring;

// ToDo: Read public/private keys from external file to be usable in live environment.
//       and ability to specify keys using env variables or using run parameters.
let walletAlice;
let walletBob;
let walletCharlie;
let walletDave;
let walletEve;
let walletFerdie;

before(async () => {
  api = await ApiPromise.create({provider: provider});
  keyring = new Keyring({type: 'sr25519'});

  if (useTestnetWallets === true) {
    walletAlice = keyring.addFromUri('//Alice');
    walletBob = keyring.addFromUri('//Bob');
    walletCharlie = keyring.addFromUri('//Charlie');
    walletDave = keyring.addFromUri('//Dave');
    walletEve = keyring.addFromUri('//Eve');
    walletFerdie = keyring.addFromUri('//Ferdie');
  }
});

after(async () => {
  api.disconnect();
});

describe('Account Tests', () => {
  // Query.System.Account Tests
  QuerySystemAccountTests.runQuerySystemAccountTests(api, walletAlice);

  // Query.Token Tests
  QueryTokenTests.runQueryTokenTests(api, walletAlice);

  // Governance Tests
  //QueryCouncilTests.runAccountGovernanceTests(api, walletAlice, testSudoCommands);
  txCouncilTests.runAccountGovernanceTests(api, walletAlice, testSudoCommands);

  // ToDo
  // Vault 101 Tests

  // ToDo
  // Swap Tests

  // ToDo
  // Liquidity Tests

  // ToDo
  // Vesting tests
});

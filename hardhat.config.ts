import { task } from "hardhat/config";
import { HardhatUserConfig } from "hardhat/types";
import "hardhat-deploy";
import '@openzeppelin/hardhat-upgrades';

import '@typechain/hardhat';
import "@nomiclabs/hardhat-etherscan";
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';

// import "@symfoni/hardhat-react";

import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
var myEnv = dotenv.config();
dotenvExpand.expand(myEnv);


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  // react: {
  //   providerPriority: ["web3modal", "hardhat"],
  // },
  solidity: {
    version: "0.8.9",
    compilers: [{ version: "0.8.9", settings: {} }],
    settings: {
      optimizer: {
        enabled: true,
        // runs: 1
        runs: 100
      }
    }
  },
  namedAccounts: {
    deployer: 0,
    simpleERC20Beneficiary: 1,
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: { mnemonic: process.env.DEV_MNEMONIC }
    },
    hardhat: {
      chainId: 1,
      // inject: true, // optional. If true, it will EXPOSE your mnemonic in your frontend code. Then it would be available as an "in-page browser wallet" / signer which can sign without confirmation.
      accounts: { mnemonic: process.env.DEV_MNEMONIC }
    },
    ropsten: {
      chainId: 3,
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: { mnemonic: process.env.PROD_MNEMONIC }
      // accounts: [privateKey1, privateKey2, ...]
    },
    rinkeby: {
      chainId: 4,
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: { mnemonic: process.env.PROD_MNEMONIC }
      // accounts: [privateKey1, privateKey2, ...]
    },
    kovan: {
      chainId: 42,
      url: `https://kovan.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: { mnemonic: process.env.PROD_MNEMONIC }
      // accounts: [privateKey1, privateKey2, ...]
    },
    goerli: {
      chainId: 5,
      url: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: { mnemonic: process.env.PROD_MNEMONIC }
      // accounts: [privateKey1, privateKey2, ...]
    },
    mainnet: {
      chainId: 1,
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: { mnemonic: process.env.PROD_MNEMONIC }
      // accounts: [privateKey1, privateKey2, ...]
    },
    bsctest: {
      chainId: 97,
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      gasPrice: 20000000000,
      accounts: { mnemonic: process.env.PROD_MNEMONIC }
    },
    bsc: {
      chainId: 56,
      url: "https://bsc-dataseed.binance.org/",
      gasPrice: 20000000000,
      accounts: { mnemonic: process.env.PROD_MNEMONIC }
    },
    polygondev: {
      chainId: 80001,
      url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      gasPrice: 20000000000,
      accounts: { mnemonic: process.env.PROD_MNEMONIC }
    },
    polygondevSecond: {
      chainId: 80001,
      url: "https://rpc-mumbai.maticvigil.com",
      gasPrice: 20000000000,
      accounts: { mnemonic: process.env.PROD_MNEMONIC }
    },
    polygonSecondary: {
      chainId: 137,
      url: "https://rpc-mainnet.matic.network",
      gasPrice: 20000000000,
      accounts: { mnemonic: process.env.PROD_MNEMONIC }
    },
    polygon: {
      chainId: 137,
      url: "https://polygon-mainnet.infura.io/v3/" + process.env.INFURA_PROJECT_ID,
      // url: "https://rpc-mainnet.maticvigil.com",
      gasPrice: 1100000000000,
      accounts: { mnemonic: process.env.PROD_MNEMONIC }
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  typechain: {
    outDir: "./EttiosApp/hardhat/typechain",
    target: "ethers-v5"
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
    // react: "./EttiosApp/hardhat",
    deployments: "./EttiosApp/hardhat/deployments/",
  },
  mocha: {
    timeout: 20000
  },
};

export default config;
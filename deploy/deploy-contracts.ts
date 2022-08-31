import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

// for prod
const isTest = false;
const deployToken = true;


console.log("DeployFunction init");
const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, upgrades, network, ethers } = hre;

  console.log("getNamedAccounts");
  const { deployer } = await getNamedAccounts();
  console.log("deployer", deployer);

  let tokenAddress: string | undefined = undefined;

  if (deployToken) {
    try {
      // ethers.constants.AddressZero;
      const chainId = network.config.chainId;
      const isEthereumNetwork = chainId === 1 || chainId === 3 || chainId === 4 || chainId === 5 || chainId === 42;
      const isBNBNetwork = chainId === 97 || chainId === 56;
      console.log("isEthereumNetwork", isEthereumNetwork, chainId);
      console.log("isBNBNetwork", isBNBNetwork, chainId);
      // the following will only deploy "GenericMetaTxProcessor" if the contract was never deployed or if the code changed since last deployment
      const resultDeploy = await deployments.deploy("EttiosToken", {
        from: deployer,
        // contract: 'EttiosToken',
        log: true,
        args: ['Ettios', "ETT", isBNBNetwork ? 30e10 : 10e10, 18],
        gasLimit: 5500000,
        skipIfAlreadyDeployed: true,
      });
      tokenAddress = resultDeploy.address;
      console.log("result deploy Token", tokenAddress);
    } catch (err) {
      console.error("No se pudo desplegar el contrato", err);
    }
  }


};
export default func;
// func.runAtTheEnd = true;
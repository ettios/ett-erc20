import { ethers } from "hardhat";
import { BigNumber, BigNumberish } from "ethers";
import chai from "chai";
// import { solidity } from "ethereum-waffle";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { EttiosToken } from "@hardhat/typechain";
import { BigNumber as BigNumberJS } from "bignumber.js";


const printBigNumber = (value: BigNumber, decimals: number) => {
  return new BigNumberJS(value.toString()).div(new BigNumberJS(10).pow(decimals)).toString();
};

const EE = (amount: BigNumber, pow: number) => {
  return amount.mul(BigNumber.from(10).pow(pow));
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const initializeEttios = async () => {
  return await initializeEttiosToken("ETT", "Ettios Coin", 18);
};
const initializeEttiosToken = async (symbol: string, name: string, decimals?: number) => {
  //Preparing stablecoin
  const erc20Factory = await ethers.getContractFactory("EttiosToken", signers[0]);
  const EttiosCoin = (await erc20Factory.deploy(symbol, name, 10e10, decimals || 18)) as EttiosToken;
  await EttiosCoin.deployed();
  console.log(symbol, EttiosCoin.address);
  // expect(EttiosCoin.address).to.properAddress;
  return EttiosCoin;
};

const { expect } = chai;
let _owner: string;
let signers: SignerWithAddress[];
describe("Ettios", () => {
  let ett: EttiosToken;
  beforeEach(async () => {
    signers = await ethers.getSigners();
    _owner = signers[0].address;
    ett = await initializeEttios();
    return _owner;
  });
  describe("getOwner", async () => {
    it("should return deployer address", async () => {
      const decimals = await ett.decimals();
      console.log("decimals", decimals);
      expect(decimals).to.eq(18);
    });
  });
});

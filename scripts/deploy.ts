import * as greeterABI from "../artifacts/contracts/Greeter.sol/Greeter.json";
import { ethers } from "hardhat";
import { Greeter } from "../typechain/Greeter";

(async () => {
  const [signer] = await ethers.getSigners();
  //   const greeterFactory = await ethers.getContractFactory("Greeter", signer);
  //   const greeter = await greeterFactory.deploy();

  //   await greeter.deployed();
  //   console.log(`Greeter address: ${greeter.address}`);
  const greeter = new Greeter(
    "0xE7E597593A4fDc1595D14183A0384BE092597053",
    greeterABI.abi,
    signer
  );
  const response = await greeter.greet();
  console.log(response);
})();

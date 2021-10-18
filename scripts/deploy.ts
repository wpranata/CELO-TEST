import { ethers } from "hardhat";
import { Greeter__factory } from "../typechain/";

(async () => {
  // get signers
  const [signer] = await ethers.getSigners();

  // deploy SM
  const greeterFactory = await ethers.getContractFactory("Greeter", signer);
  const greeter = await greeterFactory.deploy();
  await greeter.deployed();
  console.log(`Greeter address: ${greeter.address}`);

  // call SM function
  const response = await greeter.greet();
  console.log(response);
})();

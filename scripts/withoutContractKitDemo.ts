import { newKit, StableToken } from "@celo/contractkit";
import { Contract, ContractInterface } from "ethers";
import { ethers } from "hardhat";
import { URL_ALFAJORES } from "../constants/networks";
import { ADDRESS_TESTNETS_THREE } from "../constants/addresses";
import * as GeneratedStableToken from "@celo/contractkit/lib/generated/StableToken";

(async () => {
  const kit = newKit(URL_ALFAJORES);
  const CUSDAddress = (await kit.contracts.getStableToken(StableToken.cUSD))
    .address;
  const stableTokenABI = GeneratedStableToken.ABI;
  /**
   * ContractKit is only used to get contracts.
   * Everything else is handled by ethers.
   */

  // get signers
  console.log("Get signer...");
  const [signer] = await ethers.getSigners();

  // get contract
  console.log("Get cUSD contract...");
  const CUSD = new Contract(
    CUSDAddress,
    stableTokenABI as unknown as ContractInterface, // Some people won't be happy with this hack, but I am. :)
    signer
  );

  // Transferring cUSD to recipient
  console.log("Transferring cUSD to recipient...");
  const weiUnits = 10 ** 18;
  const amount = 0.001 * weiUnits;
  const comment = "Happy Birthday!";
  const txResponse = await CUSD.transferWithComment(
    ADDRESS_TESTNETS_THREE,
    amount,
    comment
  );

  // Reading tx response
  console.log("Reading tx response...");
  const txReceipt = await txResponse.wait();
  console.log(`tx Hash: ${txReceipt.transactionHash}`);
})();

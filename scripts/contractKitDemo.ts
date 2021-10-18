import { newKit } from "@celo/contractkit";
import { CeloProvider, CeloWallet } from "@celo-tools/celo-ethers-wrapper";
import { Contract, ContractInterface } from "ethers";
import { URL_ALFAJORES } from "../constants/networks";
import { PK_TESTNETS_TWO } from "../constants/keys";
import { ADDRESS_TESTNETS_THREE } from "../constants/addresses";
import * as GeneratedStableToken from "@celo/contractkit/lib/generated/StableToken";

(async () => {
  // Readying provider
  console.log("Readying Provider...");
  const provider = new CeloProvider(URL_ALFAJORES);

  // Readying wallet
  console.log("Readying Wallet...");
  const wallet = new CeloWallet(PK_TESTNETS_TWO, provider);

  // Readying cUSD contract
  console.log("Readying cUSD Contract...");
  const CUSDAddress = (await newKit(URL_ALFAJORES).contracts.getStableToken())
    .address;
  const CUSDABI = GeneratedStableToken.ABI as unknown as ContractInterface;
  const CUSDContract = new Contract(CUSDAddress, CUSDABI, wallet);

  // Transferring cUSD to recipient
  console.log("Transferring cUSD to recipient...");
  const weiUnits = 10 ** 18;
  const amount = 0.001 * weiUnits;
  const comment = "Happy Birthday!";
  const txResponse = await CUSDContract.transferWithComment(
    ADDRESS_TESTNETS_THREE,
    amount,
    comment
  );

  // Reading tx response
  console.log("Reading tx response...");
  const txReceipt = await txResponse.wait();
  console.log(`tx Hash: ${txReceipt.transactionHash}`);
})();

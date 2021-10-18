import { newKit, StableToken } from "@celo/contractkit";
import { URL_ALFAJORES } from "../constants/networks";

(async () => {
  // Generating kit
  console.log("!-- Generating kit --!");
  const kit = newKit(URL_ALFAJORES);

  // cUSD contract address
  const CUSDSMAddress = (await kit.contracts.getStableToken(StableToken.cUSD))
    .address;
  console.log(`cUSD SM Address: ${CUSDSMAddress}`);

  // cEUR contract address
  const CEURSMAddress = (await kit.contracts.getStableToken(StableToken.cEUR))
    .address;
  console.log(`cEUR SM Address: ${CEURSMAddress}`);

  // Attestation contract address
  const attestationSMAddress = (await kit.contracts.getAttestations()).address;
  console.log(`Attestation SM Address: ${attestationSMAddress}`);
})();

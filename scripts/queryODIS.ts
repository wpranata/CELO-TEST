import { newKit } from "@celo/contractkit";
import { OdisUtils } from "@celo/identity";
import { AuthSigner } from "@celo/identity/lib/odis/query";
import { DataEncryptionKeyUtils, PhoneNumberUtils } from "@celo/utils";
import { ADDRESS_TESTNETS_TWO, PHONE_ALFAJORES } from "../constants/addresses";
import { PK_TESTNETS_TWO } from "../constants/keys";
import { URL_ALFAJORES } from "../constants/networks";

(async () => {
  // Generating kit
  console.log("!-- Generating kit --!");
  const kit = newKit(URL_ALFAJORES);
  kit.addAccount(PK_TESTNETS_TWO);
  const accountsWrapper = await kit.contracts.getAccounts();

  // Checking DEK
  console.log("!-- Checking DEK --!");
  const dek = await accountsWrapper.getDataEncryptionKey(ADDRESS_TESTNETS_TWO);
  console.log(`DEK: ${dek}`);

  // Registering DEK if null
  if (dek == null) {
    console.log("!-- Registering DEK --!");
    const publicDek = DataEncryptionKeyUtils.compressedPubKey(
      Buffer.from(PK_TESTNETS_TWO, "hex")
    );
    console.log(Buffer.from(PK_TESTNETS_TWO, "hex"));
    console.log(`publicDek: ${publicDek}`);
    const setKeyTx = await accountsWrapper
      .setAccountDataEncryptionKey(publicDek)
      .sendAndWaitForReceipt({ from: ADDRESS_TESTNETS_TWO });
    console.log(`setKeyTx: ${setKeyTx}`);
  }

  // Generating AuthSigner
  console.log("!-- Generating AuthSigner --!");
  const authSigner: AuthSigner = {
    authenticationMethod: OdisUtils.Query.AuthenticationMethod.ENCRYPTION_KEY,
    rawKey: PK_TESTNETS_TWO,
  };

  // Getting service context
  console.log("!-- Getting service context --!");
  const alfajoresServiceContext = OdisUtils.Query.ODIS_ALFAJORES_CONTEXT;

  // Getting phone number hash details
  console.log("!-- Getting phone number hash details --!");
  const phoneNumberHashDetails =
    await OdisUtils.PhoneNumberIdentifier.getPhoneNumberIdentifier(
      PHONE_ALFAJORES,
      ADDRESS_TESTNETS_TWO,
      authSigner,
      alfajoresServiceContext
    );

  console.log(phoneNumberHashDetails);

  // Getting associated attestation SM (Which contract attested to this Phone Number)
  console.log("!-- Getting associated attestation SM--!");
  const attestations = await kit.contracts.getAttestations();
  const identifier = phoneNumberHashDetails.phoneHash;
  const accounts = await attestations.lookupAccountsForIdentifier(identifier);
  for (const account of accounts) {
    const stat = await attestations.getAttestationStat(identifier, account);
    console.log(
      account,
      `Total: ${stat.total}`,
      `Completed: ${stat.completed}`
    );
  }

  // Getting the actual address mapped with the phone number
  console.log(
    "!-- Getting the actual address mapped with my phone number like a boss --!"
  );
  const myActualAccount = await attestations.lookupIdentifiers([identifier]);
  console.log(myActualAccount[identifier]);
})();

import { HardhatUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import * as dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const PROVIDER_KEY = process.env.PROVIDER_KEY || "";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [{ version: "0.8.9", settings: {} }],
  },
  networks: {
    hardhat: {},
    // rinkeby: {
    //   url: `https://eth-rinkeby.alchemyapi.io/v2/${PROVIDER_KEY}`,
    //   accounts: [PRIVATE_KEY],
    // },
    alfajores: {
      url: `https://celo-alfajores--rpc.datahub.figment.io/apikey/${PROVIDER_KEY}/`,
      accounts: [PRIVATE_KEY],
    },
  },
};
export default config;

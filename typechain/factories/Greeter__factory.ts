/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Greeter, GreeterInterface } from "../Greeter";

const _abi = [
  {
    inputs: [],
    name: "greet",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061017c806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063cfae321714610030575b600080fd5b61003861004e565b6040516100459190610124565b60405180910390f35b60606040518060400160405280600581526020017f68656c6c6f000000000000000000000000000000000000000000000000000000815250905090565b600081519050919050565b600082825260208201905092915050565b60005b838110156100c55780820151818401526020810190506100aa565b838111156100d4576000848401525b50505050565b6000601f19601f8301169050919050565b60006100f68261008b565b6101008185610096565b93506101108185602086016100a7565b610119816100da565b840191505092915050565b6000602082019050818103600083015261013e81846100eb565b90509291505056fea2646970667358221220aaf7e9b4919217006e165d1feeb14521f586ccb238af6efdbec0fc49a8ed3ae264736f6c63430008090033";

export class Greeter__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Greeter> {
    return super.deploy(overrides || {}) as Promise<Greeter>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Greeter {
    return super.attach(address) as Greeter;
  }
  connect(signer: Signer): Greeter__factory {
    return super.connect(signer) as Greeter__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GreeterInterface {
    return new utils.Interface(_abi) as GreeterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Greeter {
    return new Contract(address, _abi, signerOrProvider) as Greeter;
  }
}
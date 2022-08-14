/* eslint-disable no-unused-vars */
import { UnsupportedChainIdError } from '@web3-react/core';
import getRpcUrl from './getRpcUrl';
import { ethers } from 'ethers';
import moment from 'moment';

const RPC_URL = getRpcUrl();
export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL);

export const minifyAddress = (address: string, size: number) =>
  `${address.slice(0, size || 6)}...${address.slice(-size || -4, address.length)}`;

export const validateChain = (error: any) => {
  let supported: number[] = []
  let unSupported: number = 0;
  let supportedChains: string[] = []
  let unSupportedChain: string = "";
  if (error instanceof UnsupportedChainIdError) {
    error.message.split('.').map(function (id, index) {
      if (index === 0) {
        unSupported = parseInt(id.replace(/\D/g, ""));
        unSupportedChain = chainIdToName(unSupported) ?? "unknown";
      }
      if (index === 1) {
        id.split(',').map(function (value, index) {
          if (index === 0) {
            value = value.replace(/\D/g, "");
          }
          supported.push(parseInt((value)));
          supportedChains.push(chainIdToName(parseInt((value))) ?? "unknown")
          return null
        })
      }
      return null
    });
  } else {
    return null
  }
  return {
    supportedIds: supported,
    unSupportedId: unSupported,
    supportedChains: supportedChains,
    unSupportedChain: unSupportedChain
  }
}

export const getSignature = async (address: String, window: any) => {
  let time = moment().utc().startOf('day').unix();
  let timeHash = ethers.utils.solidityKeccak256(['uint'], [time])
  let message = `Hello! Welcome to NFT Marketplace
  
  This request is only to verify your address with us and this will not trigger a blockchain transaction.
  
  Hash: ${timeHash}`
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return { address: address, message: message, signature: await signer.signMessage(message) }
}

export const chainIdToName = (id: number) => {
  switch (id !== 0) {
    case id === 1:
      return 'Mainnet'
    case id === 4:
      return 'Rinkeby'
    case id === 137:
      return 'Polygon'
    case id === 80001:
      return 'Mumbai'
    case id === 56:
      return 'Binance'
    case id === 97:
      return 'Binance Testnet'
  }
}

// This function is used to handle the prmoises
export const to = async (promise: Promise<any>) => {
  return await
    promise
      .then((data: any) => {
        return [null, data]
      }).catch((err: any) => {
        return [err]
      });
}

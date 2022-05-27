/* eslint-disable no-unused-vars */
import { UnsupportedChainIdError } from '@web3-react/core';
import {parseUnits} from 'ethers/lib/utils';
import {forEach, split, trim} from 'lodash';

export const minifyAddress = (address: string, size: number) =>
  `${address.slice(0, size || 6)}...${address.slice(-size || -6, address.length)}`;

export enum GAS_PRICE {
  Default = '5',
  Fast = '6',
  Instant = '7',
  Testnet = '10',
}

export const GAS_PRICE_GWEI = {
  default: parseUnits(GAS_PRICE.Default, 'gwei').toString(),
  fast: parseUnits(GAS_PRICE.Fast, 'gwei').toString(),
  instant: parseUnits(GAS_PRICE.Instant, 'gwei').toString(),
  testnet: parseUnits(GAS_PRICE.Testnet, 'gwei').toString(),
};

export const splitERC20Token = (value: string) => {
  const address: any = [];
  const amount: any = [];
  const arrayOfLines = value.match(/[^\r\n]+/g);
  forEach(arrayOfLines, (item) => {
    const splitData = split(item, ',');
    address.push(trim(splitData[0]));
    amount.push(trim(splitData[1]));
  });
  return { address, amount };
};

export const splitERC721Token = (value: string) => {
  const address: any = [];
  const tokenId: any = [];
  const arrayOfLines = value.match(/[^\r\n]+/g);
  forEach(arrayOfLines, (item) => {
    const splitData = split(item, ',');
    address.push(trim(splitData[0]));
    tokenId.push(trim(splitData[1]));
  });
  return { address, tokenId };
};

export const splitERC1125Token = (value: string) => {
  const address: any = [];
  const tokenId: any = [];
  const amount: any = [];
  const arrayOfLines = value.match(/[^\r\n]+/g);
  forEach(arrayOfLines, (item) => {
    const splitData = split(item, ',');
    address.push(trim(splitData[0]));
    tokenId.push(trim(splitData[1]));
    amount.push(trim(splitData[2]));
  });
  return { address, tokenId, amount };
};

export const validateChain = (error: any) => {
  let supported: number[] = []
  let unSupported: number = 0;
  let supportedChains: string[] = []
  let unSupportedChain: string = "";
  if (error instanceof UnsupportedChainIdError) {
    error.message.split('.').map(function (id, index) {
      if(index === 0){
        unSupported =  parseInt(id.replace(/\D/g, ""));
        unSupportedChain = chainIdToName(unSupported) ?? "unknown";
      }
      if(index === 1){
        id.split(',').map(function (value, index) {
          if(index === 0){
            value = value.replace(/\D/g, "");
          }
          supported.push(parseInt((value)));
          supportedChains.push(chainIdToName(parseInt((value))) ?? "unknown")
          return null
        })
      }
      return null
    });
  }else{
    return null
  }
  return {
    supportedIds: supported,
    unSupportedId: unSupported,
    supportedChains: supportedChains,
    unSupportedChain: unSupportedChain
  }
}

export const chainIdToName = (id: number) => {
  switch(id !== 0){
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
/* eslint-disable no-unused-vars */
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

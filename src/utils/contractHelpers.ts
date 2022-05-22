import {ethers} from 'ethers';
import {simpleRpcProvider} from './providers';
import erc20Abi from '../configs/Contract/Abi/erc20.json';
import erc721Abi from '../configs/Contract/Abi/erc721.json';
import erc1155Abi from '../configs/Contract/Abi/erc1155.json';

const getContract = (
  abi: any,
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider,
) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getERC721Contract = (
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider,
) => getContract(erc721Abi, address, signer);

export const getERC1155Contract = (
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider,
) => getContract(erc1155Abi, address, signer);

export const getERC20AbiContract = (
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider,
) => getContract(erc20Abi, address, signer);

import {useMemo} from 'react';
import useActiveWeb3React from './useActiveWeb3React';
import {getERC20AbiContract, getERC721Contract, getERC1155Contract} from '../../utils/contractHelpers';

export const useERC20Contract = (address: string) => {
  const { library }: any = useActiveWeb3React();
  return useMemo(() => getERC20AbiContract(address, library.getSigner()), [address, library]);
};

export const useERC721Contract = (address: string) => {
  const { library }: any = useActiveWeb3React();
  return useMemo(() => getERC721Contract(address, library.getSigner()), [address, library]);
};

export const useERC1155Contract = (address: string) => {
  const { library }: any = useActiveWeb3React();
  return useMemo(() => getERC1155Contract(address, library.getSigner()), [address, library]);
};

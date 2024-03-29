/* eslint-disable import/no-unresolved */
import {useEffect, useRef, useState} from 'react';
import {useWeb3React} from '@web3-react/core';
import {Web3Provider} from '@ethersproject/providers';
import {Web3ReactContextInterface} from '@web3-react/core/dist/types';
import { simpleRpcProvider } from '../../utils/helpers';

const useActiveWeb3React = (): Web3ReactContextInterface<Web3Provider> => {
  const { library, chainId, ...web3React } = useWeb3React();
  const refEth = useRef(library);
  const [provider, setProvider] = useState(library || simpleRpcProvider);

  useEffect(() => {
    if (library !== refEth.current) {
      setProvider(library || simpleRpcProvider);
      refEth.current = library;
    }
  }, [library]);

  return {
    library: provider,
    chainId,
    ...web3React,
  };
};

export default useActiveWeb3React;

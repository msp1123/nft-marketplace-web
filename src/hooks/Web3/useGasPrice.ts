import {GAS_PRICE_GWEI} from '../../utils/helpers';

function useGasPrice(): string {
  return GAS_PRICE_GWEI.testnet;
}

export default useGasPrice;

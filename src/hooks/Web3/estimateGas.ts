import {Contract, ethers, Overrides} from 'ethers';

export const estimateGas = async (
  contract: Contract,
  methodName: string,
  methodArgs: any[],
  gasMarginPer10000: number,
) => {
  if (!contract[methodName]) {
    throw new Error(`Method ${methodName} doesn't exist on ${contract.address}`);
  }
  const rawGasEstimation = await contract.estimateGas[methodName](...methodArgs);
  const gasEstimation = rawGasEstimation
    .mul(ethers.BigNumber.from(10000).add(ethers.BigNumber.from(gasMarginPer10000)))
    .div(ethers.BigNumber.from(10000));
  return gasEstimation;
};

export const callWithEstimateGas = async (
  contract: Contract,
  methodName: string,
  methodArgs: any[] = [],
  overrides: Overrides = {},
  gasMarginPer10000 = 1000,
): Promise<ethers.providers.TransactionResponse> => {
  const gasEstimation = await estimateGas(contract, methodName, methodArgs, gasMarginPer10000);
  const tx = await contract[methodName](...methodArgs, {
    gasLimit: gasEstimation,
    ...overrides,
  });
  return tx;
};

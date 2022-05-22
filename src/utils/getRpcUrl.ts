import sample from 'lodash/sample';
import CONFIG from '../configs/globalConfigs'
const getNodeUrl = () => sample(nodes);

// Array of available nodes to connect to
export const nodes = ['https://polygon-mumbai.g.alchemy.com/v2/' + CONFIG.alchemy_key];
export default getNodeUrl;
export const RPC_URLS = {
  1: "https://mainnet.infura.io/v3/" + CONFIG.infura_key,
  4: "https://rinkeby.infura.io/v3/" + CONFIG.infura_key
};
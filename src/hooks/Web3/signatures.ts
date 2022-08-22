import { ethers } from "ethers";
import moment from "moment";
import { Login } from "../../services/ApiServices";

export const loginWithSignature = async (address: String, window: any) => {
    let time = moment().utc().startOf('day').unix();
    let timeHash = ethers.utils.solidityKeccak256(['uint'], [time])
    let message = `Hello! Welcome to NFT Marketplace
    
    This request is only to verify your address with us and this will not trigger a blockchain transaction.
    
    Hash: ${timeHash}`
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let signedValues = { address: address, message: message, signature: await signer.signMessage(message) };
    await Login(signedValues);
    return signedValues
}

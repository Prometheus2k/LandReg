import { ethers } from "ethers";
import abi from "./contract/abi.json";

const ConnectWallet = async () => {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const contractABI = abi.abi;
  let provider, signer, contract;

  try {
    const { ethereum } = window;
    if (ethereum) {
      await ethereum.request({
        method: "eth_requestAccounts",
      });
    }
    provider = new ethers.BrowserProvider(ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
  } catch (err) {
    console.log(err);
  }

  const state = { provider, signer, contract };

  return state;
};

export default ConnectWallet;

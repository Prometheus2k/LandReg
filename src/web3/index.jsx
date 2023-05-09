import { ethers } from "ethers";
import abi from "./contract/abi.json";

const ConnectWallet = async () => {
  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
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
    signer = await provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
  } catch (err) {
    console.log(err);
  }

  const state = { provider, signer, contract };

  return state;
};

export default ConnectWallet;

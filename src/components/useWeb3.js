import { useState, useEffect } from "react";
import { BrowserProvider } from "ethers"; // Import yang benar untuk v6

const useWeb3 = () => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new BrowserProvider(window.ethereum); // Perbaikan di sini
      setProvider(web3Provider);
    }
  }, []);

  const connectWallet = async () => {
    if (provider) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } else {
      alert("Please install MetaMask!");
    }
  };

  return { account, provider, connectWallet };
};

export default useWeb3;

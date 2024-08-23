import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

interface WalletInfoProps {
  address: string;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ address }) => {
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    const getBalance = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(address);
        const balanceInEth = ethers.utils.formatEther(balance);
        setBalance(balanceInEth);
      }
    };

    if (address) {
      getBalance();
    }
  }, [address]);

  return (
    <div>
      <p>Address: {address}</p>
      {balance && <p>Balance: {balance} ETH</p>}
    </div>
  );
};

export default WalletInfo;

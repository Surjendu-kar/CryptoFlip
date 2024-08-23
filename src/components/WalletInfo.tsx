import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Typography, Box, CircularProgress } from "@mui/material";

interface WalletInfoProps {
  address: string;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ address }) => {
  const [balance, setBalance] = useState<string | null>(null);

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
    <Box sx={{ mt: 2, textAlign: "center" }}>
      <Typography variant="body1" gutterBottom>
        Address: {address}
      </Typography>
      {balance === null ? (
        <CircularProgress size={24} />
      ) : (
        <Typography variant="body1">Balance: {balance} ETH</Typography>
      )}
    </Box>
  );
};

export default WalletInfo;

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Typography, Box, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";

const MainContainer = styled(Box)(({ theme }) => ({
  marginTop: "2rem",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: { marginTop: "1rem" },
}));
const Text = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "bold",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
  },
}));

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
    <MainContainer>
      <Text variant="body1" gutterBottom>
        Address: {address}
      </Text>
      {balance === null ? (
        <CircularProgress size={24} />
      ) : (
        <Text variant="body1">Balance: {balance} ETH</Text>
      )}
    </MainContainer>
  );
};

export default WalletInfo;

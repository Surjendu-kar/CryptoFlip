import React, { useState, useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const MainContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {},
}));

const Text = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  color: "red",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.75rem",
  },
}));

const Btn = styled(Button)(({ theme }) => ({
  fontSize: "0.8rem",
  backgroundColor: "#8D493A",
  color: "white",
  "&:hover": {
    backgroundColor: "#753d31",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.6rem",
    padding: "4px 10px",
  },
}));

interface EthereumProvider {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

interface MetaMaskConnectorProps {
  onConnect: (address: string) => void;
  onDisconnect: () => void;
}

const MetaMaskConnector: React.FC<MetaMaskConnectorProps> = ({
  onConnect,
  onDisconnect,
}) => {
  const [metamaskAvailable, setMetamaskAvailable] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const connectWalletHandler = async (): Promise<void> => {
    if (!isConnected) {
      if (window.ethereum && window.ethereum.isMetaMask) {
        try {
          const accounts = (await window.ethereum.request({
            method: "eth_requestAccounts",
          })) as string[];
          const account = accounts[0];
          console.log("Address", account);

          onConnect(account);
          setIsConnected(true);
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
          setIsConnected(false);
        }
      } else {
        console.error("Please install MetaMask.");
        setIsConnected(false);
      }
    } else {
      onDisconnect();
      setIsConnected(false);
    }
  };

  useEffect(() => {
    const checkMetaMask = setInterval(() => {
      if (window.ethereum && window.ethereum.isMetaMask) {
        console.log("MetaMask Detected!");
        setMetamaskAvailable(true);
        clearInterval(checkMetaMask);
      }
    }, 100);

    return () => clearInterval(checkMetaMask);
  }, []);

  return (
    <MainContainer>
      <Btn
        variant="contained"
        onClick={connectWalletHandler}
        disabled={!metamaskAvailable}
      >
        {isConnected ? "Disconnect Wallet" : "Connect Wallet"}
      </Btn>
      {!metamaskAvailable && (
        <Text>Please install or unlock MetaMask to continue.</Text>
      )}
    </MainContainer>
  );
};

export default MetaMaskConnector;

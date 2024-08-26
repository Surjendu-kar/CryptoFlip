import React, { useState, useEffect } from "react";
import { Button, Typography, Link, Stack } from "@mui/material";
import { styled } from "@mui/system";

const MainContainer = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  gap: theme.spacing(1),
}));

const Text = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(1.4),
  color: "red",
  [theme.breakpoints.down("sm")]: {
    fontSize: theme.spacing(1.2),
  },
}));

const Btn = styled(Button)(({ theme }) => ({
  fontSize: theme.spacing(1.4),
  backgroundColor: "#8197ff",
  color: theme.palette.text.primary,

  "&:disabled": {
    color: theme.palette.text.primary,
    opacity: 0.5,
    background: "#121725",
  },

  "&:hover": {
    backgroundColor: "#a5b4fc",
  },

  [theme.breakpoints.down("sm")]: {
    fontSize: theme.spacing(0.95),
    padding: theme.spacing(0.4, 1.0),
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
  const storedAddress = localStorage.getItem("walletAddress");
  const [isConnected, setIsConnected] = useState<boolean>(!!storedAddress);

  useEffect(() => {
    setIsConnected(!!storedAddress);
  }, [storedAddress]);

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
        disableElevation
      >
        {isConnected ? "Disconnect Wallet" : "Connect Wallet"}
      </Btn>
      {!metamaskAvailable && (
        <Text>
          Please install the{" "}
          <Link
            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
            target="_blank"
            color="inherit"
            sx={{ fontWeight: "bold" }}
          >
            MetaMask
          </Link>{" "}
          extension to continue.
        </Text>
      )}
    </MainContainer>
  );
};

export default MetaMaskConnector;

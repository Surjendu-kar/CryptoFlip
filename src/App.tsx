import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import MetaMaskConnector from "./components/MetaMaskConnector";
import WalletInfo from "./components/WalletInfo";

const App: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");

  const handleConnect = (address: string) => {
    setWalletAddress(address);
  };

  const handleDisconnect = () => {
    setWalletAddress("");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography component="h1" variant="h4" gutterBottom>
        Connect to MetaMask
      </Typography>
      <MetaMaskConnector
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />
      {walletAddress && <WalletInfo address={walletAddress} />}
    </Box>
  );
};

export default App;

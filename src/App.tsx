import React, { useState } from "react";
import { Box, Stack, styled, Typography } from "@mui/material";
import MetaMaskConnector from "./components/MetaMaskConnector";
import WalletInfo from "./components/WalletInfo";
import CoinFlipGame from "./components/CoinFlipGame";
import { BoxProps } from "@mui/material/Box";

interface MainContainerProps extends BoxProps {
  isConnected: boolean;
}

const MainContainer = styled(Box)<MainContainerProps>(
  ({ theme, isConnected }) => ({
    minHeight: "100vh",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    padding: isConnected ? theme.spacing(0, 32) : theme.spacing(0, 48),
    background: theme.palette.background.default,
    backgroundSize: "cover",
    backgroundPosition: "center",
    gap: theme.spacing(3),

    [theme.breakpoints.down("sm")]: {
      flexDirection: isConnected ? "column" : "row",
      padding: isConnected ? theme.spacing(0) : theme.spacing(3.2),
    },
  })
);

const MetaMaskContainer = styled(Stack)(({ theme }) => ({
  flex: 1,
  textAlign: "center",
  padding: theme.spacing(3),
  borderRadius: theme.spacing(1.5),
  backdropFilter: `blur(${theme.spacing(0.5)})`,
  background: theme.palette.secondary.main,
  gap: theme.spacing(1),
  boxShadow: "0 10px 7px rgba(0,0,0,0.25)",

  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(1.6),
    padding: theme.spacing(2),
  },
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(3.2),

  [theme.breakpoints.down("sm")]: {
    fontSize: theme.spacing(2.4),
  },
}));

const CoinFlipContainer = styled(MetaMaskContainer)(({ theme }) => ({
  padding: theme.spacing(2),

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1.6),
  },
}));

const App: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");

  const handleConnect = (address: string) => {
    setWalletAddress(address);
  };

  const handleDisconnect = () => {
    setWalletAddress("");
  };

  return (
    <MainContainer isConnected={!!walletAddress}>
      <MetaMaskContainer>
        <Heading>{walletAddress ? "Connected" : "Connect to MetaMask"}</Heading>
        <MetaMaskConnector
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
        />
        {walletAddress && <WalletInfo address={walletAddress} />}
      </MetaMaskContainer>
      {walletAddress && (
        <CoinFlipContainer>
          <CoinFlipGame address={walletAddress} />
        </CoinFlipContainer>
      )}
    </MainContainer>
  );
};

export default App;

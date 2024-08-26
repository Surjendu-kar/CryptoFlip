import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import MetaMaskConnector from "./components/MetaMaskConnector";
import WalletInfo from "./components/WalletInfo";
import CoinFlipGame from "./components/CoinFlipGame";
import { styled } from "@mui/system";
import { BoxProps } from "@mui/material/Box";

interface MainContainerProps extends BoxProps {
  hasAddress: boolean;
}

const MainContainer = styled(Box)<MainContainerProps>(
  ({ theme, hasAddress }) => ({
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: hasAddress ? "0 20rem" : "0 30rem",
    background: "#121725",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#e2e8f0",
    gap: theme.spacing(3),
    [theme.breakpoints.down("lg")]: {},
    [theme.breakpoints.down("md")]: {},
    [theme.breakpoints.down("sm")]: {
      flexDirection: hasAddress ? "column" : "row",
      padding: hasAddress ? "0" : "2rem",
    },
  })
);

const MetaMaskContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  textAlign: "center",
  padding: "30px",
  borderRadius: "15px",
  backdropFilter: "blur(5px)",
  backgroundColor: "#1e293b",

  boxShadow: "0 10px 7px rgba(0,0,0,0.25)",
  [theme.breakpoints.down("sm")]: { marginTop: "1rem", padding: "20px" },
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
}));

const CoinFlipContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  textAlign: "center",
  padding: "20px",
  borderRadius: "15px",
  backdropFilter: "blur(5px)",
  backgroundColor: "#1e293b",

  boxShadow: "0 10px 7px rgba(0,0,0,0.25)",
  [theme.breakpoints.down("sm")]: {
    padding: "20px",
    marginBottom: "1rem",
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
    <MainContainer hasAddress={!!walletAddress}>
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

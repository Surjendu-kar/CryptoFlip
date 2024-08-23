import React, { useState } from "react";
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
    <div className="App">
      <header className="App-header">
        <h1>Connect to MetaMask</h1>
        <MetaMaskConnector
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
        />
        {walletAddress && <WalletInfo address={walletAddress} />}
      </header>
    </div>
  );
};

export default App;

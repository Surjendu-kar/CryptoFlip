import React, { useState } from "react";
import MetaMaskConnector from "./MetaMaskConnector";

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
      </header>
    </div>
  );
};

export default App;

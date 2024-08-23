import React, { useState } from "react";

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
      </header>
    </div>
  );
};

export default App;

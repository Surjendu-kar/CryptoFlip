import React, { useState, useEffect } from "react";

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
    <div>
      <button onClick={connectWalletHandler} disabled={!metamaskAvailable}>
        {isConnected ? "Disconnect Wallet" : "Connect Wallet"}
      </button>
      {!metamaskAvailable && (
        <p>Please install or unlock MetaMask to continue.</p>
      )}
    </div>
  );
};

export default MetaMaskConnector;

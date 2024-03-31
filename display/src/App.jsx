import React, { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [quantity, setQuantity] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [file, setFile] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [response, setResponse] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const sendMessage = async () => {
    try {
      await axios.post("http://localhost:3000/api/send-message", { message });
      setResponse("Message sent successfully");
    } catch (error) {
      setResponse("Error sending message");
    }
  };

  const joinGroup = async () => {
    try {
      await axios.post("http://localhost:3000/api/join-group");
      setResponse("Joined group successfully");
    } catch (error) {
      setResponse("Error joining group");
    }
  };

  const broadcast = async () => {
    try {
      await axios.post("http://localhost:3000/api/broadcast-message", {
        message: broadcastMessage,
      });
      setResponse("Message broadcasted successfully");
    } catch (error) {
      setResponse("Error broadcasting message");
    }
  };

  const transfer = async () => {
    try {
      await axios.post("http://localhost:3000/api/transfer", {
        recipient,
        quantity,
      });
      setResponse("Transfer completed successfully");
    } catch (error) {
      setResponse("Error transferring");
    }
  };

  const uploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      await axios.post("http://localhost:3000/api/upload", formData);
      setResponse("File uploaded successfully");
    } catch (error) {
      setResponse("Error uploading file");
    }
  };

  const generateWallet = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/generate-wallet"
      );
      setWalletAddress(response.data.address);
      setResponse("Wallet generated successfully");
    } catch (error) {
      setResponse("Error generating wallet");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Backend Interaction UI</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
        onClick={generateWallet}>
        Generate Wallet
      </button>

      {walletAddress && (
        <div className="mt-4">
          <p>Wallet Address: {walletAddress}</p>
        </div>
      )}

      <hr className="my-4" />

      <input
        type="text"
        className="border p-2 mb-2 w-full"
        placeholder="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={sendMessage}>
        Send Message
      </button>

      <hr className="my-4" />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={joinGroup}>
        Join Group
      </button>

      <hr className="my-4" />

      <input
        type="text"
        className="border p-2 mb-2 w-full"
        placeholder="Recipient ID"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="text"
        className="border p-2 mb-2 w-full"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={transfer}>
        Transfer
      </button>

      <hr className="my-4" />

      <input
        type="text"
        className="border p-2 mb-2 w-full"
        placeholder="Enter message to broadcast"
        value={broadcastMessage}
        onChange={(e) => setBroadcastMessage(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={broadcast}>
        Broadcast Message
      </button>

      <hr className="my-4" />

      <input
        type="file"
        className="mb-2"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={uploadFile}>
        Upload File
      </button>

      <hr className="my-4" />

      <input
        type="text"
        className="border p-2 mb-2 w-full"
        placeholder="Enter user address"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
      />

      {response && <p className="mt-4">{response}</p>}
    </div>
  );
}

export default App;

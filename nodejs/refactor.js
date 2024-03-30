import { message, createDataItemSigner, results } from "@permaweb/aoconnect";
import { readFileSync } from "fs";

const ID = "9wOEfhigYvpER1TFdiFzplkSQtU7id_vdu6js2YzHuU";

// Read wallet data from a JSON file
const wallet = JSON.parse(readFileSync("./wallet.json").toString());

// Reusable function to handle network requests with error handling
async function performNetworkRequest(options) {
  try {
    const response = await message({
      process: ID,
      signer: createDataItemSigner(wallet),
      ...options,
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

// Send a message to the network
async function sendMessage(message) {
  await performNetworkRequest({ data: message });
}

// Join a group in the network
async function joinGroup() {
  await performNetworkRequest({
    tags: [{ name: "Action", value: "Register" }],
  });
}

// Broadcast a message to the network
async function broadcastMessage(message) {
  await performNetworkRequest({
    tags: [{ name: "Action", value: "Broadcast" }],
    data: message,
  });
}

// Transfer a quantity to a recipient
async function transfer(recipient, quantity) {
  await performNetworkRequest({
    tags: [{ name: "Action", value: "Transfer" }],
    Recipient: recipient,
    Quantity: quantity,
  });
}

// Retrieve results from the network
async function getResults() {
  let resultsOut = await results({ process: ID, sort: "ASC", limit: 25 });
  let resultsOut2 = await results({
    process: ID,
    from: resultsOut.edges?.[resultsOut.edges.length - 1]?.cursor ?? null,
    sort: "ASC",
    limit: 25,
  });
  console.log(JSON.stringify(resultsOut, null, 2));
  console.log(resultsOut2);
}

async function uploadFile(file) {
  const data = new FormData();
  data.append("file", new Blob([file.buffer]), file.name);
  const response = await fetch("https://api.liteseed.xyz/data", { method: "POST", body: data });
  console.log(await response.text());
}

// Uncomment the function calls for testing
// getResults();
// sendMessage("Refactor");
// broadcastMessage("A change of Code")
//transfer("3mNDdtlXtijtGJTFMOKvTM28gHm-GELwr0FNib6uudg", "10");

module.exports = {
  sendMessage,
  joinGroup,
  broadcastMessage,
  transfer,
  getResults,
  uploadFile,
};

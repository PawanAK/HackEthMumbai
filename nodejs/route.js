const { message, createDataItemSigner, results } = require("@permaweb/aoconnect");
const { readFileSync } = require("fs");
const FormData = require('form-data');

const ID = "9wOEfhigYvpER1TFdiFzplkSQtU7id_vdu6js2YzHuU";
const wallet = JSON.parse(readFileSync("./wallet.json").toString());

async function performNetworkRequest(options) {
    try {
        const response = await message({
            process: ID,
            signer: createDataItemSigner(wallet),
            ...options,
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function sendMessage(message) {
    return await performNetworkRequest({ data: message });
}

async function joinGroup() {
    return await performNetworkRequest({
        tags: [{ name: "Action", value: "Register" }],
    });
}

async function broadcastMessage(message) {
    return await performNetworkRequest({
        tags: [{ name: "Action", value: "Broadcast" }],
        data: message,
    });
}

async function transfer(recipient, quantity) {
    return await performNetworkRequest({
        tags: [{ name: "Action", value: "Transfer" }],
        Recipient: recipient,
        Quantity: quantity,
    });
}

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
    return { resultsOut, resultsOut2 };
}

async function uploadFile(file) {
    const data = new FormData();
    data.append("file", file, file.name);
    const response = await fetch("https://api.liteseed.xyz/data", { method: "POST", body: data });
    return await response.text();
}

module.exports = {
    sendMessage,
    joinGroup,
    broadcastMessage,
    transfer,
    getResults,
    uploadFile
};

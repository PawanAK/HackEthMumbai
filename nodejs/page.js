import {

    message, createDataItemSigner, results
} from "@permaweb/aoconnect";

import { readFileSync } from 'fs';

const ID = "9wOEfhigYvpER1TFdiFzplkSQtU7id_vdu6js2YzHuU";

const wallet = JSON.parse(
    readFileSync("./wallet.json").toString(),
);

async function sendMessage() {
    try {
        const response = await message({
            process: ID,
            signer: createDataItemSigner(wallet),
            data: "Feat: Added"
        });
        console.log(response);
    }
    catch (error) {
        console.error(error);
    }
}

async function joinGroup() {
    try {
        const response = await message({
            process: ID,
            tags: [
                { name: "Action", value: "Register" }
            ],
            signer: createDataItemSigner(wallet),
        });
        console.log(response);
    }
    catch (error) {
        console.error(error);
    }

}

async function broadcastMessage() {
    try {
        const response = await message({
            process: ID,
            tags: [
                { name: "Action", value: "Broadcast" }
            ],
            signer: createDataItemSigner(wallet),
            data: "Hello all my friends! I am broadcasting a message to the world!"
        });
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}


async function transfer(recipient) {
    try {
        const response = await message({
            process: ID,
            tags: [
                { name: "Action", value: "Transfer" }
            ],
            Recipient: recipient,
            Quantity: "1000",
            signer: createDataItemSigner(wallet),
        });
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}



async function getResults() {
    let resultsOut = await results({
        process: ID,
        sort: "ASC",
        limit: 25,
    });

    let resultsOut2 = await results({
        process: ID,
        from: resultsOut.edges?.[resultsOut.edges.length - 1]?.cursor ?? null,
        sort: "ASC",
        limit: 25,
    });

    console.log(JSON.stringify(resultsOut, null, 2));

    console.log(resultsOut2);
}



async function upload(file) {
    const data = new FormData();
    data.append("file", new Blob([file.buffer]), file.name);

    const response = await fetch("https://api.liteseed.xyz/data", {
        method: "POST",
        body: data,
    });
    console.log(await response.text());
}



// getResults();
sendMessage(); 
import { ethers } from "ethers";

// Connect to the Ethereum blockchain using Infura

const provider = new ethers.JsonRpcProvider("https://eth.meowrpc.com");


// Subscribe to new block events
provider.on("block", (blockNumber) => {
    console.log("New block mined:", blockNumber);

    // Get block data for the new block
    provider.getBlock(blockNumber).then((block) => {
        if (block) getLatestBlockTransactions(block)
    }).catch((error) => {
        console.error("Error getting block data:", error);
    });
});

async function getLatestBlockTransactions(latestBlock: ethers.Block) {
    // console.log(JSON.stringify(latestBlock))
    // console.log({transactions: JSON.stringify(latestBlock.transactions)})
    try {

        if (!latestBlock) return;

        if (latestBlock.transactions.length === 0) {
            console.log("No transactions in the latest block.");
            return;
        }

        // Fetch all transactions in the latest block
        const tx = await provider.getTransaction(latestBlock.transactions[0]);
        console.log({tx: JSON.stringify(tx)})
        if (tx) {
            console.log("Transaction Hash:", tx.hash);
            console.log("From:", tx.from);
            console.log("To:", tx.to);
            console.log("Value (ETH):", ethers.formatEther(tx.value));
            console.log("Gas Limit:", tx.gasLimit.toString());
            console.log("Gas Price (Gwei):", ethers.formatUnits(tx.gasPrice, "gwei"));
            console.log("Data:", tx.data);
            console.log("---------");
        }
    } catch (error) {
        console.error("Error fetching transactions from the latest block:", error);
    }
}

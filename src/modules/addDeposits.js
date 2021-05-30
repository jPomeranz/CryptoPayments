const logger = require('../utils/logger');
const fsPromises = require('fs').promises;

async function addDeposits(filepaths, db) {
    for (const filepath of filepaths) {
        await processFile(filepath, db);
        logger.debug(`Processing of file ${filepath} completed`);
    }
}

async function processFile(filepath, db) {
    const contents = await fsPromises.readFile(filepath, 'utf-8');
    let transactions;
    try {
        const data = JSON.parse(contents)
        transactions = data.transactions || [];
    } catch (error) {
        logger.error(`Error reading contents of file ${filepath}`);
        throw error;
    }
    transactions = getVerifiedDeposits(transactions);
    await loadDepositsToDatabase(transactions, db);
}

function getVerifiedDeposits(transactions) {
    return transactions.filter(transaction => (transaction.category === 'receive' || transaction.category === 'generate') && transaction.confirmations >= 6);
}

async function loadDepositsToDatabase(transactions, db) {
    return Promise.all(transactions.map(async transaction => {
        const { txid, address, amount } = transaction;
        try {
            await db.addTransaction(txid, address, amount);
        } catch (error) {
            logger.error(`Error writing transaction for txid ${txid}`, error);
            throw error;
        }
    }));
}

module.exports = addDeposits;
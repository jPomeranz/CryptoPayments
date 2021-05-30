const logger = require('./utils/logger');
const fetchInput = require('./modules/fetchInput');
const addDeposits = require('./modules/addDeposits');
const Database = require('./modules/database');
const printDeposits = require('./modules/printDeposits');
const path = require('path');

const resourceFolder = path.resolve(__dirname, './resources/');
const dbPath = path.resolve(__dirname, './database.db');
const knownCustomers = [
    {
        address: 'mvd6qFeVkqH6MNAS2Y2cLifbdaX5XUkbZJ',
        name: 'Wesley Crusher',
    },
    {
        address: 'mmFFG4jqAtw9MoCC88hw5FNfreQWuEHADp',
        name: 'Leonard McCoy',
    },
    {
        address: 'mzzg8fvHXydKs8j9D2a8t7KpSXpGgAnk4n',
        name: 'Jonathan Archer',
    },
    {
        address: '2N1SP7r92ZZJvYKG2oNtzPwYnzw62up7mTo',
        name: 'Jadzia Dax',
    },
    {
        address: 'mutrAf4usv3HKNdpLwVD4ow2oLArL6Rez8',
        name: 'Montgomery Scott',
    },
    {
        address: 'miTHhiX3iFhVnAEecLjybxvV5g8mKYTtnM',
        name: 'James T. Kirk',
    },
    {
        address: 'mvcyJMiAcSXKAEsQxbW9TYZ369rsMG6rVV',
        name: 'Spock',
    },
];

async function main() {
    const db = await new Database(dbPath);
    await db.init();
    const inputFilepaths = await fetchInput(resourceFolder);
    logger.debug('Found input filepaths:', inputFilepaths)
    await addDeposits(inputFilepaths, db);
    await printDeposits(knownCustomers, db);
    await db.close();
}

main().catch(error => {
    logger.error('Unhandled exception detected; job failed', error)
});
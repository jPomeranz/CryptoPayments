const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

class Database {
    constructor(filepath) {
        this.filepath = filepath;
    }

    async init() {
        const db = await sqlite.open({
            filename: this.filepath,
            driver: sqlite3.Database
        })
        await db.exec('CREATE TABLE IF NOT EXISTS transactions (txid TEXT NOT NULL PRIMARY KEY, address TEXT NOT NULL, amount DECIMAL(65,8) NOT NULL)');
        this.db = db;
    }

    async addTransaction(txid, address, amount) {
        return this.db.run(
            'REPLACE INTO transactions (txid, address, amount) VALUES (?, ?, ?)',
            txid,
            address,
            amount,
        );
    }

    async getAddressCount(address) {
        const res = await this.db.get(
            'SELECT COUNT(DISTINCT txid) from transactions where address = ?',
            address,
        );
        return res['COUNT(DISTINCT txid)'];
    }

    async getAddressSum(address) {
        const res = await this.db.get(
            'SELECT SUM(amount) from transactions where address = ?',
            address,
        );
        return res['SUM(amount)'];
    }

    async getTotalCount() {
        const res = await this.db.get(
            'SELECT COUNT(DISTINCT txid) from transactions',
        );
        return res['COUNT(DISTINCT txid)'];
    }

    async getTotalSum() {
        const res = await this.db.get(
            'SELECT SUM(amount) from transactions',
        );
        return res['SUM(amount)'];
    }

    async getMinAmount() {
        const res = await this.db.get(
            'SELECT MIN(amount) from transactions',
        );
        return res['MIN(amount)'];
    }
    async getMaxAmount() {
        const res = await this.db.get(
            'SELECT MAX(amount) from transactions',
        );
        return res['MAX(amount)'];
    }

    async close() {
        return this.db.close()
    }
}


module.exports = Database;
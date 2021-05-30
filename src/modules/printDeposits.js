const logger = require('../utils/logger');

async function printDeposits(knownCustomers, db) {
    let knownCount = 0;
    let knownSum = 0;
    for (const customer of knownCustomers) {
        const count = await db.getAddressCount(customer.address);
        knownCount += count;
        const sum = await db.getAddressSum(customer.address);
        knownSum += sum;
        logger.info(`Deposited for ${customer.name}: count=${count} sum=${sum.toFixed(8)}`);
    }
    const totalCount = await db.getTotalCount();
    const totalSum = await db.getTotalSum();
    logger.info(`Deposited without reference: count=${totalCount-knownCount} sum=${(totalSum-knownSum).toFixed(8)}`);
    const minAmount = await db.getMinAmount();
    logger.info(`Smallest valid deposit: ${minAmount.toFixed(8)}`);
    const maxAmount = await db.getMaxAmount();
    logger.info(`Largest valid deposit: ${maxAmount.toFixed(8)}`);
}

module.exports = printDeposits;
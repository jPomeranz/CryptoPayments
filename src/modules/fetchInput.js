const logger = require('../utils/logger');
const fsPromises = require('fs').promises;
const path = require('path');

module.exports = async (resourceFolder) => {
    try {
        const paths = await fsPromises.readdir(resourceFolder);
        return paths.map(p => path.resolve(resourceFolder, p));
    } catch (error) {
        logger.error('Error reading input files', error);
        throw error;
    }
}
module.exports = {
    debug: process.env.DEBUG ? console.debug : ()=>{},
    info: console.log,
    warn: console.warn,
    error: console.error,
};
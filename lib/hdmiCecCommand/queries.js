module.exports = {
    // Get Debug Mode
    getDebugMode : `
    	SELECT value
        FROM param
        WHERE name = 'DEBUG_CEC';
    `
};
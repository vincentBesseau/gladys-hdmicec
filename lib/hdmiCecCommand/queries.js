module.exports = {
    getIdentifier : `
    	SELECT identifier
        FROM device
        WHERE id = ?;
    `
};
const serverless = require('serverless-http'); 
const app = require('../src/index.js'); 			//make sure you export the app module from the index.js

const handler = serverless(app);  		      

module.exports.handler = handler;      

module.exports.handler = async (e, context) => {	//you can use a callback to connect to databases or some other async logic that must be implemented before every request
    const result = await handler(e, context);
    return result;
};
		
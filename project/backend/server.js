const app = require('./app');
const connectDatabase = require('./config/databse');

const dotenv = require('dotenv');

// Handle Uncaught Exceptions and
// process.on('uncaughtException', err => {
//     console.log(`Error: ${err.message}`);
//     console.log('Shutting down due to uncaught exception');
//     process.exit(1);
// })

//Setting Up Config File
dotenv.config({ path: 'backend/config/config.env' });

//Connect Databse
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Start At PORT : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})

//Handle Unhandled promise rejection Code
// process.on('unhandledRejection', err => {
//     console.log(`Error: ${err.message}`);
//     console.log('Shutting down the server due to unhandled Prosise Rejection');
//     server.close(() => {
//         process.exit(1);
//     });
// })
const app = require('./app');
const connectDatabase = require('./config/databse');

const dotenv = require('dotenv');

//Setting Up Config File
dotenv.config({ path: 'backend/config/config.env' });

//Connect Databse
connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Server Start At PORT : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})

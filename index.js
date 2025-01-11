const app = require('./app');
const { connectDB } = require('./utils/db');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1"

connectDB().then(() => {
    app.listen(PORT, HOST, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to the database', err);
});
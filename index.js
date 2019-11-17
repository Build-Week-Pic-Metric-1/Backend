require('dotenv').config();

const server = require('./api/server');
const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`Server is running.. \nDomain: localhost\nPort: ${port}\nInformation: Checkout / for api endpoint documentation.`));
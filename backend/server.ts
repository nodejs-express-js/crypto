import express from 'express';
import { expressConnectMiddleware } from '@connectrpc/connect-express';
import routes from './Service/connect.js';
import cors from 'cors'
const app = express();
app.use(cors())
// Use Connect RPC middleware
app.use(expressConnectMiddleware({ routes }));

// // Define a simple route
// app.get('/', (_, res) => {
//   res.type('text/plain').send('Hello World!');
// });

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

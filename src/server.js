require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server);

const routes = require('./routes');
const socket = require('./middleware/socket');

require('./database');

app.use(socket(io));

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

routes.forEach(item => app.use(item.routes()));

server.listen(process.env.PORT, () => console.log(`server online in port ${process.env.PORT}`));

import api from './procedures/api';
import * as express from 'express';

import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';


let routing = require('./middleware/routing.mw.js');


let clientPath = path.join(__dirname, '../client');
let dataPath = path.join(__dirname, 'data.json');


let app = express();
app.use(express.static(clientPath));
app.use(cookieParser());
app.use(bodyParser.json());


app.use('/api', api);

app.get('*', routing.stateRouting);

const prerender = require('prerender-node');
prerender.set('prerenderToken', process.env.PRERENDER_TOKEN);
app.use(prerender);
prerender.set('prerenderServiceUrl', 'http://localhost:1337/');


console.log('listening')
app.listen(process.env.PORT || 3000);
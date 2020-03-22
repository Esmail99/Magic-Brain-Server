const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./Controllers/signin');
const register = require('./Controllers/register');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'Esmail@33',
      database : 'magicbrain'
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => res.send('It is working!'));
app.post('/signin', signin.handleSignin(db,bcrypt));
app.post('/register', (req,res) => register.handleRegister(req,res,db,bcrypt));
app.get('/profile/:id',(req,res) => profile.handleProfile(req,res,db));
app.put('/image', (req,res) => image.handleImage(req,res,db));
app.post('/imageurl', (req,res) => image.handleAPI(req,res));

app.listen(3001);
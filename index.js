import express from 'express'
// import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
// import bcrypt from 'bcrypt'
import checkAuth from './utils/checkAuth.js'

import { UserController } from './controllers/index.js';

// import { MongoClient, ServerApiVersion } from 'mongodb'
// import { validationResult } from 'express-validator'

import { registerValidation, loginValidation, postCreateValidation } from './validations.js'

// import UserModel from './models/User.js';

const uri = "mongodb+srv://mironez:1939@road2fullstack.pgmrlfw.mongodb.net/blog?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));


const app = express()

app.use(express.json())

app.post('/auth/login', loginValidation, UserController.login)

app.post('/auth/register', registerValidation, UserController.register)

app.get('/auth/me', checkAuth, UserController.getMe)

app.listen(4444, err => {
    if (err) {
        console.log(err);
    }

    console.log('server OK');
})
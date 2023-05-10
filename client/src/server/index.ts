import express from "express"
import { api } from "./api"

const cors = require('cors');

const app = express()

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    preflightDisallowedRedirect: true
  }));

app.use(api)

app.listen(3002, () => console.log("Server started"))
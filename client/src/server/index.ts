import express from "express";
import { api } from "./api";
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID)

const cors = require("cors");

const app = express();

app.use(
    cors({
        credentials: true,
        origin: true,
    })
);

app.use(api);


app.post("/api/v1/auth/google", async (req, res) => {
    const { token }  = req.body
    console.log("token", token);
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.REACT_APP_GOOGLE_CLIENT_ID
    });
    // const { name, email, picture } = ticket.getPayload();    
    // const user = await db.user.upsert({ 
    //     where: { email: email },
    //     update: { name, picture },
    //     create: { name, email, picture }
    // })
    console.log("ticket", ticket)
    res.status(201)
    res.json(ticket)
})

app.listen(3002, () => console.log("Server started"));

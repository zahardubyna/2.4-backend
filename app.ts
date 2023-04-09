import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cors from 'cors'

const PORT = 3000
const URL = "mongodb+srv://ZaharDubina:qwepoi@cluster-2-4-node-ts.icnlbul.mongodb.net/todo"

import router_v1 from "./routes/router_v1";
import router_v2 from "./routes/router_v2";
import connectDatabase from "./dbConnection";


const app = express()

app.use(session({
    store: MongoStore.create({
        mongoUrl: URL
    }),
    secret: 'somethingveryveryverylongsecret',
    resave: true,
    saveUninitialized: true
}))
    

declare module 'express-session' {
    interface SessionData {
        id: string
    }
}
app.use(express.json())
app.use(express.static('public'))
app.use('/api/v1', router_v1)
app.use("/api/v2/router", router_v2);



app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

async function RunServer() {
    try {
        await connectDatabase(URL).then(() => {console.log(`Connected to DB`)})
        app.listen(3000, () => {
            console.log(`Server listening on http://localhost:${PORT}`)
        })
    } catch (e) {
        console.log(`[GET] ERROR in connectDatabase : ${e}`)
    }
}
RunServer()
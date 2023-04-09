import {connect, connection} from "mongoose"
import mongoose from "mongoose"

const URL = "mongodb+srv://ZaharDubina:qwepoi@cluster-2-4-node-ts.icnlbul.mongodb.net/todo"

mongoose.set('strictQuery', true);
const connectDatabase = (url: string) => connect(url)

connection.on('error', () => {
    connectDatabase(URL).then(() => {console.log('[GET] Error in connectDatabase')})
})
export default connectDatabase
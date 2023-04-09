import { UserModel } from "../schemas/usersSchemas";
import { TaskModel } from "../schemas/tasksSchemas";
import {Request, Response} from "express";


// Rout_User
export async function login(req: Request, res: Response) {
    const {login, pass} = req.body
    if (!(login && pass)){
        return res.status(400).json({ok: false})
    }
    const user = await UserModel.findOne({login,pass})
    console.log(user)
    if(!user){
        return res.status(404).json({error: "not found"})
    }
    // req.session.id = user._id.toString()
    res.status(200).json({ "ok": true })
}

export async function register(req: Request, res: Response) {
    const { login, pass } = req.body
    if (!(login && pass)){
        return res.status(400).json({ok: false})
    }
    const user = await UserModel.findOne({login})
    if(user){
        return res.status(400).json({ "error": "already exist" })
    }
    await UserModel.create({login, pass})
    res.status(200).json({ok: true})
}

export function logout(req: Request, res: Response) {
    req.session.destroy((err) => {
        if(!err) res.clearCookie('connect.sid').json({ok: true})
    })
}

// Rout_Tasks
export async function getItems(req: Request, res: Response) {
    try {
        if(!req.session.id){
            return res.status(403).json({error: 'forbidden'})
        }
        const Tasks = await TaskModel.find({ Userid: req.session.id})
        res.status(200).json(Tasks)
    } catch (e) {
        console.log(`[GET] Error in getItems:${e}`)
        res.status(500).json({error: e})
    }
}

export async function addItem(req: Request, res: Response) {
    try {
        if(!req.session.id && !req.body.hasOwnProperty('text')){
            return res.status(400).send('400 Bad Request')
        }
        req.body.Userid = req.session.id
        const task = await TaskModel.create(req.body)
        res.status(200).json({id: task._id})
    } catch (e) {
        console.log(`[GET] Error in addItem : ${e}`)
        res.status(500).json({error: e})
    }
}

export async function changeItem(req: Request, res: Response) {
    try {
        if (!req.session.id){
            return res.status(400).send({ error: "Bad Request" })
        }
        const task = await TaskModel.findOneAndUpdate({ _id: req.body._id }, req.body)
        if(!task){
            return res.status(400).json({error: 'Bad Request'})
        }
        res.status(200).json({ok: true})
    } catch (e) {
        console.log(`[GET] Error in changeItem : ${e}`)
        res.status(500).json({error: e})
    }
}

export async function deleteItem(req: Request, res: Response) {
    try {
        if (!req.session.id && !req.body.hasOwnProperty('_id')){
            return res.status(400).json({ "error": "Bad Request"})
        }
        const task = await TaskModel.findOneAndDelete({ _id: req.body._id })
        if(!task){
            return res.status(404).json({error: '404 Not found'})
        }
        res.status(200).json({ ok: true })
    } catch (e) {
        console.log(`[GET] Error in deleteItem : ${e}`)
        res.status(500).json({error: e})
    }
}
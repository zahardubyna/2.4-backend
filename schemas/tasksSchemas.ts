import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface Task {
    Userid: string,
    text: string,
    checked: boolean
}

const TaskSchema = new Schema<Task>({
    Userid: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false
    }
})

export const TaskModel = mongoose.model<Task>('tasks', TaskSchema)

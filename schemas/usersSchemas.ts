import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface User {
    login: string,
    pass: string,
}

const UserSchema = new Schema<User>({
    login: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    }
})

export const UserModel = mongoose.model<User>('users', UserSchema)

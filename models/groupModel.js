const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3
    },
    description:{
        type: String,
        required: true,
        unique: false,
        trim: true,
        minLength: 3
    },
    groupPic:{
        type: String,
        required: true,
        unique: false,
        trim: true,
        minLength: 3
    },
    members:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    admins:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;
// 1. Create User
// 2. Update User
// 3. Follow User
// 4. Accept Follow Request
// 5. Reject Follow Request 
// 6. Remove Follower
// 7. Update Profile Image
// 8. Create Achievement
// 9. Update Achievement
// 10. Delete Achievement

const User = require('../models/userModel');

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const userSchema = new Schema(
//   {
//     firebaseId: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       minLength: 3,
//     },
    // userName:{
    //     type: String,
    //     required: true,
    //     unique: true,
    //     trim: true,
    //     minLength: 3
    //   },
//     name: {
//       type: String,
//       required: true,
//       unique: false,
//       trim: true,
//       minLength: 3,
//     },
//     designation: {
//       type: String,
//       required: true,
//       unique: false,
//       trim: true,
//       minLength: 3,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       minLength: 3,
//     },
//     tagLine: {
//       type: String,
//       required: true,
//       unique: false,
//       trim: true,
//       minLength: 3,
//     },
//     profilePic: {
//       type: String,
//       required: true,
//       unique: false,
//       trim: true,
//       minLength: 3,
//     },
//     bio: {
//       type: String,
//       required: true,
//       unique: false,
//       trim: true,
//       minLength: 3,
//     },
//     location: {
//       type: String,
//       required: true,
//       unique: false,
//       trim: true,
//       minLength: 3,
//     },
//     currentFocus: {
//       type: String,
//       required: true,
//       unique: false,
//       trim: true,
//       minLength: 3,
//     },
//     goals: {
//       type: String,
//       required: true,
//       unique: false,
//       trim: true,
//       minLength: 3,
//     },
//     dob: {
//       type: Date,
//       required: true,
//       unique: false,
//       trim: true,
//       minLength: 3,
//     },
//     joinedOn: {
//       type: Date,
//       required: true,
//       unique: false,
//       trim: true,
//       minLength: 3,
//     },
//     lastActive: {
//       type: Date,
//       required: true,
//       unique: false,
//       trim: true,
//       minLength: 3,
//     },
//     posts: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Post",
//       },
//     ],
//     achievements: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Achievement",
//       },
//     ],
// connections: [
//     {
//       user: {
//         type: Schema.Types.ObjectId,
//         ref: "User",
//       },
//       accepted: {
//         type: Boolean,
//         required: true,
//       },
//     },
//   ],
//   },
//   {
//     timestamps: true,
//   }
// );

const Achievement = require('../models/achievementModel');

// Create User
const createUser = async (req, res) => {
    try{
        // const { firebaseId, name, designation, email, tagLine, profilePic, bio, location, currentFocus, goals, dob, joinedOn, lastActive } = req.body;
        User.create(req.body , (err, user) => {
            if(err){
                res.status(500).json({ message: err.message });
            } else {
                res.status(201).json({ message: "User created successfully", user });
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// read User

const getUsersByRegex = async (req, res) => {
    try{
        const { search } = req.params;
        const users = await User.find({$or: [{name: {$regex: search, $options: 'i'}}, {userName: {$regex: search, $options: 'i'}}]});
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getUserByUserName = async (req, res) => {
    try{
        const { userName } = req.params;
        const user = await User.findOne({
            userName
        });
        res.status(200).json({ user });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

const connectionRequest = async (req, res) => {
    try{
        const { userName } = req.params;
        const { myId } = req.body;

        const user = await User.findOne({
            userName
        });
        const me = await User.findOne({
            firebaseId: myId
        });

        if(user.connections.includes(me._id)){
            res.status(400).json({ message: "Already connected" });
        }
        else{
            user.connections.push({ user: me._id, accepted: false });
            me.connections.push({ user: user._id, accepted: false });

            await user.save();
            await me.save();
            // request notification email
            res.status(200).json({ message: "Connection request sent" });
        }
        res.status(200).json({ user });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

const acceptConnectionRequest = async (req, res) => {
    try{
        const { userName } = req.params;
        const { myId } = req.body;

        const user = await User.findOne({
            userName
        });
        const me = await User.findOne({
            firebaseId: myId
        });

        if(user.connections.includes(me._id) && user.connections.accepted === true){
            res.status(400).json({ message: "Already connected" });
        }
        else{
            user.connections.push({ user: me._id, accepted: true });
            me.connections.push({ user: user._id, accepted: true });

            await user.save();
            await me.save();
            // request accepted notification email
            res.status(200).json({ message: "Connection request accepted" });
        }
        res.status(200).json({ user });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

const rejectConnectionRequest = async (req, res) => {
    try{
        const { userName } = req.params;
        const { myId } = req.body;

        const user = await User.findOne({
            userName
        });
        const me = await User.findOne({
            firebaseId: myId
        });

        if(user.connections.includes(me._id) && user.connections.accepted===false){
            res.status(400).json({ message: "Already connected" });
        }
        else{
            user.connections.pull({ user: me._id, accepted: false });
            me.connections.pull({ user: user._id, accepted: false });
            await user.save();
            await me.save();
            // request rejected notification email
            res.status(200).json({ message: "Connection request rejected" });
        }
        res.status(200).json({ user });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

const removeConnection = async (req, res) => {
    try{
        const { userName } = req.params;
        const { myId } = req.body;

        const user = await User.findOne({
            userName
        });
        const me = await User.findOne({
            firebaseId: myId
        });

        if(user.connections.includes(me._id)){
            user.connections.pull({ user: me._id, accepted: true });
            me.connections.pull({ user: user._id, accepted: true });
            await user.save();
            await me.save();
            
            res.status(200).json({ message: "Connection removed" });
        }
        else{
            res.status(400).json({ message: "Not connected" });
        }
        res.status(200).json({ user });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};
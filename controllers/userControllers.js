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
const Achievement = require('../models/achievementModel');

// Create User
const createUser = async (req, res) => {
    try{
        const { firebaseId, userName, name, designation, email, tagLine, profilePic, bio, location, currentFocus, goals } = req.body;
        const user = await User.create({
            firebaseId,userName, name, designation, email, tagLine, profilePic, bio, location, currentFocus, goals,
            dob: new Date("2005-03-26"), joinedOn: new Date(), lastActive: new Date()
        });
        res.status(201).json({ message: "User created successfully", user });
    }
    catch (err) {
        // validation error
        if(err.name === 'ValidationError'){
            return res.status(400).json({ message: err.message });
        }
        // duplicate key error
        if(err.code === 11000){
            return res.status(400).json({ message: "User already exists" });
        }
        res.status(500).json({ message: err.message });
    }
};

// read User

const getUsersByRegex = async (req, res) => {
    try{
        const { query } = req.params;
        const users = await User.find(
            {
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { userName: { $regex: query, $options: "i" } }
                ]
            }
        )
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
        const { userName, myId } = req.body;

        const user = await User.findOne({
            userName  
        });
        const me = await User.findOne({
            firebaseId: myId
        });
        // if user._id in me.connections where connection: { user: user._id, accepted: false }
        if(me.connections.includes(user._id) || user.connections.includes(me._id)){
            res.status(400).json({ message: "Already requested" });
        }
        else{
            user.connections.push(me._id);
            me.connections.push(user._id);
            await user.save();
            await me.save();
            // connection request notification email
            res.status(200).json({ message: "Connection request sent" });
        }
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

const removeConnection = async (req, res) => {
    try{
        const { userName, myId } = req.body;

        const user = await User.findOne({
            userName
        });
        const me = await User.findOne({
            firebaseId: myId
        });

        if(user.connections.includes(me._id) || me.connections.includes(user._id)){
            user.connections.pull(me._id);
            me.connections.pull(user._id);
            await user.save();
            await me.save();
            
            res.status(200).json({ message: "Connection removed" });
        }
        else{
            res.status(400).json({ message: "Not connected" });
        }
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

const updateUser = async (req, res) => {
    try{
        const { userName } = req.params;
        const user = await User.findOne({
            userName
        });
        if(user){
            user.set(req.body);
            await user.save();
            res.status(200).json({ message: "User updated successfully", user });
        }
        else{
            res.status(400).json({ message: "User not found" });
        }
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

const createAchievement = async (req, res) => {
    try{
        const { userName } = req.params;
        const { title, description } = req.body;
        const user = await User.findOne({
            userName
        });
        date = new Date("2021-03-26");
        if(user){
            const achievement = await Achievement.create({
                title, description, date, userId: user._id
            });
            user.achievements.push(achievement._id);
            await user.save();
            res.status(200).json({ message: "Achievement created successfully", achievement });
        }
        else{
            res.status(400).json({ message: "User not found" });
        }
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

// update using patch

const updateAchievement = async (req, res) => {
    try{
        const { uid, achievementId } = req.body;
        const user = await User.findById(uid);
        if(user){
            const achievement = await Achievement.findById(achievementId);
            if(achievement){
                achievement.set(req.body);
                await achievement.save();
                res.status(200).json({ message: "Achievement updated successfully", achievement });
            }
            else{
                res.status(400).json({ message: "Achievement not found" });
            }
        }
        else{
            res.status(400).json({ message: "User not found" });
        }
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

const deleteAchievement = async (req, res) => {
    try {
        const { uid, achievementId } = req.body;
        const user = await User.findById(uid);
        if(user){
            user.achievements.pull(achievementId);
            await user.save();
            const achievement = await Achievement.findByIdAndDelete(achievementId);
            if(achievement){
                res.status(200).json({ message: "Achievement deleted successfully", achievement });
            }
            else{
                res.status(400).json({ message: "Achievement not found" });
            }
        }
        else{
            res.status(400).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createUser,
    getUsersByRegex,
    getUserByUserName,
    connectionRequest,
    removeConnection,
    updateUser,
    createAchievement,
    updateAchievement,
    deleteAchievement
};
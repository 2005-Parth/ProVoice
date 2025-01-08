const express = require('express');
const router = express.Router();

const createUser = (req, res) => {
    res.send("Create User");
}

const updateUser = (req, res) => {
    res.send("Update User");
};

const readUser = (req, res) => {
    res.send("Read User");
};

const deleteUser = (req, res) => {
    res.send("Delete User");
};

router.post("/api/v1/user", createUser);
// router.put("/api/v1/user", updateUser);
router.patch("/api/v1/user", updateUser);
router.get("/api/v1/user", readUser);
router.delete("/api/v1/user", deleteUser);
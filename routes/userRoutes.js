const express = require("express");
const router = express.Router();

const Models = require("../models/userModels");

router.post("/post", async (req, res) => {
    const data = new Models({
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        city: req.body.city
    });
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    };
});

router.get("/getAll", async (req, res) => {
    try {
        const data = await Models.find().lean();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message })
    };
});

router.get("/get/:id", async (req, res) => {
    try {
        const data = await Models.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message })
    };
});

router.patch("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const result = await Models.findByIdAndUpdate(id, updatedData, options);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    };
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Models.findByIdAndDelete(id);
        res.json(`User information of ${data.name} has been deleted.`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    };
});

module.exports = router;
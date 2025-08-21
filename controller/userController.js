const pool = require("../config/db");

exports.createUser = async (req, res) => {
    const { email, name, age, gender, city } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO users (email, name, age, gender, city) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [email, name, age, gender, city]
        );
        res.status(201).json({ data: result.rows[0], message: "User created successfully..." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    };
};

exports.getAllUsers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
        res.json({ data: result.rows, message: "Users fetched successfully..." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.getUserById = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [req.params.id]);
        res.json({ data: result.rows[0], message: `User fetched, name ${result.rows[0].name}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.updateUser = async (req, res) => {
    const { email, name, age, gender, city } = req.body;
    try {
        const result = await pool.query(
            "UPDATE users SET email=$1, name=$2, age=$3, gender=$4, city=$5 WHERE id=$6 RETURNING *",
            [email, name, age, gender, city, req.params.id]
        );
        res.json({ data: result.rows[0], message: "User updated successfully..." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    };
};

exports.deleteUser = async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM users WHERE id=$1 RETURNING *", [req.params.id]);
        if (!result.rows[0]) return res.status(404).json({ message: "User not found" });
        res.json({ data: `User information of ${result.rows[0].name} has been deleted.` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    };
};
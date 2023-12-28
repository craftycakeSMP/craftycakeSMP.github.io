const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Dummy user data for demonstration
const accounts = {
    "fractt": "$2b$10$gNrgT7klNBoav0jTJEP4o.4e6.y9Zny/.rOogN7/hPITM9UeblX5M", // bcrypt hash of "fracttlmao"
    // Add more user accounts here...
};

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (accounts.hasOwnProperty(username) && bcrypt.compareSync(password, accounts[username])) {
        res.status(200).json({ success: true, redirect: `https://craftycakesmp.github.io/ifbo/account.html?user=${encodeURIComponent(username)}` });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

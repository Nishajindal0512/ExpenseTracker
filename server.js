const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let userData = {'username':"xyz"};

// API endpoint to create or update user data
app.post('/api/user-data', (req, res) => {
  const { username, transactions } = req.body;

  if (!username || !transactions || !Array.isArray(transactions)) {
    return res.status(400).json({ error: 'Invalid request format' });
  }

  userData[username] = { transactions };

  res.status(201).json({ message: 'User data saved successfully' });
});

// API endpoint to get user data
app.get('/api/user-data/:username', (req, res) => {
  const { username } = req.params;

  const user = userData[username];

  if (user) {
    res.json({ transactions: user.transactions });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
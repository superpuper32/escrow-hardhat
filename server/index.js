const express = require('express');
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const escrows = [
    {
        address: '',
        arbiter: '',
        beneficiary: '',
        value: value.toString(),
        handleApprove: false
    }
];

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/escrows/:escrowHash', (req, res) => {
  const { escrowHash } = req.params;
  const escrow = escrows[escrowHash] || {};
  res.send({ escrow });
})

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Escrow DApp listening on port ${port}`);
})

const express = require('express');
const axios = require('axios');;
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());


// transactions (simulate a DB)
let transactions = {};

// POST: /pay 
app.post('/pay', async (req, res) => {
    const { amount, payerId, payeeId } = req.body;
     const reference =  amount.toString()+payerId+payeeId;

    // Ensure idempotency
    if (transactions[reference]) {
        return res.status(200).json({ message: 'Transaction already processed', status: transactions[reference].status });
    }


  const maxRetries = 5;
  let retryCount = 0;  
  let delay = 1000;     // Initial delay in milliseconds (1 second)
  
  while (retryCount < maxRetries) {
    try {
      // mock payment request
      const response = await axios.post("https://mock-mobile-money-api.com/pay", {
        amount,
        payerId,
        payeeId
      });


    transactions[reference] = { amount, payerId, payeeId, status: 'success' };
    console.log(`Transaction ${reference} successful`);

    res.status(200).json({ message: 'Payment successful', reference });

    } catch (error) {
      retryCount++;
      transactions[reference] = { amount, payerId, payeeId, status: 'pending' };
      console.log(`transaction status: ${transactions[reference].status}`)
     if (retryCount >= maxRetries) {
    console.log(`Transaction ${reference} failed: ${error.message}`);
        transactions[reference] = { amount, payerId, payeeId, status: 'failed' };
        console.log(`transaction status: ${transactions[reference].status}`)
        res.status(500).json({ message: 'Payment failed after retries', reference });
    }

      // Apply exponential backoff (delay * 2 on each failure)
      console.log(`Retrying payment request... Attempt ${retryCount}`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2; // Double the delay for the next retry
    }
  }
}

);

// GET: /status/:reference
app.get('/status/:reference', (req, res) => {
    const { reference } = req.params;

    const transaction = transactions[reference];
    if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json({ reference, status: transaction.status });
});


app.listen(3000, () => {
    console.log('API is running on port 3000');
});

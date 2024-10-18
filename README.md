

# script Setup
- install `node.js` on your local system [here](https://nodejs.org/en/)
- clone the repository to your local system [here](https://github.com/Godtide/challenge2)
- `cd challenge2`
- run `npm i` to install dependencies


## run the script
```
node solutions

```

- **Endpoints:**
  - POST /pay: Process payment.
  Add request body  `const { amount, payerId, payeeId } = req.body`;
  - GET /status/:reference: Check transaction status.
  



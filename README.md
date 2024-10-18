

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
  - GET /status/:reference: Check transaction status.

# test for idempotency 

Add reference to post body like below

`const { amount, payerId, payeeId, reference } = req.body`; on line 14
   
 We make sure the request is not same by generating a new reference. so comment out the next line 15
     // const reference = uuidv4();

 A more robust solution using the DB will have the idempotency key stored using the concatenated string of the request parameters and reference.

# test for succesful response
comment line 30 -34, save, restart the server




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
  - POST /pay: Process payment.<br />
  Add request body  ` { amount: number, payerId:string, payeeId: string }`;
  - GET /status/:reference: Check transaction status.
  
# test for idempotency 
Add reference to post body like below<br />
`const { amount, payerId, payeeId, reference } = req.body`; on line 14<br />
 We make sure the request is not same by generating a new reference. so comment out the next line 15<br />
     // const reference = uuidv4();<br />
 save and restart script



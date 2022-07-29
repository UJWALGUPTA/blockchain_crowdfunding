## Tech Stack

- Next JS
- Chakra UI
- Solidity
- Web3.js

## To run the application locally

- Fork the Project
- run `yarn install` to install all the dependencies
- run `yarn dev` to run the application locally

## Prerequisites to create Campaign and Contribute

1. Install **Metamask** as Google Chrome Extension and Create an account.
2. Request Ether by sharing your ethereum address in social media <br>(`https://faucet.rinkeby.io/)`
3. Get 0.01 ether free by giving the ethereum address <br>`(http://rinkeby-faucet.com/)`

## To Deploy your own Contract

1. Create an account in [https://infura.io](https://infura.io/)
2. Create .env file in Ethereum directory and add these line to it.
   > mnemonic = 'Your mnemonic code' <br>
   > link = 'Your infura end point link '
3. Do the Changes that you want to do inside the Solidity File
4. Compile the Contract
   `node compile.js`
5. Deploy Contract by going into smart-contract Directory and run.
   `node deploy.js`

   Copy the contract deploy address and replace it in factory.js file.

6. Replace your "infura end point link" in web3.js file

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

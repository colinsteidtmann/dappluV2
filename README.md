# Dapplu
### Letting brands make decentralized smart contracts with content creators for sponsored content and embedded advertisements.
<p align="center">
   <a target="_blank" href="client/src/images/logo.png">
    <img src="client/src/images/logo.png" alt="dapplu logo" width="15%" />
   </a>
</p>

---

When content creators don't want to use Google AdSense and they instead want to partner directly with the brand, they rely on static contracts that pay them based on their historical average content engagement numbers. However, this poses a problem. Let's say that a YouTuber partnered with Squarespace to mention their brand in a video, and the YouTuber had only 15,000 subscribers at the time of the partnership and was averaging 10k views per video. But then, three years later, that YouTuber's channel blew up and that video with the Squarespace mention now has millions of views. Yet, Squarespace paid the Youtuber a _lump sum three years ago_ so the YouTuber will miss out on tons of well deserved ad revenue. This problem presents itself anywhere that sponsored content is used (think — tv shows, news articles, TikTok videos, Instagram posts, YouTube videos, Spotify podcasts, movies, etc). Brands also sometimes get the short end of the stick if the content creator they partnered with published a dud piece of media. If only sponsored content contracts could be more dynamic and brands could pay influencers or content creators in a smarter way. 

...

_Introducing Dapplu_ — Dapplu lets brands make smart contracts with content creators. Only YouTube videos are supported at the moment. Brands set a deadline, pay per view amount, budget, and can upload an optional legally binding written agreement. Content creators respond by uploading their YouTube video tag. The smart contracts automatically pay the creator for their YouTube video views. The creator can't earn more than the contracts budget amount. When the contract's deadline comes, it stops automatically updating itself and stops paying the content creator for new video views. The creator can withdraw their payments anytime. By default, the contracts store its funds in ethereum, however, if the brand and/or content creator are worried about volatile ethereum prices, then they can choose to convert and store the contract's funds in a stablecoin like Dai, Tether, or USDC (which are pegged to the U.S. dollar). 

## Live site (kovan network)
https://dapplu.com/

## Demo video

<p align="center">
   <a target="_blank" href="https://www.youtube.com/watch?v=YsyupdrMm6s">
    <img src="client/src/images/dappluVideo.png" alt="YouTube thumbnail"/>
   </a>
</p>

## Architecture diagram
<p align="center">
   <a target="_blank" href="client/src/images/architecture.png">
	<img src="client/src/images/architecture.png" alt="architecture" width="80%"/>
   </a>
</p>

## Installation and Deploy

Compile and deploy the smart contracts. For deploying to the kovan network, Truffle will use truffle-hdwallet-provider for your mnemonic and an RPC URL. Set your environment variables $RPC_URL and $MNEMONIC before running:

```bash
# in Dapplu's home folder, install dependencies
npm install

# compile contracts
truffle compile

# migrate contracts
truffle migrate --reset --network kovan
```

Next, install dependencies for the front end and launch the web app. (More specifics in client folder's README.md)
```bash
cd client

# in Dapplu's client folder, install dependencies
yarn install

# start web app on http://localhost:3000/
yarn start
```
Make sure you have Metamask and are using Kovan testnet. Then you should be good to go!

## What's next for Dapplu
- Get some users! 
- Make it easier for users to pay (let them use credit cards, don't require Metamask).
- Get product feedback.
- Deploy to the mainnet. 
- Add support for Spotify, Instagram, Facebook, TikTok, and news articles. 
- Add different content engagement metrics that brands could use to pay creators
- Improve ENS integration (store ENS names rather than the resolved addresses). 
- Find cheaper ways to deploy and run the smart contracts (less gas fees).
- Check out security and definitely improve it.
- Fix never ending bugs.
- Improve the user experience and education. 

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Authors and acknowledgment
[LinkRiver](https://linkriver.io/) for their big efforts trying to get my external adapter to work.

Contract code inspired by [Link my Ride](https://github.com/pappas999/Link-My-Ride) (by @pappas999)



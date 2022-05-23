import web3 from "web3";

import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	"0x5433904440c462DF3DB80b20cdC3E35fEcA4424f"
);

export default instance;

const assert = require("assert");
const ganach = require("ganache-cli");
const Web3 = require("web3"); //becasause its contructor function
const web3 = new Web3(ganach.provider());

const compiledCampaignFactory = require("../src/ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../src/ethereum/build/Campaign.json");

let accounts;
let factoryUnderTest;
let campaignAddress;
let campaignUnderTest;

beforeEach(async () => {
  //Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  factoryUnderTest = await new web3.eth.Contract(
    JSON.parse(compiledCampaignFactory.interface)
  )
    .deploy({ data: compiledCampaignFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });
  //create the campaign that we will use in line 33
  await factoryUnderTest.methods
    .createCampaign("100")
    .send({ from: accounts[0], gas: "1000000" });

  //assigns the first element of the array to this
  [campaignAddress] = await factoryUnderTest.methods
    .getDeployedCampaigns()
    .call();

  //no need to do the same becasue we are using it from factory rather than deploying it
  campaignUnderTest = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});

describe("Campaigns", () => {
  it("deployes a factory and a campaign", () => {
    assert.ok(factoryUnderTest.options.address);
    assert.ok(campaignUnderTest.options.address);
  });
});


pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign{
    
    struct Request{
         string description;
         uint amount;
         address recipient;
         bool complete;
         mapping(address=>bool) approvals;
         uint approvalCount;
         
     }
     
    //is the person who deployed the initiated the contract
   address public manager;
   
   //necessary to make sure you have diffrent treshhold of contribution base don the project
   uint public minimumContrbution ;
   
   //list of people who contributed to the project
   mapping(address=>bool) public approvers;
   
    //As mappings don't allow reading their length we need to keep track of it with a counter
   uint public approversCount ;
   
   //list of all requestes created in the contract
   Request[] public requests ;
   
     
    constructor (uint minimum) public {
        minimumContrbution = minimum;
        manager = msg.sender;
    }
    
    // if uou want to access to mesage value you need to state it spayable which is the amoutn of ether sent in the trns
    function contribute() public payable {
        require(msg.value > minimumContrbution);
        approvers[msg.sender]=true;
        approversCount++;
    }
    
     function createRequest( string description, uint amount, address recipient) public onlyManagerCanCall {
         //custom loacl variables must explicily get decalred as in memory and not storage, case of struct
        Request memory request=Request({
            description:description,
            amount:amount,
            recipient:recipient,
            complete:false,
            approvalCount:0
        });
        requests.push(request);
        

    }
    
    function approveRequest(uint requestIndex) public  {
        //first check if this person has the right to vote, must be in the map of approvers (people who contributed)
        require(approvers[msg.sender]);
        
        //use storage so we can point to the refrence not a copy
        Request storage request=requests[requestIndex];
        
        //check if this person haven't voted before
        require(!request.approvals[msg.sender]);
        
        //add a person to approvers
        request.approvals[msg.sender]=true;
        
        //increment teh approval count of teh request
        request.approvalCount++;
        
    }
    
    function finalizeRequest(uint requestIndex ) public  onlyManagerCanCall {
      Request storage request=requests[requestIndex];
      
      //make sure the requets is not already completed
      require(!request.complete);
      
      //make sure at 50% of contributors have approved
      require(request.approvalCount> (approversCount/2));
  
      
      request.complete=true;
      
      request.recipient.transfer(request.amount);
      
    }
    
     modifier onlyManagerCanCall() {
        require(msg.sender == manager);
        _;
    }

}
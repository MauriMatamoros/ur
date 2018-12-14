pragma solidity ^0.4.17;

contract CardFactory {
    // Anyone can create. Set server as owner
    address[] public deployedCards;
    mapping (string => address) idToAddress;
    
    function createCard(uint cardPrice, string cardId) public returns(address) {
        address newCard = new Card(cardPrice, cardId, msg.sender);
        deployedCards.push(newCard);
        idToAddress[cardId] = newCard;
        return newCard;
    }
    
    function getDeployedCards() public view returns(address[]) {
        return deployedCards;
    }
    
    function getCardAddress(string _id) public view returns(address) {
        return idToAddress[_id];
    }
}

contract Card {
    address public owner;
    string public id;
    string public userId;
    uint public price;
    bool public forTrade = true;
    
    modifier restricted() {
        require(msg.sender == owner, "You are not the owner.");
        _;
    }
    
    constructor(uint cardPrice, string cardId, address creator) public {
        owner = creator;
        id = cardId;
        price = cardPrice;
    }
    
    function buy(string user) public payable {
        require(forTrade, "Card is not open for trade.");
        forTrade = false;
        owner = msg.sender;
        userId = user;
    }
    
    function setForTrade() public restricted {
        forTrade = true;
    }
    
    function removeFromTrade() public restricted {
        forTrade = false;
    }
    
    function getSummary() public view returns (string, string) {
        return (
            id,
            userId
        );
    }
}
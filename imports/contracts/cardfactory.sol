pragma solidity ^0.4.17;

import "./ownable.sol";
import "./safemath.sol";

contract CardFactory is Ownable {

    using SafeMath for uint256;

    string[] public cards;

    mapping (uint => address) public cardToOwner;
    mapping (address => uint) ownerCardCount;
    
    uint tradeFee = 0.01 ether;

    function _createCard(string _id) internal {
        uint id = cards.push(_id) - 1;
        cardToOwner[id] = msg.sender;
        ownerZombieCount[msg.sender]++;
    }
    
    modifier onlyOwnerOf(uint _cardId) {
        require(msg.sender == cardToOwner[_cardId]);
        _;
    }
    
    function withdraw() external onlyOwner {
        owner.transfer(this.balance);
    }
    
    function setTradeFee(uint _fee) external onlyOwner {
        tradeFee = _fee;
    }
    
    function getCardsByOwner(address _owner) external view returns(uint[]) {
        uint[] memory result = new string[](ownerCardCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < cards.length; i++) {
            if (cardToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }
}
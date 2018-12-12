pragma solidity ^0.4.17;

import "./cardfactory.sol";
import "./erc721.sol";
import "./safemath.sol";

contract CardOwnership is CardFactory, ERC721 {
    using SafeMath for uint256;

    mapping (uint => address) cardApprovals;
    
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerCardCount[_owner];
    }
    
    function ownerOf(uint256 _tokenId) public view returns (address _owner) {
        return cardToOwner[_tokenId];
    }
    
    function _transfer(address _from, address _to, uint256 _tokenId) private {
        ownerCardCount[_to] = ownerCardCount[_to].add(1);
        ownerCardCount[msg.sender] = ownerCardCount[msg.sender].sub(1);
        cardToOwner[_tokenId] = _to;
        Transfer(_from, _to, _tokenId);
    }
    
    function transfer(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
        _transfer(msg.sender, _to, _tokenId);
    }
    
    function approve(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
        cardApprovals[_tokenId] = _to;
        Approval(msg.sender, _to, _tokenId);
    }
    
    function takeOwnership(uint256 _tokenId) public {
        require(cardApprovals[_tokenId] == msg.sender);
        address owner = ownerOf(_tokenId);
        _transfer(owner, msg.sender, _tokenId);
    }
    
    /* TODO */
    function setForSale(uint256 _tokenId) external onlyOwnerOf(_tokenId) {
        address owner = ownerOf(_tokenId);
    
        require(isValidToken(_tokenId));
        require(owner == msg.sender || authorized[owner][msg.sender]);
    
        allowance[_tokenId] = address(this);
        tokensForSale.push(_tokenId);
        // set the sale price etc
    
        emit Approval(owner, address(this), _tokenId);
    }
    
    function buy(uint256 _tokenId) external payable {
        address buyer = msg.sender;
        uint payedPrice = msg.value;
    
        require(isValidToken(_tokenId));
        require(getApproved(_tokenId) == address(this));
        // require payedPrice >= salePrice
    
        // pay the seller
        // remove token from tokensForSale
    
        transferFrom(ownerOf(_tokenId), buyer, _tokenId);
    }
}
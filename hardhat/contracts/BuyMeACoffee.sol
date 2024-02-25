//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BuyMeACoffee {
    // This Event will be emitted when a new memo is created
    event NewMemo(
        string indexed name,
        string message,
        address creator,
        uint256 timestamp,
        uint8 coffType,
        uint8 coffSize
    );

    // The owner of contract deployer
    address payable owner;

    // The dontation price
    uint256 public price = 0.001 ether;
    // This struct will be used to create a new memo
    struct Memo {
        string name;
        string message;
        address creator;
        uint256 timestamp;
        uint8 coffType;
        uint8 coffSize;
        
    }
    // An array of type Memo[] that stores all the memos in this contract
    Memo[] memos;

    constructor() {
        owner = payable(msg.sender);
    }

    /**
     * @dev buy a coffe for contract owner
     * @param _name name of the the coffee buyer
     * @param _message message for the coffee buyer
     */
    function buyCoffee(
        string memory _name,
        string memory _message,
        uint8 _coffType,
        uint8 _coffSize
    ) public payable {
        require(msg.value > 0, "Insufficient amount");
        require(_coffType >= 0 && _coffSize >= 0, "Invalid coffee type or size");
        require(_coffType<4 && _coffSize<4, "Invalid coffee type or size");
        
        // Add the new memo to the array of memos
        memos.push(Memo(_name, _message, msg.sender, block.timestamp,_coffType,_coffSize));

        // Emit the NewMemo event
        emit NewMemo(_name, _message, msg.sender, block.timestamp,_coffType,_coffSize);
    }

    /**
     * @dev send the entire balance stored in this contract to the owner
     */
    function withdrawTips() public onlyOwner {
        owner.transfer(address(this).balance);
    }

    /**
     * @dev change donatiton amount
     * @param _price new price
     */
    function changePrice(uint256 _price) public onlyOwner {
        price = _price;
    }

    /**
     * @dev retrieve all the memos in this contract
     */
    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }

    // Modifier for only owner of the contract
    modifier onlyOwner() {
        require(msg.sender == owner, "You aren't the owner");
        _;
    }
}

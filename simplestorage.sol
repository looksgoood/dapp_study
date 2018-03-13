pragma solidity ^0.4.0; 

contract SimpleStorage {

    uint public storedData;

    function set(uint x) public {
        storedData = x;
    }

    function get() public constant returns (uint) {
        return storedData;
    }
}
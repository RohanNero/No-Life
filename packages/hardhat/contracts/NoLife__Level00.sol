//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";


error NoLife__Level00__IncorrectEncoding();

/**
 * @title No-Life Level 00
 * @author Rohan Nero
 * @notice this is the first level in the No-Life game
 * @dev encoding functions prefaced with "encode" while decoding ones are prefaced with "decode"
 */
   contract NoLife__Level00  {

    address public owner;
    // This variable is used to track which function you are encoding/decoding 
    // The frontend button will pass this as the argument to the `submitAnswer` function
    uint public counter; 

    // Constructor: Called once on contract deployment
    // Check packages/hardhat/deploy/00_deploy_your_contract.ts
    constructor(address _owner) {
        owner = _owner;
    }

    // Modifier: used to define a set of rules that must be met before or after a function is executed
    // Check the withdraw() function
    modifier onlyOwner() {
        // msg.sender: predefined variable that represents address of the account that called the current function
        require(msg.sender == owner, "Not the Owner");
        _;
    }
    function decode__doctorMorris(bytes32 answer) public onlyOwner {
        if(answer == this.decode__doctorMorris.selector) {
            counter++;
        } //else {
            //revert NoLife__Level00__IncorrectInput();
        //}
    }
    


    /**@notice this function is called when players fire their `CODING RAY` while set to encode */
    function encode(bytes memory answer, uint count) public onlyOwner {
        if(count == 0 /*&& answer == this.decode__doctorMorris */) {
            counter++;
        } 




        revert NoLife__Level00__IncorrectEncoding();
    }
    
    /**@notice this function is called when players fire their `CODING RAY` while set to decode */
    function decode(bytes memory answer, uint count) public onlyOwner {
        if(count == 0/* && answer*/ ) {

        }
    }
}

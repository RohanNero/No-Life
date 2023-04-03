//SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

// likely will set level addresses in constructor so that they arent hard-coded in 
// but instead stored as private variables so they can only be viewed by looking at the contract storage

error CodingRay__BlastFailed(bytes data);

contract CodingRay {

    bytes public currentData;

    /**@notice this function fires your CodingRay based upon the player's input
     * @dev `blast` calls different Levels with calldata to  */
    function blast(address target, bytes memory data) public {
        (bool sent, bytes memory callData) = target.call(data);
       if(!sent) {
        revert CodingRay__BlastFailed(data);
       }
       currentData = callData;
    }
}
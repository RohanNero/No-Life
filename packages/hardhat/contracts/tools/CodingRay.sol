//SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

// likely will set level addresses in constructor so that they arent hard-coded in 
// but instead stored as private variables so they can only be viewed by looking at the contract storage

error CodingRay__BlastFailed(bytes data);

contract CodingRay {

    bytes public currentData;

    event CodingRay__ZeroDamage();
    event CodingRay__DirectHit();

    /**@notice this function fires your CodingRay based upon the player's input
     * @dev `blast` calls different Levels with calldata to  */
    function blast(address target, bytes memory data) public {
        bytes memory callValue = abi.encodeWithSignature("countMap(address)",msg.sender);
        (bool sent1, bytes memory firstScoreCheck) = target.call(callValue);
       if(!sent1) {
        revert CodingRay__BlastFailed(data);
       }
        (bool sent2, bytes memory callData) = target.call(data);
       if(!sent2) {
        revert CodingRay__BlastFailed(data);
       }
       (bool sent3, bytes memory lastScoreCheck) = target.call(callValue);
       if(!sent3) {
        revert CodingRay__BlastFailed(data);
       }
       uint firstScore = abi.decode(firstScoreCheck, (uint));
       uint lastScore = abi.decode(lastScoreCheck, (uint));

       if(firstScore >= lastScore) {
        emit CodingRay__ZeroDamage();
       } else {
        emit CodingRay__DirectHit();
       }
       currentData = callData;
    }
}
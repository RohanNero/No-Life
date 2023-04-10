//SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

error CodingRay__BlastFailed(bytes data);

/**@title Coding Ray
 * @author Rohan Nero
 * @notice a powerful tool in the right hands
 * @dev this contract was created as part of an educational game about ABI encoding called No-Life */
contract CodingRay {

    bytes public currentData;

    event CodingRay__ZeroDamage();
    event CodingRay__DirectHit();

    /**@notice this function fires your CodingRay based upon the player's input
     * @dev `blast` calls different Level contracts with
     * @param target the contract address to call
     * @param data bytes to pass with your call  */
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
       
       /**@notice every Level has a mapping that tracks players scores
        * @dev we check and see if it was incremented to determine the outcome of your call
        * @dev doesnt use return data because fallback functions don't return anything */
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
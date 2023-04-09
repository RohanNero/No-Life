//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

error Level01__AlreadyPassed(uint count, uint problemId);

/**@title Level 01
 * @author Rohan Nero
 * @notice this level doesn't show the player directly how encoding works, but instead allows them to play with it a little first */
contract Level01 {

    ///**@notice every Level contract has a `count` variable that represents what problem the player is currently on */
    //uint public count;

    /**@notice every Level contract has a `count` variable that represents what problem the player is currently on 
     * @dev player's address => count representing which problem they are on*/
    mapping(address => uint) public countMap;

    /**@notice The Problem's solutions, passed inside the constructor */
    bytes private _secondEnemy;
    bytes private _wizardDoctors;
    bytes private _fourthLockedDoor;
    bytes private _fifthLockedDoor; 
    bytes private _thirdEnemy;
    bytes private _fourthEnemy;
    bytes private _sixthLockedDoor;
    
    /**@notice emitted when provided incorrect calldata */
    event Level00__ZeroDamage();

    /**@notice only the fallback function can call this 
     * @dev msg.sender must equal this address */
    modifier onlyFallback() {
        require(msg.sender == address(this));
        _;
    }

    /**@notice this requires that players interact with the problem they are on
     * @dev ensures that the `count` variable is equal to the function's problemId */
    modifier playTheRules(uint _count, uint problemId) {
        require(_count == problemId);
        _;
    }

    /**@notice values need to be passed to the contract for */
    constructor(bytes memory drMorris, bytes memory drKeller, bytes memory fusedDoctor, bytes memory lockedDoor, bytes memory lockedDoor2, bytes memory enemy, bytes memory lockedDoor3 ) {
        _secondEnemy = drMorris;
        _wizardDoctors = drKeller;
        _fourthLockedDoor = fusedDoctor;
        _fifthLockedDoor = lockedDoor;
        _thirdEnemy = lockedDoor2;
        _fourthEnemy = enemy;
        _sixthLockedDoor = lockedDoor3;
        countMap[tx.origin] = 0;
    }

    /**@notice this function handles calls to the contract that don't have function selectors
     * @dev such as `abi.encode(Packed)` values */
    fallback() external {
        if(keccak256(msg.data) == keccak256(_secondEnemy)) {
            this.secondEnemy();
        } else if(keccak256(msg.data) == keccak256(_wizardDoctors)) {
            this.wizardDoctors();
        } else if(keccak256(msg.data) == keccak256(_fourthLockedDoor)) {
            this.fourthLockedDoor();
        } else if(keccak256(msg.data) == keccak256(_fifthLockedDoor)) {
            this.fifthLockedDoor();
        } else if(keccak256(msg.data) == keccak256(_thirdEnemy)) {
            this.thirdEnemy();
        } else if(keccak256(msg.data) == keccak256(_fourthEnemy)) {
            this.fourthEnemy();
        } else if(keccak256(msg.data) == keccak256(_sixthLockedDoor)) {
            this.sixthLockedDoor();
        } else {
            emit Level00__ZeroDamage();
        }
    }



    /** ------------------------------------------ 
                    Main Functions / Problems
        ------------------------------------------ 
        * Functions are numbered for organization and once a function is called with the correct input,
        * it cannot be called again. 
        * Wherever you see `count = x`, that means the level is solved!
        */



    /**@notice the first person to save! (problem to solve)
     * @dev the fallback function calls this
     * @dev all problems increment the count by one */
    function secondEnemy() external onlyFallback playTheRules(countMap[tx.origin], 0) {
        countMap[tx.origin] = 1; // more secure than `count++`
    }


    /**@notice the second problem to solve
     * @dev  */
    function wizardDoctors() external onlyFallback playTheRules(countMap[tx.origin], 1) {
        countMap[tx.origin] = 2;
       
    }

    /**@notice the second problem to solve
     * @dev  */
    function fourthLockedDoor() external playTheRules(countMap[tx.origin], 2) {
        countMap[tx.origin] = 3;
    }

    /**@notice the second problem to solve
     * @dev  */
    function fifthLockedDoor() external playTheRules(countMap[tx.origin], 3) {
        countMap[tx.origin] = 4;
    }

    /**@notice the second problem to solve
     * @dev  */
    function thirdEnemy() external playTheRules(countMap[tx.origin], 4) {
        countMap[tx.origin] = 5;
    }

    /**@notice the first enemy to defeat (our version of a headcrab: `angryferris`; our version of a zombie is `rustdev`)
     * @dev player will have x seconds to input correct input or they "lose", (same as first two problems except risk of losing) */
    function fourthEnemy() external playTheRules(countMap[tx.origin], 5) {
        countMap[tx.origin] = 6;
    }

    /**@notice the third door and final problem of Level 00
     * @dev this door requires players to encode 3 strings in alphabetical order */
    function sixthLockedDoor () external playTheRules(countMap[tx.origin], 6) {
        countMap[tx.origin] = 7;
    }

    /** Helper functions */

    /**@notice this function resets the level for the caller 
     * @notice (Start is capitalized because this is also used for players to start the game)
     * @dev sets the `count` for msg.sender to 0 in the countMap mapping */
     function reStart() public {
        countMap[tx.origin] = 0;
     }
    
    /**@notice this function returns this contract's address */
    function viewAddress() public view returns(address) {
        return address(this);
    }
}

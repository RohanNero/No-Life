//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

error Level02__AlreadyPassed(uint count, uint problemId);

/**@title Level 02
 * @author Rohan Nero
 * @notice this level doesn't show the player directly how encoding works, but instead allows them to play with it a little first */
contract Level02 {

    ///**@notice every Level contract has a `count` variable that represents what problem the player is currently on */
    //uint public count;

    /**@notice every Level contract has a `count` variable that represents what problem the player is currently on 
     * @dev player's address => count representing which problem they are on*/
    mapping(address => uint) public countMap;

    /**@notice The Problem's solutions, passed inside the constructor */
    bytes private _drMorris;
    bytes private _drKeller;
    bytes private _fusedDoctors;
    bytes private _lockedDoor; 
    bytes private _secondLockedDoor;
    bytes private _firstEnemy;
    bytes private _thirdLockedDoor;
    
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
        _drMorris = drMorris;
        _drKeller = drKeller;
        _fusedDoctors = fusedDoctor;
        _lockedDoor = lockedDoor;
        _secondLockedDoor = lockedDoor2;
        _firstEnemy = enemy;
        _thirdLockedDoor = lockedDoor3;
        countMap[tx.origin] = 0;
    }

    /**@notice this function handles calls to the contract that don't have function selectors
     * @dev such as `abi.encode(Packed)` values */
    fallback() external {
        if(keccak256(msg.data) == keccak256(_drMorris)) {
            this.Doctor();
        } else if(keccak256(msg.data) == keccak256(_drKeller)) {
            this.one();
        } else if(keccak256(msg.data) == keccak256(_fusedDoctors)) {
            this.two();
        } else if(keccak256(msg.data) == keccak256(_lockedDoor)) {
            this.three();
        } else if(keccak256(msg.data) == keccak256(_secondLockedDoor)) {
            this.four();
        } else if(keccak256(msg.data) == keccak256(_firstEnemy)) {
            this.five();
        } else if(keccak256(msg.data) == keccak256(_thirdLockedDoor)) {
            this.six();
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



    /**@notice the first problem to solve
     * @dev the fallback function calls this
     * @dev all problems increment the count by one */
    function Doctor() external onlyFallback playTheRules(countMap[msg.sender], 0) {
        countMap[msg.sender] = 1; // more secure than `count++`
    }


    /**@notice the second problem to solve
     * @dev  */
    function one() external onlyFallback playTheRules(countMap[msg.sender], 1) {
        countMap[msg.sender] = 2;
       
    }

    /**@notice the second problem to solve
     * @dev  */
    function two() external playTheRules(countMap[msg.sender], 2) {
        countMap[msg.sender] = 3;
    }

    /**@notice the second problem to solve
     * @dev  */
    function three() external playTheRules(countMap[msg.sender], 3) {
        countMap[msg.sender] = 4;
    }

    /**@notice the second problem to solve
     * @dev  */
    function four() external playTheRules(countMap[msg.sender], 4) {
        countMap[msg.sender] = 5;
    }

    /**@notice the first enemy to defeat (our version of a headcrab: `angryferris`; our version of a zombie is `rustdev`)
     * @dev player will have x seconds to input correct input or they "lose", (same as first two problems except risk of losing) */
    function five() external playTheRules(countMap[msg.sender], 5) {
        countMap[msg.sender] = 6;
    }

    /**@notice the third door and final problem of Level 00
     * @dev this door requires players to encode 3 strings in alphabetical order */
    function six () external playTheRules(countMap[msg.sender], 6) {
        countMap[msg.sender] = 7;
    }

    /** Helper functions */

    /**@notice this function resets the level for the caller
     * @dev sets the `count` for msg.sender to 0 in the countMap mapping */
     function restart() public {
        delete countMap[msg.sender];
     }

    /**@notice this function returns this contract's address */
    function viewAddress() public view returns(address) {
        return address(this);
    }
}

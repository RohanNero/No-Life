//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

error Level00__AlreadyPassed(uint count, uint problemId);

/**@title Level 00
 * @author Rohan Nero
 * @notice this level doesn't show the player directly how encoding works, but instead allows them to play with it a little first */
contract Level00 {

    string _name;
    uint public x;

    /**@notice every Level contract has a `count` variable that represents what problem the player is currently on */
    uint public count;


    /**@notice The Problem's solutions, passed inside the constructor */
    bytes private _drMorris;
    bytes private _drKeller;
    bytes private _fusedDoctors;
    bytes private _lockedDoor; 
    

    /**@notice emitted when provided incorrect calldata */
    event Level00__ZeroDamage();

    modifier onlyFallback() {
        require(msg.sender != address(this));
        _;
    }

    modifier playTheRules(uint _count, uint problemId) {
        require(count == problemId);
        _;
    }

    /**@notice values need to be passed to the contract for */
    constructor(bytes memory drMorris, bytes memory drKeller, bytes memory fusedDoctor, bytes memory lockedDoor ) {
        _drMorris = drMorris;
        _drKeller = drKeller;
        _fusedDoctors = fusedDoctor;
        _lockedDoor = lockedDoor;
    }

    /**@notice this function handles calls to the contract that don't have function selectors
     * @dev such as `abi.encode(Packed)` values */
    fallback() external {
        if(keccak256(msg.data) == keccak256(_drMorris)) {
            this.doctorMorris();
        } else if(keccak256(msg.data) == keccak256(_drKeller)) {
            this.doctorKeller();
        } else if(keccak256(msg.data) == keccak256(_fusedDoctors)) {
            this.fusedDoctors();
        } else if(keccak256(msg.data) == keccak256(_lockedDoor)) {
            this.firstLockedDoor();
        } 
        
        else {
            emit Level00__ZeroDamage();
        }
    }



    /** ------------------------------------------ 
                    Main Functions
        ------------------------------------------ 
        * Functions are numbered for organization and once a function is called with the correct input,
        * it cannot be called again. 
        * Wherever you see `count = x`, that means the level is solved!
        */



    /**@notice the first person to save! (problem to solve)
     * @dev the fallback function calls this
     * @dev all problems increment the count by one */
    function doctorMorris() external onlyFallback playTheRules(count, 0) {
        count = 1; // more secure than `count++`
    }


    /**@notice the second problem to solve
     * @dev  */
    function doctorKeller() external onlyFallback playTheRules(count, 1) {
        count = 2;
       
    }

    /**@notice the second problem to solve
     * @dev  */
    function fusedDoctors() external playTheRules(count, 2) {
        count = 3;
    }

    /**@notice the second problem to solve
     * @dev  */
    function firstLockedDoor() external playTheRules(count, 3) {
        count = 4;
    }
    
    /**@notice the second problem to solve
     * @dev  */
    function secondLockedDoor() external playTheRules(count, 4) {
        count = 5;
    }
}

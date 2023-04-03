//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

error Level00__AlreadyPassed(uint count, uint problemId);

contract Level00 {

    string _name;
    uint public x;

    /**@notice every Level contract has a `count` variable that represents what problem the player is currently on */
    uint public count;


    /**@notice The Problem's solutions, passed inside the constructor */
    bytes public DrMorris;
    bytes public DrTom;
    

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
    constructor(bytes memory drMorris, bytes memory drTom ) {
        DrMorris = drMorris;
        DrTom = drTom;
    }

    /**@notice this function handles calls to the contract that don't have function selectors
     * @dev such as `abi.encode(Packed)` values */
    fallback() external {
        if(keccak256(msg.data) == keccak256(DrMorris)) {
            this.DoctorMorris();
        } else if(keccak256(msg.data) == keccak256(DrTom)) {

        } else {
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
    function DoctorMorris() external onlyFallback playTheRules(count, 0) {
        count = 1; // more secure than `count++`
    }


    /**@notice the second problem to solve
     * @dev  */
    function DoctorTom() external playTheRules(count, 1) {
        count = 2;
       
    }

    /**@notice the second problem to solve
     * @dev  */
    function Problem3() external playTheRules(count, 2) {
        count = 3;
    }

    /**@notice the second problem to solve
     * @dev  */
    function Problem4() external playTheRules(count, 3) {
        count = 4;
    }
}

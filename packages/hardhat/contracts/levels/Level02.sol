//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

error LEVEL02__AlreadyPassed(uint count, uint problemId);

contract Level2 {

    string _name;
    uint public x;
    uint public count;


    /**@notice The Problems */
    bytes public z;
    bytes public y;
    

    /**@notice emitted when provided incorrect calldata */
    event LEVEL02__ZeroDamage();

    modifier onlyFallback() {
        require(msg.sender != address(this));
        _;
    }

    /**@notice values need to be passed to the contract for */
    constructor(bytes memory drMorris, bytes memory drTom ) {
        z = drMorris;
        y = drTom;
    }

    /**@notice this function handles calls to the contract that don't have function selectors
     * @dev such as `abi.encode(Packed)` values */
    fallback() external {
        if(keccak256(msg.data) == keccak256(z)) {
            x = 7;
        } else if(keccak256(msg.data) == keccak256(y)) {

        } else {
            emit LEVEL02__ZeroDamage();
        }
    }



    /** ------------------------------------------ 
                    Main Functions
        ------------------------------------------ 
        * Functions are numbered for organization and once a function is called with the correct input,
        * it cannot be called again. 
        * Wherever you see `count++`, that means the level is solved!
        */



    /**@notice the first person to save! (problem to solve)
     * @dev the fallback function calls this */
    function DoctorMorris() external onlyFallback{
        uint problemId = 0;
        if(count > 0) {
            revert LEVEL02__AlreadyPassed(count, problemId);
        }
        count++;
    }

    function DoctorTom(string memory name, uint age) external {
        _name = name;
        x = age;
    }
}

//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

error Level00__AlreadyPassed(uint count, uint problemId);

contract Level00 {

    string _name;
    uint public x;
    uint public count;


    /**@notice The Problems */
    bytes public DrMorris;
    bytes public DrTom;
    

    /**@notice emitted when provided incorrect calldata */
    event Level00__ZeroDamage();

    modifier onlyFallback() {
        require(msg.sender != address(this));
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
            x = 7;
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
        * Wherever you see `count++`, that means the level is solved!
        */



    /**@notice the first person to save! (problem to solve)
     * @dev the fallback function calls this */
    function DoctorMorris() external onlyFallback{
        uint problemId = 0;
        if(count > 0) {
            revert Level00__AlreadyPassed(count, problemId);
        }
        count++;
    }

    function DoctorTom(string memory name, uint age) external {
        _name = name;
        x = age;
    }
}

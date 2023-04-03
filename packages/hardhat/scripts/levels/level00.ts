// "CODING GUN/RAY" scripts will be in the `levels` folder.
// These `levelXY` scripts are interacted with by the frontend buttons and then these scripts interact with the smart contracts,
// this way we can compare strings with `==`
// 1. if `input` == `expectedInput` then call the solidity function, otherwise `console.log("Incorrect Input!);`
// this way the contract won't just revert if the player inputs wrong information

// Counter variable controls what function is called when CODING RAY is fired.
// Script isn't needed since we can compare hash of strings in solidity
// for example:
//                  function compareStrings(string memory a, string memory b) public pure returns (bool) {
//                      return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
//                  }
// inside of each Level contract, we will need to set the answers as private variables in constructor
// , this means that the deploy script for starting the game will be long and contain a lot of args to pass.

// I think both ways are possible but I may prefer to use a js/ts script so that we can include try catch with specific error msg
// but including a try/catch inside the codingRay's function may suffice. just will have a blanket custom error message

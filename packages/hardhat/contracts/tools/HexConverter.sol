//SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract HexConverter {

    //---------------------------------------------------------------------------
    // ENCODING
    //---------------------------------------------------------------------------


    function encodeString(string memory strInput) public pure returns(bytes memory data){
        data = abi.encode(strInput);
    }

    function encodeStringUint(string memory strInput, uint uInput) public pure returns(bytes memory data) {
        data = abi.encode(strInput, uInput);
    }

    //---------------------------------------------------------------------------
    // DECODING
    //---------------------------------------------------------------------------

    function decodeString(bytes memory bytesData) public pure returns(string memory str) {
        str = abi.decode(bytesData,(string));
    }

    function decodeStringUint(bytes memory bytesData) public pure returns(string memory str, uint u) {
        (str,u) = abi.decode(bytesData,(string,uint));
    }
}
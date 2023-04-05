//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract HexConverter {

   /**@notice used to return decoded values */
   string[] private strArray;  
   uint[] private uArray;

    //---------------------------------------------------------------------------
    //                          ENCODING
    //---------------------------------------------------------------------------


    /**@notice this function encodes strings
     * @dev current max is 3 strings */
    function encodeString(string[] memory strInput) public pure returns(bytes memory data) {
       if(strInput.length == 1) {
           data = abi.encode(strInput[0]);
       } else if (strInput.length == 2) {
           data = abi.encode(strInput[0], strInput[1]);
       } else if (strInput.length == 3) {
           data = abi.encode(strInput[0], strInput[1], strInput[2]);
       }
    }

    /**@notice this function encodes strings and uints
     * @dev current max is 3 strings and 3 uints */
    function encodeStringUint(string[] memory strInput, uint[] memory uInput) public pure returns(bytes memory data) {
       if(strInput.length == 1 ) {
           if(uInput.length == 1) {
               data = abi.encode(strInput[0], uInput[0]);
           } else if(uInput.length == 2) {
               data = abi.encode(strInput[0], uInput[0], uInput[1]);
           } else if(uInput.length == 3) {
               data = abi.encode(strInput[0], uInput[0], uInput[1], uInput[2]);
           }
       } else if (strInput.length == 2 ) {
           if(uInput.length == 1) {
               data = abi.encode(strInput[0], strInput[1], uInput[0]);
           } else if(uInput.length == 2) {
               data = abi.encode(strInput[0], strInput[1], uInput[0], uInput[1]);
           } else if(uInput.length == 3) {
               data = abi.encode(strInput[0], strInput[1], uInput[0], uInput[1], uInput[2]);
           }
       } else if (strInput.length == 3 ) {
           if(uInput.length == 1) {
               data = abi.encode(strInput[0], strInput[1], strInput[2], uInput[0]);
           } else if(uInput.length == 2) {
               data = abi.encode(strInput[0], strInput[1], strInput[2], uInput[0], uInput[1]);
           } else if(uInput.length == 3) {
               data = abi.encode(strInput[0], strInput[1], strInput[2], uInput[0], uInput[1], uInput[2]);
           }
       }
    }

    /**@notice this function uses abi.encodePacked 
     * @dev encodePacked keeps only the essential data and is harder to decode*/
    function encodePacked(string memory strInput) public pure returns(bytes memory data) {
        data = abi.encodePacked(strInput);
    }

    /**@notice this function allows you to view any function selector by inputting the signature 
     * @dev example: "functionName(uint256)" */
    function viewSelector(string calldata _func) external pure returns (bytes4) {
        return bytes4(keccak256(bytes(_func)));
    }

    ///-----------------------------------------------------
    ///       abi.encodeWithSignature FUNCTIONS 
    ///-----------------------------------------------------
    

    /**@notice uses abi.encodeWithSignature to create encoding for a function call with up to 3 strings
     * @dev only works for functions that only take strings as input */
    function encodeStrSignature(string calldata func, string[] calldata strInput) public pure returns(bytes memory data) {
        if(strInput.length == 1) {
            data = abi.encodeWithSignature(func,strInput[0]); 
        } else if(strInput.length == 2) {
            data = abi.encodeWithSignature(func,strInput[0],strInput[1]); 
        } else if(strInput.length == 3) {
            data = abi.encodeWithSignature(func,strInput[0],strInput[1],strInput[2]); 
        } 
    }

    /**@notice uses abi.encodeWithSignature to create encoding for a function call with up to 3 strings and 3 uints
     *@dev only works for functions that take strings followed by uints as input */
    function encodeStrUintSignature(string calldata func, string[] calldata strInput, uint[] calldata uInput) public pure returns(bytes memory data) {
       if(strInput.length == 1 ) {
           if(uInput.length == 1) {
               data = abi.encodeWithSignature(func,strInput[0], uInput[0]);
           } else if(uInput.length == 2) {
               data = abi.encodeWithSignature(func,strInput[0], uInput[0], uInput[1]);
           } else if(uInput.length == 3) {
               data = abi.encodeWithSignature(func,strInput[0], uInput[0], uInput[1], uInput[2]);
           }
       } else if (strInput.length == 2 ) {
           if(uInput.length == 1) {
               data = abi.encodeWithSignature(func,strInput[0], strInput[1], uInput[0]);
           } else if(uInput.length == 2) {
               data = abi.encodeWithSignature(func,strInput[0], strInput[1], uInput[0], uInput[1]);
           } else if(uInput.length == 3) {
               data = abi.encodeWithSignature(func,strInput[0], strInput[1], uInput[0], uInput[1], uInput[2]);
           }
       } else if (strInput.length == 3 ) {
           if(uInput.length == 1) {
               data = abi.encodeWithSignature(func,strInput[0], strInput[1], strInput[2], uInput[0]);
           } else if(uInput.length == 2) {
               data = abi.encodeWithSignature(func,strInput[0], strInput[1], strInput[2], uInput[0], uInput[1]);
           } else if(uInput.length == 3) {
               data = abi.encodeWithSignature(func,strInput[0], strInput[1], strInput[2], uInput[0], uInput[1], uInput[2]);
           }
       }
    }

    ///-----------------------------------------------------
    ///        abi.encodeWithSelector FUNCTIONS 
    ///-----------------------------------------------------
    

    /**@notice uses abi.encodeWithSelector to create encoding for a function call with up to 3 strings
     * @dev only works for functions that only take strings as input */
    function encodeStrSelector(bytes4 func, string[] calldata strInput) public pure returns(bytes memory data) {
        if(strInput.length == 1) {
            data = abi.encodeWithSelector(func,strInput[0]); 
        } else if(strInput.length == 2) {
            data = abi.encodeWithSelector(func,strInput[0],strInput[1]); 
        } else if(strInput.length == 3) {
            data = abi.encodeWithSelector(func,strInput[0],strInput[1],strInput[2]); 
        } 
    }

    /**@notice uses abi.encodeWithSelector to create encoding for a function call with up to 3 strings and 3 uints
     *@dev only works for functions that take strings followed by uints as input */
    function encodeStrUintSelector(bytes4 func, string[] calldata strInput, uint[] calldata uInput) public pure returns(bytes memory data) {
       if(strInput.length == 1 ) {
           if(uInput.length == 1) {
               data = abi.encodeWithSelector(func,strInput[0], uInput[0]);
           } else if(uInput.length == 2) {
               data = abi.encodeWithSelector(func,strInput[0], uInput[0], uInput[1]);
           } else if(uInput.length == 3) {
               data = abi.encodeWithSelector(func,strInput[0], uInput[0], uInput[1], uInput[2]);
           }
       } else if (strInput.length == 2 ) {
           if(uInput.length == 1) {
               data = abi.encodeWithSelector(func,strInput[0], strInput[1], uInput[0]);
           } else if(uInput.length == 2) {
               data = abi.encodeWithSelector(func,strInput[0], strInput[1], uInput[0], uInput[1]);
           } else if(uInput.length == 3) {
               data = abi.encodeWithSelector(func,strInput[0], strInput[1], uInput[0], uInput[1], uInput[2]);
           }
       } else if (strInput.length == 3 ) {
           if(uInput.length == 1) {
               data = abi.encodeWithSelector(func,strInput[0], strInput[1], strInput[2], uInput[0]);
           } else if(uInput.length == 2) {
               data = abi.encodeWithSelector(func,strInput[0], strInput[1], strInput[2], uInput[0], uInput[1]);
           } else if(uInput.length == 3) {
               data = abi.encodeWithSelector(func,strInput[0], strInput[1], strInput[2], uInput[0], uInput[1], uInput[2]);
           }
       }
    }

    ///---------------------------------------------------------------------------
    ///                             DECODING
    ///---------------------------------------------------------------------------

  

    /**@notice this function decodes strings
     * @dev current max is 3 strings */
    function decodeString(bytes memory bytesData, uint numOfStrings) public returns(string[] memory returnStr) {
        delete strArray;
        if(numOfStrings == 1) {
            string memory str = abi.decode(bytesData,(string));
            strArray.push(str);
            returnStr = strArray;
        } else if(numOfStrings == 2) {
             (string memory str, string memory str2) =  abi.decode(bytesData, (string, string));
             strArray.push(str);
             strArray.push(str2);
             returnStr = strArray;
        } else if(numOfStrings == 3) {
             (string memory str, string memory str2, string memory str3) =  abi.decode(bytesData, (string, string, string));
             strArray.push(str);
             strArray.push(str2);
             strArray.push(str3);
             returnStr = strArray;
        }

        
    }

     /**@notice this function decodes strings
      * @dev current max is 3 strings */
    function decodeStringUint(bytes memory bytesData, uint numOfStrings, uint numOfUints) public returns(string[] memory returnStr, uint[] memory returnU) {
        delete strArray;
        delete uArray;
        if(numOfStrings == 1) {
            if(numOfUints == 1) {
               ( string memory str, uint u) = abi.decode(bytesData,(string, uint));
                strArray.push(str);
                uArray.push(u);
                returnStr = strArray;
                returnU = uArray;
            } else if(numOfUints == 2) {
                ( string memory str, uint u, uint u2) = abi.decode(bytesData,(string, uint, uint));
                strArray.push(str);
                uArray.push(u);
                uArray.push(u2);
                returnStr = strArray;
                returnU = uArray;
            } else if(numOfUints == 3) {
                ( string memory str, uint u, uint u2, uint u3) = abi.decode(bytesData,(string, uint, uint, uint));
                strArray.push(str);
                uArray.push(u);
                uArray.push(u2);
                uArray.push(u3);
                returnStr = strArray;
                returnU = uArray;
            } 
        } else if(numOfStrings == 2) {
            if(numOfUints == 1) {
               ( string memory str, string memory str2, uint u) = abi.decode(bytesData,(string,string, uint));
                strArray.push(str);
                strArray.push(str2);
                uArray.push(u);
                returnStr = strArray;
                returnU = uArray;
            } else if(numOfUints == 2) {
                ( string memory str, string memory str2, uint u, uint u2) = abi.decode(bytesData,(string,string, uint, uint));
                strArray.push(str);
                strArray.push(str2);
                uArray.push(u);
                uArray.push(u2);
                returnStr = strArray;
                returnU = uArray;
            } else if(numOfUints == 3) {
                ( string memory str, string memory str2, uint u, uint u2, uint u3) = abi.decode(bytesData,(string,string, uint, uint, uint));
                strArray.push(str);
                strArray.push(str2);
                uArray.push(u);
                uArray.push(u2);
                uArray.push(u3);
                returnStr = strArray;
                returnU = uArray;
            }
        } else if(numOfStrings == 3) {
            if(numOfUints == 1) {
               ( string memory str, string memory str2, string memory str3, uint u) = abi.decode(bytesData,(string, string,string, uint));
                strArray.push(str);
             strArray.push(str2);
             strArray.push(str3);
                uArray.push(u);
                returnStr = strArray;
                returnU = uArray;
            } else if(numOfUints == 2) {
                ( string memory str, string memory str2, string memory str3, uint u, uint u2) = abi.decode(bytesData,(string, string,string, uint, uint));
                strArray.push(str);
             strArray.push(str2);
             strArray.push(str3);
                uArray.push(u);
                uArray.push(u2);
                returnStr = strArray;
                returnU = uArray;
            } else if(numOfUints == 3) {
                ( string memory str, string memory str2, string memory str3, uint u, uint u2, uint u3) = abi.decode(bytesData,(string, string,string, uint, uint, uint));
                strArray.push(str);
             strArray.push(str2);
             strArray.push(str3);
                uArray.push(u);
                uArray.push(u2);
                uArray.push(u3);
                returnStr = strArray;
                returnU = uArray;
            }
        }

        
    }
    

}
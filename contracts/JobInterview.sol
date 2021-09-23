// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JobInterview {
    
    string public work = "Let's have a talk and meet each other. I'll love to work with you IOVLabs"; 
    
    function nextSteps() public view returns(string memory){
        return work;
    }

}
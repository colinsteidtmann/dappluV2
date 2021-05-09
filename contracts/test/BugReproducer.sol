//SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@chainlink/contracts/src/v0.6/interfaces/LinkTokenInterface.sol";

contract BugReproducer {
	LinkTokenInterface token;
	
	constructor(LinkTokenInterface _token) public {
		token = _token;
	}

	function getError() public {
		token.transferAndCall(0x0000000000000000000000000000000000000000, 10, '0x68656c6c6f');
	}						  
}
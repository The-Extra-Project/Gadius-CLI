// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "./IModicrum.sol";


interface IModicrumAdapter {

    struct georenderPointParams {
        string coordX;
        string CoordY;
        string username;
        string ipfsCID;
    }
    
    function runComputeJob(
        string memory entrypointParams,
        string calldata dockername
    ) external payable returns(uint256);

  
}

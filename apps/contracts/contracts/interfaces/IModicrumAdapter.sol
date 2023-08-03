// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "./IModicrum.sol";
interface IModicrumAdapter {
    struct georenderPointParams {
        string coordX;
        string CoordY;
        string username;
    }
    function runComputeJob(
        georenderPointParams memory entrypointParams,
        string calldata dockername
    ) external payable returns(uint256);

  
}

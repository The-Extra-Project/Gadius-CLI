// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import '@openzeppelin/contracts/access/AccessControl.sol';
import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IModicrum.sol";
import "../interfaces/IModicrumAdapter.sol";

/// @title Modicrium client adapter contract
/// @author Dhruv Malik
/// @notice this needs to be connected with wallet and cli integration for paying the job fees.
contract ModicrumContractAdapter is AccessControl, IModicrumAdapter {
    // its the address of modicrum contract on lillypad test.
    address  modicrumAddress = 0x422F325AA109A3038BDCb7B03Dd0331A4aC2cD1a;

    // corresponding to only certain address who can execute given job, to be better defined 
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");

    // modifier shouldHaveRole(
    //     bytes32 role,address callerAddress
    // ) {
    //     require(hasRole(VERIFIER_ROLE,msg.sender), "MODICRUM: only-authModule");
    //     _;
    // }
    event computeJobCompleted(uint jobId, address clientAddress);
    event computeJobStarted(uint jobId);
    constructor ()  {
        //grantRole(VERIFIER_ROLE, verifierAddress);

    }

    /// @notice runs the compute job with no preference for the mediator
    /// @dev here the entrypoint parameters are corresponding to the dockername="lxet/geocordinate"
    /// @param entrypointParams is the execution params of the given job
    /// @return the jobId which will be used for finding the state of the offer along with the
    function runComputeJob(
       IModicrumAdapter.georenderPointParams memory entrypointParams,
        string calldata dockername
    ) public payable returns (uint256) {
        string memory params = string(
            abi.encodePacked(
                entrypointParams.coordX,
                entrypointParams.CoordY,
                entrypointParams.username
            )
        );
        uint256 jobId = IModicrum(modicrumAddress).runModuleWithDefaultMediators(dockername, params);
        emit computeJobStarted(jobId);
        return jobId;
    }

    /// @dev Explain to a developer any extra details
    /// @param jobOfferId the corresponding jobId submitted by the user
    /// @param resultId is the corresponding result being stored in the 
    function completejob(
        uint jobOfferId,
        uint resultId
    ) public returns (uint256) {
        emit computeJobCompleted(jobOfferId, msg.sender);
        return IModicrum(modicrumAddress).acceptResult(resultId, jobOfferId);

    }
}
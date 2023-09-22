// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;
import {IModicrumAdapter} from "../interfaces/IModicrumAdapter.sol";
import {IModicrum} from "../interfaces/IModicrum.sol";

/// @title Modicrium client adapter contract
/// @author Dhruv Malik
/// @notice this needs to be connected with wallet and cli integration for paying the job fees.
contract ModicrumContractAdapter is IModicrumAdapter {
    // its the address of modicrum contract on lilypad testnet
    address  modicrumAddress = 0x422F325AA109A3038BDCb7B03Dd0331A4aC2cD1a;
    
    event computeJobCompleted(uint jobId, address clientAddress);
    event computeJobStarted(uint jobId);
    IModicrum remoteContractInstance;
    constructor ()  {
        remoteContractInstance = IModicrum(modicrumAddress);
    }

    /// @notice runs the compute job with no preference for the mediator
    /// @dev here the entrypoint parameters are corresponding to the dockername="lxet/geocordinate"
    /// @param entrypointParams is the execution params of the given job
    /// @return the jobId which will be used for finding the state of the offer along with the
    function runComputeJob(
       string memory entrypointParams,
        string calldata dockername
    ) public payable returns (uint256) {
        string memory params = entrypointParams;
        uint256 jobId = remoteContractInstance.runModuleWithDefaultMediators(dockername, params);
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
        return remoteContractInstance.acceptResult(resultId, jobOfferId);
    }
}
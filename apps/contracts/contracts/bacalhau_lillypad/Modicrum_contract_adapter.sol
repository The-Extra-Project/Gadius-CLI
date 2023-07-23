// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import '@openzeppelin/contracts/access/AccessControl.sol';
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Modicrium client adapter contract
/// @author Dhruv Malik
/// @notice this needs to be connected with wallet and cli integration for paying the job fees.

interface IModicrum {
    function runModuleWithDefaultMediators(
        string calldata name,
        string calldata params
    ) external payable returns (uint256);

    function registerJobCreator() external;

    function acceptResult(
        uint256 resultId,
        uint256 jobOfferId
    ) external returns (uint256);

    function getModuleSpec(
        string calldata template,
        string calldata params
    ) external pure returns (string memory);
}

interface IModicrumAdapter {


    function runComputeJob(
        georenderPointParams memory entrypointParams,
        string calldata dockername
    ) external payable returns(uint256);

    struct georenderPointParams {
        string coordX;
        string CoordY;
        string username;
    }

}

contract ModicrumContractAdapter is AccessControl, IModicrumAdapter, Ownable {
    // its the address of modicrum contract on lillypad test.
    address  modicrumAddress;

    address adapterAddress;

    // corresponding to the worldcoin contract which will inherit this contract for job computation
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");


    modifier shouldHaveRole(
        bytes32 role,address callerAddress
    ) {
        require(hasRole(VERIFIER_ROLE,msg.sender), "MODICRUM: only-authModule");
        _;
    }

    
    event computeJobCompleted(uint jobId, address clientAddress);

    // modicrum address:  = "0x422F325AA109A3038BDCb7B03Dd0331A4aC2cD1a"
    constructor (address verifierAddress, address standardAddress)  {
        grantRole(VERIFIER_ROLE, verifierAddress);
        modicrumAddress = modicrumAddress;

    }

    function setAdapterAddress(address _adapterAddress) onlyOwner public returns(uint256) {
        adapterAddress = _adapterAddress;
    }


    /// @notice runs the compute job with no preference for the mediator
    /// @dev here the entrypoint parameters are corresponding to the dockername="lxet/"
    /// @param entrypointParams is the execution params of the given job
    /// @return the jobId which will be used for finding the state of the offer along with the
    function runComputeJob(
       IModicrumAdapter.georenderPointParams memory entrypointParams,
        string calldata dockername
    ) public payable shouldHaveRole(VERIFIER_ROLE, msg.sender) returns (uint256) {
        string memory params = string(
            abi.encodePacked(
                entrypointParams.coordX,
                entrypointParams.CoordY,
                entrypointParams.username
            )
        );
        return IModicrum(adapterAddress).runModuleWithDefaultMediators(dockername, params);
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
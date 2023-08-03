// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;



/// @title AuthModule that verfies the execution on the lillypad client contract only for address validating their identity od retina scan based on zkp
/// @author Dhruv
/// @notice it generates the bool which is then checked as the modifier in the lillypad client contract for the verification
/// @dev it gives the nullifier for each approval , abnd then the contract validates that if its validates and is not be reused

import {ByteHasher} from "./utils/BytesHasher.sol";
import {IWorldID} from "./utils/IWorldID.sol";
import {IModicrumAdapter} from "../bacalhau_lillypad/Modicrum_contract_adapter.sol";


contract AuthModule {
    using ByteHasher for bytes;
	///////////////////////////////////////////////////////////////////////////////
	///                                  ERRORS                                ///
	//////////////////////////////////////////////////////////////////////////////
	/// @notice Thrown when attempting to reuse a nullifier
	error InvalidNullifier();

	/// @dev The World ID instance that will be used for verifying proofs
	IWorldID internal immutable worldId;

    // external nullifier (determined by whether the given user has been loggedin or not).

    uint256 internal immutable externalNullifier;

	/// @dev The World ID group ID (always 1)
	uint256 internal immutable groupId = 1;

	/// @dev internal nullifier mapping with their usage.
	mapping(uint256 => bool) internal nullifierHashes;



    /// @param _worldId The WorldID instance that will verify the proofs
	/// @param _appId The World ID app ID
	/// @param _actionId The World ID action ID
	constructor(IWorldID _worldId, string memory _appId, string memory _actionId) {
		worldId = _worldId;
		externalNullifier = abi.encodePacked(abi.encodePacked(_appId).hashToField(), _actionId).hashToField();
    }
    function verifyAndExecute(address signal, uint256 root, uint256 nullifierHash, uint256[8] calldata proof, address ModicumAdapter, IModicrumAdapter.georenderPointParams memory entrypointParams , string calldata dockername) public {
		if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

		// We now verify the provided proof is valid and the user is verified by World ID
		worldId.verifyProof(
			root,
			groupId,
			abi.encodePacked(signal).hashToField(),
			nullifierHash,
			externalNullifier,
			proof
		);

		// We now record the user has done this, so they can't do it again (proof of uniqueness)
		nullifierHashes[nullifierHash] = true;


        IModicrumAdapter(ModicumAdapter).runComputeJob(
        entrypointParams,
         dockername
        );               
    }
}
// SPDX-License-Identifier: MIT

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

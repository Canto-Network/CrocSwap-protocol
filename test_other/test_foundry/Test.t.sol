pragma solidity 0.8.19;

import "forge-std/Test.sol";
import "../../contracts";

contract ContractBTest is Test {
    uint256 testNumber;
    uint256 mainnetFork;

    CrocSwapDex dex;

    // addresses
    address proposalStore = 0x648a5Aa0C4FbF2C1CF5a3B432c2766EeaF8E402d;
    address govshuttle = 0xB7a78c42532424AC7B2584F02E58C6699c660925;
    address governorBravoDelegator = 0xBC3139f9dA6b16A8FF8Ac6e0dEc4C0278d532dba;

    // contracts
    IGovernor governorBravo = IGovernor(governorBravoDelegator);
    IProposalStore proposalStoreContract = IProposalStore(proposalStore);

    // proposal data
    address[] targets;
    string[] signatures;
    bytes[] calldatas;
    uint256[] values;

    function setUp() public {
        mainnetFork = vm.createFork("https://node-f3495086-1-canto.ansybl.io/evm_rpc/");
        vm.selectFork(mainnetFork);

        dex = CrocSwapDex(0x9290C893ce949FE13EF3355660d07dE0FB793618);
    }

    function proposal() public {
        bytes memory i_bytes;
        i_bytes = hex"000000000000000000000000ec13678bf31ca304bed5b7b7e3c71fed0b450a24";

        targets.push(unitroller);
        values.push(0);
        signatures.push("_setPriceOracle(address)");
        calldatas.push(i_bytes);
    }
}

interface IGovernor {
    function execute(uint256 proposalId) external payable;
    function queue(uint256 proposalId) external;
}

interface IProposalStore {
    struct Proposal {
        // @notice Unique id for looking up a proposal
        uint256 id;
        string title;
        string desc;
        // @notice the ordered list of target addresses for calls to be made
        address[] targets;
        uint256[] values;
        // @notice The ordered list of function signatures to be called
        string[] signatures;
        // @notice The ordered list of calldata to be passed to each call
        bytes[] calldatas;
    }

    function AddProposal(
        uint256 propId,
        string memory title,
        string memory desc,
        address[] memory targets,
        uint256[] memory values,
        string[] memory signatures,
        bytes[] memory calldatas
    ) external;

    function QueryProp(uint256 propId) external returns (Proposal memory);
}

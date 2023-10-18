const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");
var AbiCoder = require("@ethersproject/abi").AbiCoder;

async function main() {
	const abi = new AbiCoder();

	console.log("Emissions Calldata: ");

	// get the hash of the pool, which is keccak256(base, quote, poolIdx)
	let poolHash = abi.encode(
		["address", "address", "uint256"],
		[
			"0x80b5a32E4F032B2a058b4F29EC95EEfEEB87aDcd",
			"0xEe602429Ef7eCe0a13e4FfE8dBC16e101049504C",
			36000,
		]
	);

	let setRewards = abi.encode(
		// [code, poolHash, startWeek, endWeek, rewardPerWeek]
		["uint8", "bytes32", "uint32", "uint32", "uint64"],
		[
			117,
			ethers.utils.keccak256(poolHash),
			1697068800, // 1697068800 GMT: Thursday, October 12, 2023 12:00:00 AM
			1699488000, // 1699488000 GMT: Thursday, November 9, 2023 12:00:00 AM
			BigNumber.from("1000000000000000000000"), // 1000 CANTO per week distributed
		]
	);

	let data = abi.encode(["uint16", "bytes", "bool"], [8, setRewards, false]);
	console.log(data);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});

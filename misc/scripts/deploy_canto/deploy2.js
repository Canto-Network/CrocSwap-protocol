// Configure paths for the dex contract

var AbiCoder = require("@ethersproject/abi").AbiCoder;

const abi = new AbiCoder();

// mainnet addresses 1
const addresses = {
	CrocSwapDex: "0x9290C893ce949FE13EF3355660d07dE0FB793618",
	ColdPath: "0x9B2a63F27661A468E2da22226b64A4914144f195",
	HotProxy: "0x35FF0Ae8D893aC4c1Cefd4B5ac80eAb96684D9B7",
	KnockoutLiqPath: "0x29BfE042158b5a213c224AFE44C749eC4429527A",
	KnockoutFlagPath: "0x35E66506D8d1f456Ac0eD8fF0C50a847d43ec02C",
	LongPath: "0x54861bdc3Ce98b0d11a4fEaA965dA97d239762d5",
	MicroPaths: "0xB183D02122F55f928d711Ef10C3758A512aCaBd3",
	SafeModePath: "0xf6153C52EEdA76728A2139F3ec5a6cE055266F40",
	WarmPath: "0x74ff14e7E80DC76C355B156A06882e18C1938A19",
	LiquidityMiningPath: "0x2D826ae54b06839042Da0c9B81EAB34bfeA05646",
};

const BOOT_PROXY_IDX = 0;
const SWAP_PROXY_IDX = 1;
const LP_PROXY_IDX = 2;
const COLD_PROXY_IDX = 3;
const LONG_PROXY_IDX = 4;
const MICRO_PROXY_IDX = 5;
const KNOCKOUT_LP_PROXY_IDX = 7;
const LIQUIDITY_MINING_PROXY_IDX = 8;
const FLAG_CROSS_PROXY_IDX = 3500;
const SAFE_MODE_PROXY_PATH = 9999;

async function main() {
	const [deployer] = await ethers.getSigners();

	console.log("Configuring contracts with the account:", deployer.address);

	// attach to CrocSwapDex contract
	const CrocSwapDex = await hre.ethers.getContractFactory("CrocSwapDex");
	const dex = await CrocSwapDex.attach(addresses.CrocSwapDex);

	// use protocolCmd to install paths
	// // install coldpath
	// cmd = abi.encode(
	// 	["uint8", "address", "uint16"],
	// 	[21, addresses.ColdPath, COLD_PROXY_IDX]
	// );
	// await dex.protocolCmd(BOOT_PROXY_IDX, cmd, true);

	// // install longpath
	// cmd = abi.encode(
	// 	["uint8", "address", "uint16"],
	// 	[21, addresses.LongPath, LONG_PROXY_IDX]
	// );
	// await dex.protocolCmd(BOOT_PROXY_IDX, cmd, true);

	// // install warm path
	// cmd = abi.encode(
	// 	["uint8", "address", "uint16"],
	// 	[21, addresses.WarmPath, LP_PROXY_IDX]
	// );
	// await dex.protocolCmd(BOOT_PROXY_IDX, cmd, true);

	// // install hot proxy path
	// cmd = abi.encode(
	// 	["uint8", "address", "uint16"],
	// 	[21, addresses.HotProxy, SWAP_PROXY_IDX]
	// );
	// await dex.protocolCmd(BOOT_PROXY_IDX, cmd, true);

	// // install micro paths
	// cmd = abi.encode(
	// 	["uint8", "address", "uint16"],
	// 	[21, addresses.MicroPaths, MICRO_PROXY_IDX]
	// );
	// await dex.protocolCmd(BOOT_PROXY_IDX, cmd, true);

	// // install knockout lp proxy path
	// cmd = abi.encode(
	// 	["uint8", "address", "uint16"],
	// 	[21, addresses.KnockoutLiqPath, KNOCKOUT_LP_PROXY_IDX]
	// );
	// await dex.protocolCmd(BOOT_PROXY_IDX, cmd, true);

	// // install cross knockout cross proxy path
	// cmd = abi.encode(
	// 	["uint8", "address", "uint16"],
	// 	[21, addresses.KnockoutFlagPath, FLAG_CROSS_PROXY_IDX]
	// );
	// await dex.protocolCmd(BOOT_PROXY_IDX, cmd, true);

	// // install safe mode path
	// cmd = abi.encode(
	// 	["uint8", "address", "uint16"],
	// 	[21, addresses.SafeModePath, SAFE_MODE_PROXY_PATH]
	// );
	// await dex.protocolCmd(BOOT_PROXY_IDX, cmd, true);

	// // install liquidity mining path
	// cmd = abi.encode(
	// 	["uint8", "address", "uint16"],
	// 	[21, addresses.LiquidityMiningPath, LIQUIDITY_MINING_PROXY_IDX]
	// );
	// await dex.protocolCmd(BOOT_PROXY_IDX, cmd, true);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});

// Deploy Croc Lens Contracts

const { BigNumber } = require("ethers");
var AbiCoder = require("@ethersproject/abi").AbiCoder;

const abi = new AbiCoder();

const PRECISION = 100000000;
const Q_64 = BigNumber.from(2).pow(64);

// mainnet dex address
const dexAddress = "0x9290C893ce949FE13EF3355660d07dE0FB793618";
const usdcAddress = "0x80b5a32E4F032B2a058b4F29EC95EEfEEB87aDcd";
const cNoteAddress = "0xEe602429Ef7eCe0a13e4FfE8dBC16e101049504C";

async function main() {
	const [deployer] = await ethers.getSigners();

	console.log("Deploying pool with the account:", deployer.address);
	const CrocSwapDex = await hre.ethers.getContractFactory("CrocSwapDex");
	const USDCFactory = await hre.ethers.getContractFactory("MockERC20");
	const cNOTEFactory = await hre.ethers.getContractFactory("MockERC20");

	const dex = await CrocSwapDex.attach(dexAddress);
	const USDC = await USDCFactory.attach(usdcAddress);
	const cNOTE = await cNOTEFactory.attach(cNoteAddress);

	// 1. approve USDC and cNOTE for dex
	approveUSDC = await USDC.approve(dexAddress, BigNumber.from(10).pow(36));
	await approveUSDC.wait();
	approveCNOTE = await cNOTE.approve(dexAddress, BigNumber.from(10).pow(36));
	await approveCNOTE.wait();

	/*
	/	2. set new pool liquidity (amount to lock up for new pool)
	/	   params = [code, liq]
	*/
	let setPoolLiqCmd = abi.encode(["uint8", "uint128"], [112, 1]);
	tx = await dex.protocolCmd(3, setPoolLiqCmd, true);
	await tx.wait();
	console.log("Set pool liquidity lockup to 1");

	/*
	/  3. Create new pool template
	/     params = [code, poolIDX, feeRate, tickSize, jitThresh, knockout, oracle]
	*/
	let templateCmd = abi.encode(
		["uint8", "uint256", "uint16", "uint16", "uint8", "uint8", "uint8"],
		[110, 36000, 100, 1, 8, 64, 0]
	);
	tx = await dex.protocolCmd(3, templateCmd, false);
	await tx.wait();
	console.log("Created new pool template");

	/*
	/  4. Initialize the new pool with USDC and cNOTE
	/     params = [code, token0, token1, poolIDX, sqrtPrice]
	*/
	let initPoolCmd = abi.encode(
		["uint8", "address", "address", "uint256", "uint128"],
		[71, usdcAddress, cNoteAddress, 36000, toSqrtPrice(Math.pow(10, -12))]
	);
	tx = await dex.userCmd(3, initPoolCmd, { gasLimit: 6000000 });
	await tx.wait();
	console.log("Initialized new pool");

	// // -----------------------------
	// // EXTRA FUNCTIONS
	// // -----------------------------
	// // set protocol take rate
	// let takeRateCmd = abi.encode(["uint8", "uint16"], [114, 0]);
	// tx = await dex.protocolCmd(3, takeRateCmd, true);
	// await tx.wait();
	// console.log(tx);

	// // set relayer take rate
	// let relayerTakeRateCmd = abi.encode(["uint8", "uint16"], [116, 0]);
	// tx = await dex.protocolCmd(3, relayerTakeRateCmd, true);
	// await tx.wait();
	// console.log(tx);

	// // deposit surplus USDC and cNOTE into pool
	// let depositSurplusUSDCCmd = abi.encode(
	// 	["uint8", "address", "uint128", "address"],
	// 	[73, "0xEf109EF4969261eB92A9F00d6639b440160Cc237", 100000, usdcAddress]
	// );
	// tx = await dex.userCmd(3, depositSurplusUSDCCmd);
	// let depositSurpluNOTECmd = abi.encode(
	// 	["uint8", "address", "uint128", "address"],
	// 	[
	// 		73,
	// 		"0xEf109EF4969261eB92A9F00d6639b440160Cc237",
	// 		1000000000000,
	// 		cNoteAddress,
	// 	]
	// );
	// tx = await dex.userCmd(3, depositSurpluNOTECmd);
}

function toSqrtPrice(price) {
	let sqrtFixed = Math.round(Math.sqrt(price) * PRECISION);
	return BigNumber.from(sqrtFixed).mul(Q_64).div(PRECISION);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});

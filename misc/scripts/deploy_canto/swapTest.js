// Deploy Croc Lens Contracts

const { BigNumber } = require("ethers");
var AbiCoder = require("@ethersproject/abi").AbiCoder;

const abi = new AbiCoder();

const PRECISION = 100000000;
const Q_64 = BigNumber.from(2).pow(64);

// testnet dex address
const dexAddress = "0x9290C893ce949FE13EF3355660d07dE0FB793618";
const usdcAddress = "0x80b5a32E4F032B2a058b4F29EC95EEfEEB87aDcd";
const cNoteAddress = "0xEe602429Ef7eCe0a13e4FfE8dBC16e101049504C";

async function main() {
	const [deployer] = await ethers.getSigners();
	const CrocSwapDex = await hre.ethers.getContractFactory("CrocSwapDex");
	const USDCFactory = await hre.ethers.getContractFactory("MockERC20");
	const cNOTEFactory = await hre.ethers.getContractFactory("MockERC20");

	const dex = await CrocSwapDex.attach(dexAddress);
	const USDC = await USDCFactory.attach(usdcAddress);
	const cNOTE = await cNOTEFactory.attach(cNoteAddress);

	// get balances of USDC and cNOTE pre-swap
	let usdcBal = await USDC.balanceOf(deployer.address);
	let cNoteBal = await cNOTE.balanceOf(deployer.address);
	console.log("USDC balance before swap: ", usdcBal.toString());
	console.log("cNote balance before swap: ", cNoteBal.toString());

	console.log("Trading 1 cNote for 1 USDC...");

	// // swap transaction
	// swapTx = await dex.swap(
	// 	cNoteAddress,
	// 	usdcAddress,
	// 	36000,
	// 	true,
	// 	true,
	// 	BigNumber.from("50000000000000000000"),
	// 	0,
	// 	BigNumber.from("20291418481080506777600000"),
	// 	BigNumber.from("1900000"),
	// 	2
	// );

	swapTx = await dex.swap(
		usdcAddress,
		cNoteAddress,
		36000,
		false,
		true,
		BigNumber.from("1000000"),
		0,
		BigNumber.from("16446744073709"),
		BigNumber.from("1080000000000000000"),
		0
	);

	await swapTx.wait();
	console.log(swapTx);

	// get balances of USDC and cNOTE post-swap
	usdcBal = await USDC.balanceOf(deployer.address);
	cNoteBal = await cNOTE.balanceOf(deployer.address);
	console.log("USDC balance after swap: ", usdcBal.toString());
	console.log("cNote balance after swap: ", cNoteBal.toString());
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

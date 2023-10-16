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

	console.log("Adding liquidity with the account:", deployer.address);
	// attach to CrocSwapDex contract
	const CrocSwapDex = await hre.ethers.getContractFactory("CrocSwapDex");
	const dex = await CrocSwapDex.attach(dexAddress);

	const currentTick = -276325;
	const ZERO_ADDR = "0x0000000000000000000000000000000000000000";

	// Mint concentrated liquidity
	let mintConcentratedLiqCmd = abi.encode(
		[
			"uint8",
			"address",
			"address",
			"uint256",
			"int24",
			"int24",
			"uint128",
			"uint128",
			"uint128",
			"uint8",
			"address",
		],
		[
			11, // code (mint concentrated liquidity in base token liq)
			usdcAddress, // base token
			cNoteAddress, // quote token
			36000, // poolIDX
			currentTick - 75, // tickLower
			currentTick + 75, // tickUpper
			BigNumber.from("10000000"), // amount of base token to send
			BigNumber.from("18446744073"), // min price
			BigNumber.from("18446744073709000"), // max price
			0, // reserve flag
			ZERO_ADDR, // lp conduit address (0 if not using)
		]
	);
	tx = await dex.userCmd(2, mintConcentratedLiqCmd, {
		gasLimit: 6000000,
	});
	await tx.wait();
	console.log(tx);
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

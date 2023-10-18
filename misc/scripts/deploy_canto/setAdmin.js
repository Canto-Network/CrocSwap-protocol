// Deploy Croc Lens Contracts

const { BigNumber } = require("ethers");
var AbiCoder = require("@ethersproject/abi").AbiCoder;

const abi = new AbiCoder();
const PRECISION = 100000000;
const Q_64 = BigNumber.from(2).pow(64);

// mainnet dex address
const dexAddress = "0x9290C893ce949FE13EF3355660d07dE0FB793618";

async function main() {
	const [deployer] = await ethers.getSigners();
	const CrocSwapDex = await hre.ethers.getContractFactory("CrocSwapDex");

	const dex = await CrocSwapDex.attach(dexAddress);

	/*
	/ Set Admin to Timelock
	*/
	let setAdmin = abi.encode(
		["uint8", "address"],
		[20, "0xF33942F457EcabF2a03828e299C052A9523cc473"]
	);
	tx = await dex.protocolCmd(3, setAdmin, true);
	await tx.wait();
	console.log(
		"Admin successfully set to: ",
		"0xF33942F457EcabF2a03828e299C052A9523cc473"
	);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});

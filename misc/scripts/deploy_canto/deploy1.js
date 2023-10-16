// Deploy Dex contract and all paths

async function main() {
	const [deployer] = await ethers.getSigners();

	console.log("Deploying contracts with the account:", deployer.address);

	// // deploy CrocSwapDex contract
	// const dex = await ethers.deployContract("CrocSwapDex");
	// await dex.deployed();
	// console.log("CrocSwapDex:", await dex.address);

	// // deploy ColdPath
	// const ColdPath = await ethers.deployContract("ColdPath");
	// await ColdPath.deployed();
	// console.log("ColdPath:", await ColdPath.address);

	// // deploy HotPath
	// const HotProxy = await ethers.deployContract("HotProxy");
	// await HotProxy.deployed();
	// console.log("HotProxy:", await HotProxy.address);

	// // deploy KnockoutPath
	// const KnockoutLiqPath = await ethers.deployContract("KnockoutLiqPath");
	// await KnockoutLiqPath.deployed();
	// console.log("KnockoutLiqPath:", await KnockoutLiqPath.address);

	// // deploy CrossKnockoutPath
	// const KnockoutFlagPath = await ethers.deployContract("KnockoutFlagPath");
	// await KnockoutFlagPath.deployed();
	// console.log("KnockoutFlagPath:", await KnockoutFlagPath.address);

	// // deploy LongPath
	// const LongPath = await ethers.deployContract("LongPath");
	// await LongPath.deployed();
	// console.log("LongPath:", await LongPath.address);

	// // deploy MicroPath
	// const MicroPaths = await ethers.deployContract("MicroPaths");
	// await MicroPaths.deployed();
	// console.log("MicroPaths:", await MicroPaths.address);

	// // deploy SafeModePath
	// const SafeModePath = await ethers.deployContract("SafeModePath");
	// await SafeModePath.deployed();
	// console.log("SafeModePath:", await SafeModePath.address);

	// deploy WarmPath
	const WarmPath = await ethers.deployContract("WarmPath");
	await WarmPath.deployed();
	console.log("WarmPath:", await WarmPath.address);

	// deploy LiquidityMiningPath
	const LiquidityMiningPath = await ethers.deployContract(
		"LiquidityMiningPath"
	);
	await LiquidityMiningPath.deployed();
	console.log("LiquidityMiningPath:", await LiquidityMiningPath.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});

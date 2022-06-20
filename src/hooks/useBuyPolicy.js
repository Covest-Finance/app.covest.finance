import { config } from "../config";
import axios from "axios";

async function useBuyPolicy(poolId, planId, referral, currency, accountAddress, chainId) {
    const DataBlockchain = await Getdata(`${config.url}/artifacts?version=2`);
    const IERC20 = await Getdata(`${config.url}/artifacts/IERC20?version=2`);

    const DataFactory = await Getdata(`${config.url}/Factory?chainId=${chainId}`);

    let dataFactoryUse = DataFactory.filter((item) => item.poolId === poolId);

    if (!dataFactoryUse[0]) {
        return console.error("No data factory found.");
    } else {
        dataFactoryUse = dataFactoryUse[0];
    }

    const policyManager = await dataFactoryUse?.policyManager;
    const policyDetails = await dataFactoryUse?.policyDetails;

    let nameRegsitryAddress = await dataFactoryUse?.nameRegistry;

    let nameRegsitryContract = await new web3.eth.Contract(DataBlockchain?.NameRegistry?.abi, nameRegsitryAddress);

    let referralAddress = await nameRegsitryContract.methods.RL().call();
    // console.log(referralAddress);

    // console.log(policyManager);
    // web3.eth.getChainId().then(console.log);

    const queryData = await Getdata(`${config.url}/quotePolicy?user=${accountAddress}&poolId=${poolId}&planId=${planId}&assets=${currency}&chainId=${chainId}`);

    // console.log(queryData);

    if (queryData?.message) {
        return console.error(`ERROR: ${queryData?.message}`);
    }

    const currencyAddress = queryData?.Assets;

    const approveBalance = await CallTranscation(IERC20, currencyAddress, "allowance", [accountAddress, policyManager], accountAddress);

    let balanceOfAssetsUser = await CallTranscation(IERC20, currencyAddress, "balanceOf", [accountAddress], accountAddress);

    if (referral) {
        if (referral === "0x0000000000000000000000000000000000000000") {
        } else {
            const isReferral = await CallTranscation(DataBlockchain?.Referral?.abi, referralAddress, "isReferral", [referral], accountAddress);

            // console.log(isReferral);

            if (!isReferral) {
                referral = "0x0000000000000000000000000000000000000000";
            }
        }
    } else {
        referral = "0x0000000000000000000000000000000000000000";
    }

    // console.log(`Allowance : ${approveBalance.toString()}`);

    // console.log(`Balance : ${balanceOfAssetsUser.toString()}`);

    const decimalsOfAssets = await CallTranscation(IERC20, currencyAddress, "decimals", [], accountAddress);

    let buyValue = buy * 10 ** decimalsOfAssets;

    const datapayload = await web3.eth.abi.encodeParameters(
        ["address", "string", "uint[]", "uint", "uint", "uint8", "bytes32", "bytes32"],
        [queryData.Assets, queryData.policyId, queryData.Pricing, queryData.generatedAt, queryData.expiresAt, queryData.v, queryData.r, queryData.s],
    );

    const buy = queryData.Pricing[0];

    // console.log(accountAddress, policyManager, queryData.policyId, queryData.Assets, queryData.Pricing, referral, datapayload);

    if (approveBalance >= buyValue) {
        if (balanceOfAssetsUser >= buyValue) {
            const buyPolicySendTranscation = await SendTranscation(
                DataBlockchain?.PolicyManager?.abi,
                policyManager,
                "buyPolicy",
                [queryData.policyId, queryData.Assets, queryData.Pricing, referral, datapayload],
                accountAddress,
            );

            if (buyPolicySendTranscation) {
                if (buyPolicySendTranscation.mesasge === "BoughtPolicy Successfully") {
                    // console.log("BoughtPolicy Successfully");
                    // console.log(buyPolicySendTranscation);
                }
            }
        } else {
            console.error("Balance Insufficient.");
        }
    } else {
        balanceOfAssetsUser = await CallTranscation(IERC20, currencyAddress, "balanceOf", [accountAddress], accountAddress);

        buyValue = buy * 10 ** decimalsOfAssets;

        await SendTranscation(IERC20, currencyAddress, "approve", [policyManager, BigNumber(buyValue).toString()], accountAddress);

        if (balanceOfAssetsUser >= buyValue) {
            const buyPolicySendTranscation = await SendTranscation(
                DataBlockchain?.PolicyManager?.abi,
                policyManager,
                "buyPolicy",
                [queryData.policyId, queryData.Assets, queryData.Pricing, referral, datapayload],
                accountAddress,
            );
            if (buyPolicySendTranscation) {
                if (buyPolicySendTranscation.mesasge === "BoughtPolicy Successfully") {
                    // console.log("BoughtPolicy Successfully");
                    // console.log(buyPolicySendTranscation);
                }
            }
        } else {
            console.error("Balance Insufficient.");
        }
    }
}

async function CallTranscation(abi, destination, functions, parameters, account) {
    let res;

    const Contract = await new web3.eth.Contract(abi, destination);

    await Contract.methods[functions](...parameters)
        .call({
            from: account,
        })
        .then((result) => {
            res = result;
        });

    return res;
}

async function SendTranscation(abi, destination, functions, parameters, account) {
    const Contract = await new web3.eth.Contract(abi, destination);
    // console.log(functions);
    // console.log(parameters);

    await Contract.methods[functions](...parameters)
        .send({
            from: account,
        })
        .on("transactionHash", (hash) => {
            // const { emitter } = notify.hash(hash);
            // emitter.on("txSent", // console.log);
            // emitter.on("txPool", // console.log);
            // emitter.on("txConfirmed", // console.log);
            // emitter.on("txSpeedUp", // console.log);
            // emitter.on("txCancel", // console.log);
            // emitter.on("txFailed", // console.log);
        })
        .then((res) => {
            // console.log(res);

            // console.log("Event");
            // console.log(res?.events);

            if (res?.events?.BoughtPolicy) {
                return {
                    message: "BoughtPolicy Successfully",
                    data: res?.events?.BoughtPolicy,
                    returnData: res?.events?.BoughtPolicy?.returnValues,
                };
            }
        })
        .catch((e) => {
            // console.log(e);
        });
}

export default useBuyPolicy;

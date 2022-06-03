import { config } from "../config";
import axios from "axios";
import { useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";
import { ethers, ContractFactory } from "ethers";
import Web3 from "web3";

let web3;

async function useRequestClaim(data, policyId, poolId, poolName, accountAddress, assetAddress, assetName, web3Param) {
    // console.log("In claim::");

    web3 = web3Param;

    let metadata = {};

    if (data.topic !== "") {
        metadata.topic = data.topic;
    }

    if (negativeNumber(data.amount) !== true && data.amount !== "") {
        metadata.claimAmount = Number(data.amount);
    }
    if (negativeNumber(data.lossAmount) !== true && data.lossAmount !== "") {
        metadata.lossAmount = Number(data.lossAmount);
    }

    if (data.description !== "") {
        metadata.description = data.description;
    }

    if (data.file) {
        metadata.file = await SendFiles(data.file);
    }

    // if (data.imageOthers) {
    //   metadata.othersImage = await SendFiles(data.imageOthers);
    // }

    // if (data.video) {
    //   metadata.video = await SendFiles(data.video);
    // }

    // if (data.files1Others) {
    //   metadata.Others = await SendFiles(data.files1Others);
    // }

    // if (data.files2Zip) {
    //   metadata.zipFile = await SendFiles(data.files2Zip);
    // }

    metadata.user = accountAddress;
    metadata.timestampInSec = Math.round(new Date().getTime() / 1000);
    metadata.asset = assetAddress;
    metadata.policyId = policyId;
    metadata.poolName = poolName;
    metadata.poolId = poolId;

    // console.log("metadata::");
    // console.log(metadata);

    const sendMetadata = await SendObject(metadata);
    // console.log(sendMetadata);

    const DataBlockchain = await GetData(`${config.url}/artifacts?version=2`);

    // const currencyData = await GetCurrencyAddress(
    //   accountAddress,
    //   poolId,
    //   currency,
    //   assetAddress
    // );
    const addressOfAssets = assetAddress; //currencyData?.Assets;
    const getFactoryData = await GetData(`${config.url}/Factory`);

    let addressPolicyDetails = "";
    let addressPolicyManager = "";
    let addressResreve = "";

    for (let index in getFactoryData) {
        if (getFactoryData[index].poolId === poolId) {
            addressPolicyDetails = getFactoryData[index].policyDetails;
            addressPolicyManager = getFactoryData[index].policyManager;
            addressResreve = await CallTranscation(DataBlockchain?.NameRegistry?.abi, getFactoryData[index].nameRegistry, "Reserve", []);
        }
    }

    if (addressPolicyDetails === "" || addressPolicyManager === "" || addressResreve === "") {
        return console.error("Not Found poolId.");
    }

    const getPolicyIdUser = await CallTranscation(DataBlockchain?.PolicyDetails?.abi, addressPolicyDetails, "getPolicyId", [accountAddress, addressOfAssets]);

    console.log(`${config.url}/quoteClaim?user=${accountAddress}&poolId=${poolId}&policyId=${policyId}&assets=${assetName}&hashData=${sendMetadata}`);

    const queryData = await GetData(`${config.url}/quoteClaim?user=${accountAddress}&poolId=${poolId}&policyId=${policyId}&assets=${assetName}&hashData=${sendMetadata}`);

    console.log(queryData);

    if (queryData.message) {
        return console.error(queryData.message);
    }

    // console.log(queryData);

    const datapayload = web3.eth.abi.encodeParameters(
        ["address", "address", "string", "uint", "uint", "uint8", "bytes32", "bytes32"],
        [
            queryData.User,
            queryData.Assets,
            queryData.ipfsHash, //# not use PolicyId but use HashData //
            queryData.generatedAt,
            queryData.expiresAt,
            queryData.v,
            queryData.r,
            queryData.s,
        ],
    );

    // console.log(`web3 now`);

    // console.log(web3);

    // console.log([getPolicyIdUser, addressResreve, queryData.Assets, queryData.amount, queryData.ipfsHash, datapayload]);

    await SendTranscation(DataBlockchain?.Reserve?.abi, addressResreve, "policyClaimRequest", [queryData.Assets, queryData.amount, queryData.ipfsHash, datapayload], accountAddress);
}

async function SendFiles(file) {
    let formData = new FormData();

    formData.append("file", file);

    const response = await axios.post(`${config.urlUploadFile}/uploadFile`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
}

async function SendObject(data) {
    const response = await axios.post(`${config.urlUploadFile}/uploadObject`, {
        data,
    });

    return response.data;
}

async function GetData(url) {
    let data = (await axios.get(url)).data;

    return data;
}
function negativeNumber(number) {
    if (number.match(/^-\d+$/)) {
        return true;
    } else {
        return false;
    }
}
async function GetCurrencyAddress(abi, poolId, assetAddress) {
    const Contract = await CallTranscation(abi, assetAddress, "getAssetSupports", [poolId]);
    // console.log(Contract);

    // const queryData = await GetData(
    //   `${config.url}/quotePolicy?user=${accountAddress}&poolId=${poolId}&planId=${planId}&assets=${currency}`
    // );

    return Contract;
}
async function CallTranscation(abi, destination, functions, parameters, account) {
    let res;
    // console.log(functions);
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

export default useRequestClaim;

import axios from "axios";
import { useState, useEffect } from "react";
import { config } from "../config";
import { init, useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";
import useGetNetworks from "../hooks/useGetNetworks";

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const useGetPolicy = (poolId, accountAddress) => {
    let policyData = [];

    let arrayPolicy = [];

    let index = 1;

    const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();
    const [networksAvailable, setNetworksAvailable] = useState([]);
    const [networksIsInit, setNetworksIsInit] = useState(false);

    let networks = useGetNetworks();

    if (networks.message === undefined) {
        if (!networksIsInit) {
            setNetworksIsInit(true);
            setNetworksAvailable(networks);
        }
    }

    const getNetworksId = (chainId) => {
        if (networksAvailable.length > 0) {
            if (networksAvailable.some((item) => item === Number(chainId))) {
                return parseInt(chainId, 16);
            } else {
                return config.networkId;
            }
        } else {
            return config.networkId;
        }
    };

    const funcGetPolicy = async () => {
        //if (accountAddress != "" && accountAddress != "xx") {
        if (accountAddress == undefined || accountAddress == null || accountAddress == "0x0000000000000000000000000000000000000000") {
            return {
                message: "Error Not Found an Account.",
            };
        }
        let chainId = await getNetworksId(connectedChain?.id);
        const { data } = await axios.post(`${config.url}/listPolicies`, {
            user: accountAddress, //"0x8c2D08a22144c1Ae2A9BD98717b0a05849f5DBDF",
            chainId: chainId,
        });
        let filterData = await data;

        if (!filterData?.message) {
            const transFromFilter = filterData.map((item) => {
                const transFromData = item.Data.map((data) => {
                    const startDate = new Date(data.startDate);
                    const endDate = new Date(data.untilDate);

                    const startPeriodDay = `${month[startDate.getMonth()]} ${startDate.getDate()},  ${startDate.getFullYear()}`;

                    const endPeriodDay = `${month[endDate.getMonth()]} ${endDate.getDate()},  ${endDate.getFullYear()}`;

                    let indexsaved = index;

                    index += 1;

                    return {
                        index: indexsaved,
                        poolId: item.poolId,
                        policyId: data.policyId,
                        coverageName: item.coverageName,
                        coveragePeriod: `${startPeriodDay} - ${endPeriodDay}`,
                        startPeriodDay: startDate,
                        endPeriodDay: endDate,
                        premiumAmount: data.premiumAmount,
                        maxCoverage: data.maxCoverage,
                        totalClaimPaid: data.claimAmountPaid,
                        status: data.status,
                        remainClaim: data.remainClaim,
                        claimAmountPaid: data.claimAmountPaid,
                        premiumAmount: data.premiumAmount,
                        claimPending: data.claimPending,
                        assetAddress: data.asset,
                        assetName: data.assetName,
                    };
                });

                arrayPolicy.push(...transFromData);

                return transFromData;
            });

            // ! Policy with have more than 1 policy in that pool it doesn't show !! //
            // let newSetPolicy = new Set(arrayPolicy.map((a) => a.poolId));

            // console.log(`newSetPolicy`);
            // console.log(newSetPolicy);

            // const uniquePolicy = Array.from(newSetPolicy).map((poolId) => {
            //     return arrayPolicy.find((a) => a.poolId === poolId);
            // });

            // console.log(`uniquePolicy`);

            // console.log(uniquePolicy);
            // ! Policy with have more than 1 policy in that pool it doesn't show !! //

            return arrayPolicy.filter((item) => item.status === "Active");
        }
        // if (poolId != undefined && poolId != "all") {
        //   filterData = data.filter((item) => item.poolId == poolId);
        // }

        // } else {
        //   setPolicyData([]);
        // }
    };

    policyData = funcGetPolicy();

    return policyData;
};

export default useGetPolicy;

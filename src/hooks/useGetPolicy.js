import axios from "axios";
import { useState, useEffect } from "react";
import { config } from "../config";
import useGetNetworks from "../hooks/useGetNetworks";

import { useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const useGetPolicy = (poolId) => {
    const [policyData, setPolicyData] = useState([]);
    const connectedWallets = useWallets();
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
    useEffect(() => {
        let arrayPolicy = [];
        let policyObj = {};
        let index = 1;
        let sumOfClaim = 0;
        let sumOfStake = 0;
        let sumOfPremium = 0;
        const funcGetPolicy = async () => {
            const accountAddress = connectedWallets[0]?.accounts[0]?.address;
            if (accountAddress) {
                // console.log(accountAddress);
                let chainId = await getNetworksId(connectedChain?.id);
                const { data } = await axios.post(`${config.url}/listPolicies`, {
                    user: accountAddress, //"0x8c2D08a22144c1Ae2A9BD98717b0a05849f5DBDF",
                    chainId: chainId,
                });
                
                let filterData = await data;

                if (!filterData?.message) {
                    if (poolId != undefined && poolId != "all") {
                        filterData = data.filter((item) => item.poolId == poolId);
                    }

                    const transFromFilter = filterData.map((item) => {
                        const transFromData = item.Data.map((data) => {
                            const startDate = new Date(data.startDate);
                            const endDate = new Date(data.untilDate);

                            const startPeriodDay = `${startDate.getFullYear()}/${startDate.getMonth()}/${startDate.getDate()} ${startDate.getHours()}:${startDate.getMinutes()}:${startDate.getSeconds()}`;

                            const endPeriodDay = `${endDate.getFullYear()}/${endDate.getMonth()}/${endDate.getDate()} ${endDate.getHours()}:${endDate.getMinutes()}:${endDate.getSeconds()}`;

                            return {
                                index: index,
                                poolId: item.poolId,
                                policyId: data.policyId,
                                coverageName: item.coverageName,
                                coveragePeriod: `${startPeriodDay} - ${endPeriodDay}`,
                                premiumAmount: data.premiumAmount,
                                maxCoverage: data.maxCoverage,
                                totalClaimPaid: data.claimAmountPaid,
                                status: data.status,
                                remainClaim: data.remainClaim,
                                claimAmountPaid: data.claimAmountPaid,
                                premiumAmount: data.premiumAmount,
                                claimPending: data.claimPending,
                                assetAddress: data.asset,
                            };

                            index = index + 1;
                        });

                        arrayPolicy.push(...transFromData);
                        sumOfClaim = sumOfClaim + item.allClaimAmountPaid;
                        sumOfStake = sumOfStake + item.MIStaking;
                        sumOfPremium = sumOfPremium + item.allPremiumAmount;
                        return transFromData;
                    });

                    policyObj.listData = arrayPolicy;
                    policyObj.sumOfClaim = sumOfClaim;
                    policyObj.sumOfStake = sumOfStake;
                    policyObj.sumOfPremium = sumOfPremium;

                    setPolicyData(policyObj);
                }
            }
        };
        funcGetPolicy();
    }, [connectedWallets]);
    // console.log(policyData);
    return policyData;
};

export default useGetPolicy;

import axios from "axios";
import { useState, useEffect } from "react";
import { init, useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";
import { config } from "../config";
import useGetNetworks from "../hooks/useGetNetworks";

const useBuyCover = (poolId, accountAddress) => {
    const [poolData, setPoolData] = useState([]);
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
        const funcGetPool = async () => {
            let chainId = await getNetworksId(connectedChain?.id);
            const { data } = await axios.get(`${config.url}/quotePlans?user=${accountAddress}&chainId=${chainId}`);

            if (poolId != undefined && data.message === undefined) {
                const transFromData = data.filter((item) => item.poolId == poolId);

                if (transFromData.length > 0) {
                    const transFromPlanData = transFromData[0].planData.map((plan, index) => {
                        return {
                            id: index,
                            typeName: `Type ${index + 1}`,
                            name: transFromData[0].poolName,
                            investmentRating: 4,
                            poolId: poolId,
                            planId: plan.planId,
                            dailyCost: plan.priceDaily,
                            monthlyCost: plan.priceMonthly,
                            yearlyCost: plan.priceYearly,
                            maxCoverage: plan.maxCover,
                            buyCoverUrl: `/checkout?poolId=${poolId}&planId=${plan.planId}&chainId=${chainId}`,
                        };
                    });

                    setPoolData(transFromPlanData);
                }
            } else {
                const result = {
                    message: data.message,
                };
                setPoolData(result);
            }
        };
        funcGetPool();
    }, [connectedChain?.id]);

    return poolData;
};

export default useBuyCover;

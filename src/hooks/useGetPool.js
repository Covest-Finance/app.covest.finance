import axios from "axios";
import { useState, useEffect } from "react";
import { init, useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";
import useGetNetworks from "../hooks/useGetNetworks";
import { config } from "../config";

const useGetPool = (id, providerValue) => {
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
            const { data } = await axios.get(`${config.url}/factory?chainId=${chainId}`);

            const transFromData = data.map((item) => {
                return {
                    poolId: item.poolId,
                    name: item.poolName,
                    totalCoverage: `${item.activePolicies} Policies`,
                    policyValue: `${item.activePoliciesValue} USD`,
                    totalProvidedCapital: `${item.totalProvidedCapital} USD`,
                    poolAddress: `${item.policyManager}`,
                    availableValue: "201,548 USD",
                    totalPolicySoldVolume: `${item.totalPolicies} Policies`,
                    totalPolicySoldValue: `${item.totalPoliciesValue} USD`,
                    cARRadio: "327 %",
                    buyCoverUrl: `/buycover?poolId=${item.poolId}`,
                    activePoliciesCoverageValue: `${item.activePoliciesCoverageValue} USD`,
                    totalClaimValueReserve: `${item.totalClaimValueReserve} USD`,
                    totalClaimValuePaid: `${item.totalClaimValuePaid} USD`,
                    status: item.status,
                };
            });
            setPoolData(transFromData);
        };
        funcGetPool();
    }, [connectedChain?.id]);
    // console.log("poolData::");
    // console.log(poolData);
    return poolData;
};

export default useGetPool;

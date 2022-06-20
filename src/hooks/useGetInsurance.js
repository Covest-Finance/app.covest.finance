import axios from "axios";
import { useState, useEffect } from "react";
import { init, useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";
import useGetNetworks from "../hooks/useGetNetworks";
import { config } from "../config";

const useGetInsurance = (id, providerValue) => {
    const [insuranceData, setInsuranceData] = useState([]);
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
        const funcGetInsurance = async () => {
            let chainId = await getNetworksId(connectedChain?.id);
            const { data } = await axios.get(`${config.url}/factory?chainId=${chainId}`);

            if (id != undefined) {
                const transFromData = data.filter((item) => {
                    if (item.nameRegistry == id) {
                        const powerData = item.Data[providerValue];
                        return {
                            id: item.poolId,
                            name: item.poolName,
                            logoUrl: "",
                            contractAddress: item.nameRegistry,
                            exchangeRateMIToken: (item.exchangeRateMIToken / 100).toFixed(2),
                            currentPower: powerData?.CurrentPower.toFixed(2),
                            maxPower: powerData?.MaxPoolStake,
                            MinUserStake: powerData?.MinUserStake,
                            MaxUserStake: powerData?.MaxUserStake,
                            percentPower: ((powerData?.CurrentPower / powerData?.MaxPoolStake) * 100).toFixed(2),
                        };
                    }
                });

                setInsuranceData(transFromData);
            } else {
                const transFromData = data.map((item) => {
                    // console.log(data);
                    const powerData = item.Data[providerValue];
                    return {
                        id: item.poolId,
                        name: item.poolName,
                        logoUrl: "",
                        contractAddress: item.nameRegistry,
                        exchangeRateMIToken: (item.exchangeRateMIToken / 100).toFixed(2),
                        currentPower: powerData?.CurrentPower.toFixed(2),
                        maxPower: powerData?.MaxPoolStake,
                        MinUserStake: powerData?.MinUserStake,
                        MaxUserStake: powerData?.MaxUserStake,
                        percentPower: ((powerData?.CurrentPower / powerData?.MaxPoolStake) * 100).toFixed(2),
                    };
                });
                setInsuranceData(transFromData);
            }
        };
        funcGetInsurance();
    }, [connectedChain?.id]);

    return insuranceData;
};

export default useGetInsurance;

import axios from "axios";
import { useState, useEffect } from "react";
import { config } from "../config";
import { useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";
import { isLoading, setState } from "./isGetTotalData";
import useGetNetworks from "../hooks/useGetNetworks";

const useGetTotalData = () => {
    const [totalData, setTotalData] = useState([]);
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
        const account = connectedWallets[0]?.accounts[0]?.address;
        if (account && account !== "0x0000000000000000000000000000000000000000") {
            const funcGetTotalData = async () => {
                let chainId = await getNetworksId(connectedChain?.id);
                const { data } = await axios.post(`${config.url}/totalData`, { user: account, chainId: chainId });

                setTotalData(data);
            };
            if (!isLoading) {
                setState(true);
                funcGetTotalData();
            }
        }
    });

    return totalData;
};

export default useGetTotalData;

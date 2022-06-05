import axios from "axios";
import { useState, useEffect } from "react";
import { config } from "../config";
import { useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";
import { isLoading, setState } from "./isGetTotalData";

const useGetTotalData = () => {
    const [totalData, setTotalData] = useState([]);
    const connectedWallets = useWallets();

    useEffect(() => {
        const account = connectedWallets[0]?.accounts[0]?.address;
        if (account && account !== "0x0000000000000000000000000000000000000000") {
            const funcGetTotalData = async () => {
                const { data } = await axios.post(`${config.url}/totalData`, { user: account });

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

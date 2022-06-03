import axios from "axios";
import { useState, useEffect } from "react";
import { config } from "../config";

import { useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const useGetClaim = (poolId) => {
    const [claimData, setClaimData] = useState([]);
    const connectedWallets = useWallets();

    useEffect(() => {
        let arrayClaim = [];
        let index = 0;
        const funcGetClaim = async () => {
            const accountUserLasted = connectedWallets[0]?.accounts[0]?.address;
            if (accountUserLasted && accountUserLasted !== "0x0000000000000000000000000000000000000000") {
                const { data } = await axios.post(`${config.url}/listClaims`, {
                    user: accountUserLasted,
                });
                let filterData = data;

                if (poolId != undefined && poolId != "all") {
                    filterData = data.filter((item) => item.poolId == poolId);
                }
                filterData.map((item) => {
                    const transFromData = item.Data.map((data) => {
                        const requestDate = new Date(data.timeOut);

                        const requestDay = `${month[requestDate.getMonth()]} ${requestDate.getDate()},  ${requestDate.getFullYear()}`;

                        return {
                            index: index,
                            poolId: item.poolId,
                            poolName: item.poolName,
                            claimId: data.claimId,
                            claimRequestDate: `${requestDay}`,
                            requestAmount: data.requestAmount,
                            approveAmount: data.approveAmount,
                            votePower: data.sumOfTheVote,
                            status: data.status,
                        };

                        index = index + 1;
                    });

                    arrayClaim.push(...transFromData);

                    return transFromData;
                });

                setClaimData(arrayClaim);
            }
        };
        funcGetClaim();
    }, [connectedWallets]);

    // console.log("claimData::");
    // console.log(claimData);
    return claimData;
};

export default useGetClaim;

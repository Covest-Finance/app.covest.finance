import axios from "axios";
import { useState, useEffect } from "react";

const useGetPool = (id, providerValue) => {
    const [poolData, setPoolData] = useState([]);

    useEffect(() => {
        const funcGetPool = async () => {
            const { data } = await axios.get(`https://api.covest.finance/api/factory`);

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
    }, []);
    // console.log("poolData::");
    // console.log(poolData);
    return poolData;
};

export default useGetPool;

import axios from "axios";
import { useState, useEffect } from "react";

const useGetInsurance = (id, providerValue) => {
    const [insuranceData, setInsuranceData] = useState([]);

    useEffect(() => {
        const funcGetInsurance = async () => {
            const { data } = await axios.get(`https://api.covest.finance/api/factory`);

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
    }, []);

    return insuranceData;
};

export default useGetInsurance;

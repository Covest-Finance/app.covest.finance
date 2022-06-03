import axios from "axios";
import { useState, useEffect } from "react";
import { config } from "../config";

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const useGetPolicy = (poolId, accountAddress) => {
    let policyData = [];

    let arrayPolicy = [];

    let index = 1;

    const funcGetPolicy = async () => {
        //if (accountAddress != "" && accountAddress != "xx") {
        const { data } = await axios.post(`${config.url}/listPolicies`, {
            user: accountAddress, //"0x8c2D08a22144c1Ae2A9BD98717b0a05849f5DBDF",
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

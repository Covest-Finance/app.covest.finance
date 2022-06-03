import axios from "axios";
import { useState, useEffect } from "react";
import { config } from "../config";

const useBuyCover = (poolId, accountAddress) => {
  const [poolData, setPoolData] = useState([]);

  useEffect(() => {
    const funcGetPool = async () => {
      const { data } = await axios.get(
        `${config.url}/quotePlans?user=${accountAddress}`
      );

      if (poolId != undefined && data.message === undefined) {
        const transFromData = data.filter((item) => item.poolId == poolId);

        if (transFromData.length > 0) {
          const transFromPlanData = transFromData[0].planData.map(
            (plan, index) => {
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
                buyCoverUrl: `/checkout?poolId=${poolId}&planId=${plan.planId}`,
              };
            }
          );

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
  }, []);

  return poolData;
};

export default useBuyCover;

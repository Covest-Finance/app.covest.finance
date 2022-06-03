const useGetProvider = () => {
  let providerData = [];

  providerData.push({
    id: 0,
    productType: "Service Provider",
    contractAddress: "0x6D764D593525dBb88C7736e5b6E2CE6260F3114151",
    value: 0,
    disabledProp: "disabled",
    providerValue: "ServiceProvider",
  });
  providerData.push({
    id: 1,
    productType: "Referral",
    contractAddress: "0x6D764D593525dBb88C7736e5b6E2CE6260F3114151",
    value: 1,
    disabledProp: "",
    providerValue: "Referral",
  });
  providerData.push({
    id: 2,
    productType: "Claim Assessor",
    contractAddress: "0x6D764D593525dBb88C7736e5b6E2CE6260F3114152",
    value: 2,
    disabledProp: "",
    providerValue: "ClaimAssessors",
  });
  providerData.push({
    id: 3,
    productType: "Underwriter",
    contractAddress: "0x6D764D593525dBb88C7736e5b6E2CE6260F3114153",
    value: 3,
    disabledProp: "",
    providerValue: "UnderWriter",
  });
  providerData.push({
    id: 4,
    productType: "Capital Reserve",
    contractAddress: "0x6D764D593525dBb88C7736e5b6E2CE6260F3114154",
    value: 4,
    disabledProp: "",
    providerValue: "CapitalReserve",
  });
  //   const jsonData = eval(data);
  //   if (jsonData != undefined && jsonData[0] != undefined) {
  //     jsonData.forEach(function (provider, index) {
  //       if (provider != undefined) {
  //         let rowData = provider.attributes;
  //         providerData.push({
  //           id: provider.id,
  //           productType: rowData.productType,
  //           contractAddress: rowData.contractAddress,
  //           value: rowData.providerValue,
  //         });
  //   const       }
  //   });

  return providerData;
  // }
};

export default useGetProvider;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../config";

const UseGetProviderDetailApi = async () => {
    let providerDetailData = [];
    // console.log("UseGetProviderDetailApi::");
    const { data } = await axios.get(`api.covest.finance/api/factory`);
    // console.log("data::");
    // console.log(data);
    //

    // let Factory = new web3.eth.Contract(data.Factory.abi,'0xCdA44a024B39278DADfbc7d1D6Aa7091b9Dd0c9C');
    // let FactoryResult = await Factory.methods.allPairsLength().call();
    //let ExampleData = await Factory.methods.allPairs(0).call();

    // let ExampleData = await Factory.methods.allPairs(0).call();
    // console.log("ExampleData::");
    // console.log(ExampleData);
    //// console.log(ExampleData)

    // const jsonData = eval(Result)
    // if(jsonData != undefined && jsonData[0] != undefined){
    //     jsonData.forEach(function(detail,index){
    //         if(detail != undefined){

    //             // let rowData = provider.attributes;
    //             // providerData.push({id:provider.id, productType: rowData.productType, contractAddress: rowData.contractAddress, value:rowData.providerValue})
    //         }
    //     });

    //     return providerDetailData
    // }
    return providerDetailData;

    // let Factory = new web3.eth.Contract(data.Factory.abi,'0xCdA44a024B39278DADfbc7d1D6Aa7091b9Dd0c9C');
    // let FactoryResult = await Factory.methods.allPairsLength().call();

    // let ExampleData = await Factory.methods.allPairs(0).call();
    // console.log(ExampleData);
    //   jsonData.forEach(function(provider,index){
    //     if(provider != undefined){
    //         let rowData = provider.attributes;
    //         providerData.push({id:provider.id, productType: rowData.productType, contractAddress: rowData.contractAddress, value:rowData.providerValue})
    //     }
    // });

    // console.log(JSON.stringify(Result));
    // console.log(web3.utils.fromWei(Result[0]));

    // let contractAddress = "YOUR_CONTRACT_ADDRESS"
    // useEffect(() => {
    //     let c = new w3.eth.Contract(abi, contractAddress)
    //     setContract(c)
    //   })
    //return <div>useGetProviderDetailSmartContract</div>;
};

export default UseGetProviderDetailApi;

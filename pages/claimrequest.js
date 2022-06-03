import React from "react";
import ClaimRequest from "../src/views/ClaimRequest";
import MainLayout from "../src/layouts/MainLayout";
import Header from "../src/components/Header";

const applyForpool = () => {
    return (
        <MainLayout>
            <Header title={`COVEST FINANCE: Claim Request`}></Header>
            <ClaimRequest></ClaimRequest>
        </MainLayout>
    );
};

export default applyForpool;

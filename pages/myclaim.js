import React from "react";
import MyClaim from "../src/views/MyClaim";
import MainLayout from "../src/layouts/MainLayout";
import Header from "../src/components/Header";

const activecover = () => {
    return (
        <MainLayout>
            <Header title={`COVEST FINANCE: My Claim`}></Header>
            <MyClaim></MyClaim>
        </MainLayout>
    );
};

export default activecover;

import React from "react";
import Coverage from "../src/views/BuyCover";
import MainLayout from "../src/layouts/MainLayout";
import Header from "../src/components/Header";

const buycover = ({ poolId }) => {
    return (
        <MainLayout>
            <Header title={`COVEST FINANCE: Buycover`}></Header>
            <Coverage></Coverage>
        </MainLayout>
    );
};

export default buycover;

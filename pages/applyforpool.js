import React from "react";
import ApplyForPool from "../src/views/ApplyForPool";
import MainLayout from "../src/layouts/MainLayout";
import Header from "../src/components/Header";

const applyForpool = () => {
    return (
        <MainLayout>
            <Header title={`COVEST FINANCE: ApplyForPool`}></Header>
            <ApplyForPool></ApplyForPool>
        </MainLayout>
    );
};

export default applyForpool;

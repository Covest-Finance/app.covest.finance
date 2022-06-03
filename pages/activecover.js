import React from "react";
import ActiveCover from "../src/views/ActiveCover";
import MainLayout from "../src/layouts/MainLayout";
import Header from "../src/components/Header";

const activecover = () => {
    return (
        <MainLayout>
            <Header title={`COVEST FINANCE: Active Cover`}></Header>
            <ActiveCover></ActiveCover>
        </MainLayout>
    );
};

export default activecover;

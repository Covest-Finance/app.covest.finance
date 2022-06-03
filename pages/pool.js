import React from "react";
import Pool from "../src/views/Pool";
import MainLayout from "../src/layouts/MainLayout";
import Header from "../src/components/Header";

const pool = () => {
    return (
        <MainLayout>
            <Header title={`COVEST FINANCE: Pool`}></Header>
            <Pool></Pool>
        </MainLayout>
    );
};

export default pool;

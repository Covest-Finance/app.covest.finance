import React from "react";
import Checkout from "../src/views/Checkout";
import MainLayout from "../src/layouts/MainLayout";
import Header from "../src/components/Header";

const checkout = () => {
    return (
        <MainLayout>
            <Header title={`COVEST FINANCE: CHECKOUT`}></Header>
            <Checkout></Checkout>
        </MainLayout>
    );
};

export default checkout;

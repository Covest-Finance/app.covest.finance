import Provider from "../src/views/Provider";
import MainLayout from "../src/layouts/MainLayout";
import Header from "../src/components/Header";

const provider = () => {
    return (
        <MainLayout>
            <Header title={`COVEST FINANCE: PROVIDER`}></Header>
            <Provider></Provider>
        </MainLayout>
    );
};

export default provider;

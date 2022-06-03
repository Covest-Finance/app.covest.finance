import Mining from "../src/views/Mining";
import MainLayout from "../src/layouts/MainLayout";
import Header from "../src/components/Header";

const mining = () => {
    return (
        <MainLayout>
            <Header title={`COVEST FINANCE: MINING`}></Header>
            <Mining></Mining>
        </MainLayout>
    );
};

export default mining;

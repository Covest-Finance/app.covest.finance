import Swap from "../src/views/Swap";
import MainLayout from "../src/layouts/MainLayout";
import Header from "../src/components/Header";

const swap = () => {
    return (
        <MainLayout>
            <Header title={`COVEST FINANCE: SWAP`}></Header>
            <Swap></Swap>
        </MainLayout>
    );
};

export default swap;

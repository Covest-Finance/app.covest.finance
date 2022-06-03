import ClaimSpecific from "../src/views/ClaimSpecific";
import MainLayout from "../src/layouts/MainLayout";
import Header from "../src/components/Header";

const mining = () => {
    return (
        <MainLayout>
            <Header title={`COVEST FINANCE: ClaimSpecific`}></Header>
            <ClaimSpecific></ClaimSpecific>
        </MainLayout>
    );
};

export default mining;

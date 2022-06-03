import MainLayout from "../src/layouts/MainLayout";
import Header from "../src/components/Header";
import ReferralView from "../src/views/Referral";

export default function Referral() {
    return (
        <MainLayout>
            <Header title={`COVEST FINANCE: Referral`}></Header>
            <ReferralView></ReferralView>
        </MainLayout>
    );
}

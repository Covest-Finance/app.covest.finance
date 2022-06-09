import TopSection from "./PoolView/TopSection";
import MainSection from "./PoolView/MainSection";
import useGetPool from "../../hooks/useGetPool";
const Index = () => {
  return (
    <div style={{ width: "100%" }}>
      <TopSection></TopSection>
      <MainSection></MainSection>
    </div>
  );
};

export default Index;

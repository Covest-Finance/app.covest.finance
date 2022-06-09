import * as React from "react";
import { useState, useEffect } from "react";
import TopSection from "./ActiveCoverView/TopSection";
import MainSection from "./ActiveCoverView/MainSection";

const Index = () => {
  return (
    <div style={{ width: "100%" }}>
      <TopSection></TopSection>
      <MainSection></MainSection>
    </div>
  );
};

export default Index;

import Hero from "./HomeView/Hero";
import Particle from "./HomeView/Particle";
const HomeView = () => {
    return (
        <div style={{ minHeight: "85vh", width: "100%" }}>
            <Particle></Particle>
            <Hero></Hero>
        </div>
    );
};

export default HomeView;

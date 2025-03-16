import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Testimony from "../components/TestimonySection";
import GroupList from "../components/GroupList";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {

    return (
        <>
            <Header/>
            <Hero />
            <About />
            <Testimony />
            <GroupList />
            <Contact />
            <Footer />
        </>
    );

};

export default Home;
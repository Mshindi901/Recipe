import WelcomePage from "../components/Welcome.jsx"
import Search from "../components/Search.jsx"
import AboutUs from "../components/About.jsx"
import Footer from "../components/Footer.jsx"
function Home(){
    return(
        <>
            <WelcomePage/>
            <Search/>
            <AboutUs/>
            <Footer/>
            
        </>
    )
}
export default Home
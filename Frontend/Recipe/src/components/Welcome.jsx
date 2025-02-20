import chef from '../assets/Images/home-cheff.png'
import NavBar from './NavBar.jsx'
function WelcomePage(){
    const name = localStorage.getItem('username')
    return(
        <>
            <div className='md:w-screen w-full h-fit bg-gray-800'>
                <NavBar />
                <div className='flex md:flex-row flex-col justify-evenly'>
                    <div className='flex flex-col justify-center gap-7 md:w-1/2 w-full'>
                        <h1 className='md:text-3xl text-2xl text-yellow-500'>Welcome to Recipe</h1>
                        <h2 className='text-2xl text-yellow-500'>Welcome {name} 🎉</h2>
                        <p className='text-xl text-white'>Recipe is a project I did to showcase my MERN stack development skills. In here you can search for recipes from food all over the world, you can create an account save all your favorite meals there</p>
                        <button className='w-max h-max text-white text-lg bg-red-500 rounded-lg px-12 py-2'>Explore!</button>
                    </div>

                    <img src={chef} alt="chef" className='md:w-auto max-w-full h-1/4 justify-center'/>
                </div>
            </div>
        </>
    )
}
export default WelcomePage
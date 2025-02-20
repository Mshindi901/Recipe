import {Link} from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
function NavBar(){
    return(
        <>
            <div className='w-screen h-fit flex justify-between p-4 bg-none'>
                <Link to="/"><h1 className='md:text-5xl text-3xl text-yellow-500'>Recipe</h1></Link>

                <nav>
                    <ul className='md:flex gap-4 hidden'>
                        <li className='text-white text-2xl'>About</li>
                        <li className='text-white text-2xl'>Contacts</li>
                        <li className='text-white text-2xl'>Donations</li>
                    </ul>
                </nav>

                <div className='md:flex hidden gap-3'>
                    <Link to="/forms"><button className='bg-red-500 text-xl text-white w-max h-max px-8 py-2 rounded-lg hover:bg-green-500'>Sign up</button></Link>
                    <Link to="/forms"><button className='bg-red-500 text-xl text-white w-max h-max px-8 py-2 rounded-lg hover:bg-green-500'>Sign in</button></Link>
                </div>

                <Link to="/forms"><button className='w-max h-max text-2xl text-red-500 md:hidden'><CgProfile/></button></Link>
            </div>
        </>
    )
}

export default NavBar;
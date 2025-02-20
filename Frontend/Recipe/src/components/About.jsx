import Cooking from '../assets/Images/About-cooking.png'

function AboutUs(){
    return(
        <>
            <div className='w-screen h-fit p-6 flex md:flex-row flex-col justify-evenly '>
                <div className='flex flex-col gap-4 md:w-1/3 w-full'>
                    <h1 className='text-3xl text-red-500'>About</h1>
                    <p className='text-xl text-black'>This project is a personal showcase of my UI/UX design skills and MERN stack development expertise. It’s not a commercial app but a demonstration of my ability to build modern, responsive, and user-friendly web applications.</p>
                    <button className='w-max h-max px-12 py-3 rounded-xl shadow-xl bg-red-500 text-white text-xl'>Contact</button>
                </div>

                <img src={Cooking} alt="" className='w-auto h-80'/>
            </div>
        </>
    )
}

export default AboutUs;
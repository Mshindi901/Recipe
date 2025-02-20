import {useState, useEffect} from 'react'
import Picture from '../assets/Images/Form-picture.jpg'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
function FormsPage(){
    const [regitserName, setregisterName] = useState("")
    const [regitserEmail, setregisterEmail] = useState("")
    const [regitserpassword, setregisterpassword] = useState("")

    const[loginEmail, setloginEmail] = useState("")
    const [loginPassword, setloginPassword] = useState("")
    const [isloggedin, setisloggeedin] = useState(false)
    const navigate = useNavigate()

    const [formdisplay, setformdisplay] = useState(false)
    const handleformdisplay = () => {
        setformdisplay(true)
    }

    const handleRegistrationFormSubmit = async (e) => {
        e.preventDefault()

        try {
            const saveUserResponse =  await axios.post('http://localhost:5000/api/register', {
                name: regitserName,
                email: regitserEmail,
                password: regitserpassword
            })
            console.log(saveUserResponse.data)
        } catch (error) {
            console.log(error)
        }
    }


    const handleLoginFormSubmit = async(e) => {
        e.preventDefault()
        try {
            const LoginResponse = await axios.post('http://localhost:5000/api/login',{
                email: loginEmail,
                password: loginPassword
            })
            console.log(LoginResponse.data)
            if(LoginResponse.data.success) {
                localStorage.setItem("username", LoginResponse.data.user.name)
                setisloggeedin(true)
            }
            navigate('/')
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleLogout = async () => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        setisloggeedin(false)
  
    }
    useEffect(() =>{
        const storedUser = localStorage.getItem("username")
        if(storedUser){
            setisloggeedin(true)
        }
    },[])

    return(
        <>
            <div className='w-screen h-screen flex justify-center items-center bg-slate-400'>
                {!isloggedin &&
                    <div className='md:w-2/3 w-full h-auto rounded-2xl shadow-xl flex md:flex-row flex-col gap-4 bg-slate-800'>
                        <div className='md:w-1/2 w-full h-[600px] p-2 rounded-xl bg-center bg-cover' style={{backgroundImage: `url(${Picture})`}}></div>
    
                        <div className='md:w-1/2 w-full p-2'>
                            {/*registration form*/}
                            {!formdisplay &&
                                <form action="" method="post" className="w-full h-auto flex flex-col gap-6 justify-between p-4 text-white" onSubmit={handleRegistrationFormSubmit}>
                                    <div className='flex flex-col justify-center items-center p-2 gap-4'>
                                        <h1 className='text-3xl text-red-500'>Welcome!</h1>
                                        <h3 className='text-xl text-red-500'>Already have an account<button className='w-max h-max text-blue-500 underline' onClick={handleformdisplay}>Login!</button></h3>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="name">Full Names</label>
                                        <input type="text" className="w-full py-2 border border-white rounded-xl outline-none" id="name" value={regitserName} onChange={(e) => setregisterName(e.target.value)}/>
                                    </div>
        
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="w-full py-2 border border-white rounded-xl outline-none" id="password" value={regitserEmail} onChange={(e) => setregisterEmail(e.target.value)}/>
                                    </div>
        
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="w-full py-2 border border-white rounded-xl outline-none" id="password" value={regitserpassword} onChange={(e) => setregisterpassword(e.target.value)}/>
                                    </div>
                                    <input type="submit" value="Register" className='w-full h-max py-3 rounded-xl bg-red-500 text-xl text-white' />
                                </form>
                            }
    
    
                            {/*Login form*/}
    
                            {formdisplay &&
                                <form action="" method="post" className='w-full h-full flex flex-col gap-6 justify-between p-4 text-white' onSubmit={handleLoginFormSubmit}>
                                    <div className='flex flex-col justify-center items-center p-2 gap-4 border-b border-white rounded-2xl'>
                                        <h1 className='text-3xl text-red-500'>Hello Again!</h1>
                                        <h3 className='text-xl text-white'>Please Enter all your details to sign in</h3>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="" id="email" className='w-full py-2 border border-white rounded-xl outline-none' value={loginEmail} onChange={(e) => setloginEmail(e.target.value)}/>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="" id="password" className='w-full py-2 border border-white rounded-xl outline-none' value={loginPassword} onChange={(e) => setloginPassword(e.target.value)}/>
                                    </div>
                                    <input type="submit" value="Login" className='w-full h-max py-3 rounded-xl bg-red-500 text-xl text-white'/>
                                </form>
                            }
    
                        </div>
                    </div>
                }
                {
                    isloggedin &&
                    <div className='md:w-2/3 w-full h-auto flex flex-col justify-center items-center gap-6'>
                        <h1 className='text-7xl text-red-500 text-center'>You are Logged in!</h1>
                        <h2 className='text-3xl text-amber-300'>Enjoy Our recipes☺️</h2>
                        <p className='text-white text-xl'>Do you want to <button className='w-max h-max text-xl text-blue-500 underline' onClick={handleLogout}>Logout!</button></p>
                    </div>
                }
            </div>


        </>
    )
}
export default FormsPage;
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HttmlURL = "http://localhost:4000/api/"


const LoginPage = () => {

    const navigate = useNavigate()
    const cookies = new Cookies(null, { path: '/', maxAge: 60 * 60 * 24 });

    const [isAuth, setIsAuth] = useState(cookies.get('token'))
    const [isLoading, setIsLoading] = useState(false)
    const [userDetails, setUserDetails] = useState({
        email: "123@gm.com",
        password: "123@gm.com"
    })


    const handleChanges = (event) => {

        setUserDetails(
            { ...userDetails, [event.target.name]: event.target.value }
        )

    }



    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            setIsLoading(true)
            const response = await axios.post((HttmlURL + "login"), userDetails)
            const token = response.data.token
            cookies.set('token', token)

            setIsLoading(false)

            navigate("/")

        } catch (error) {
            console.log(error)
            toast.error((error.response.data).toString(), {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });

        }


    }

    useEffect(() => {

        if (isAuth) {
            navigate("/")
        }

    }, [isAuth])



    return (
        <div className="min-h-screen flex items-center justify-center w-full">
            {
                isLoading ?
                    <div className="flex flex-col justify-center items-center" >
                        <p>Please Wait, it's on free server can take upto 30-90 sec</p>
                        <div
                            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                            role="status">

                            <span
                                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                            >Loading...</span>
                        </div></div>
                    :
                    <div className="bg-white w-96  shadow-md rounded-lg px-8 py-6 max-w-md">
                        <h1 className="text-2xl font-bold text-center mb-4 ">Login</h1>
                        <form onSubmit={handleSubmit} >
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700  mb-2">Email Address</label>
                                <input value={userDetails.email} onChange={handleChanges} name="email" type="email" id="email" className="shadow-sm bg-sky-100  rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700  mb-2">Password</label>
                                <input value={userDetails.password} onChange={handleChanges} name="password" type="password" id="password" className="shadow-sm bg-sky-100 rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required />

                            </div>
                            <ToastContainer />
                            <div className="flex items-center justify-between mb-4">

                                <a href="/signup"
                                    className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create
                                    Account</a>
                            </div>
                            <div className="flex flex-col items-center justify-center " >
                                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
                                <span className="flex flex-col justify-center items-center text-gray-400 text-center" >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 mt-2 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                    </svg>
                                    Login With Demo Account
                                </span>
                            </div>
                        </form>
                    </div>}
        </div>
    )

}

export default LoginPage;
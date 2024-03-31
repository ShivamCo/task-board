
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom"

const Header = () => {

    const navigate = useNavigate()

    const cookies = new Cookies(null, { path: '/' });

    const [isAuth, setIsAuth] = useState(cookies.get('token'));

    const handleLogout = (event) => {

        cookies.remove('token')
        navigate('/login')


    }


    useEffect(() => {

        if (!isAuth) {
            navigate("/login")
        }


    }, [isAuth])


    return (
        <>

            {

                isAuth ?


                    <nav className=" z-10 shadow-lg bg-gray-200 shadow-gray-300 w-100 px-8 md:px-auto">
                        <div className="md:h-20 h-20 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">

                            <button onClick={()=>navigate('/')} className=" flex flex-col items-center justify-center text-indigo-500 md:order-1">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
                                </svg>
                                <span className=' font-semibold ' >Task Board</span>

                            </button>

                            <div className="order-2 md:order-3">
                                <button onClick={handleLogout} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-gray-50 rounded-xl flex items-center gap-2">

                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </nav>

                    :
                    <> </>

            }
        </>

    )

}

export default Header
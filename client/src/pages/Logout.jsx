import React, {useState} from 'react'
import AuthHeader from '../components/AuthHeader'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {Puff} from 'react-loader-spinner'

export default function LogoutPage(){

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const userNameCookie = document.cookie.split(';').find(cookie => cookie.includes('userName'));
    const userName = userNameCookie ? userNameCookie.split('=')[1] : '';

    const handleLogout = async() => {
        // console.log("done")
        setLoading(true);
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setTimeout(() => {
            toast.success('Logged out successfully');
            setLoading(false);
            window.location.href = '/login';
        }, 1500);
    }


    return(
        <div className='flex h-screen flex-col w-full justify-center items-center'> 
             <AuthHeader
                heading="Logout from your account"
                paragraph="Don't want to exit yet?"
                linkName="Go to Home"
                linkUrl="/"
                userName = {userName}
                />
            
            
            {loading ? <Puff
                visible={true}
                height="80"
                width="80"
                color="#E22926"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
            /> : <input 
            className='text-red-600 p-3 text-lg rounded-lg cursor-pointer border border-red-700 hover:bg-red-500 hover:text-white transition duration-300 ease-in-out mt-5 text-center'
            type="submit" 
            value='Logout' 
            onClick={handleLogout} />}
            <ToastContainer />
        </div>
    )
}
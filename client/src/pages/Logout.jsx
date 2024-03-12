import React from 'react'
import AuthHeader from '../components/AuthHeader'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function LogoutPage(){

    const navigate = useNavigate();
    const userName = document.cookie.split(';').find(cookie => cookie.includes('userName')).split('=')[1] || '';

    const handleLogout = async() => {
        console.log("done")
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        toast.success('Logged out successfully');
        setTimeout(() => {
            navigate('/login')
        }, 2000);
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
            <input 
            className='text-red-600 p-3 text-lg rounded-lg cursor-pointer border border-red-700 hover:bg-red-500 hover:text-white transition duration-300 ease-in-out mt-5 text-center'
            type="submit" 
            value='Logout' 
            onClick={handleLogout} />
            <ToastContainer />
        </div>
    )
}
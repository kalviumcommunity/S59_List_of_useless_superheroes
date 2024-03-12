import AuthHeader from  "../components/AuthHeader";
import SignupComponent from "../components/SignupComponent";

export default function SignupPage(){
    return(
        <div className='flex h-screen flex-col w-full justify-center items-center'> 
            <AuthHeader
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/login"
            />
            <SignupComponent/>
        </div>
    )
}
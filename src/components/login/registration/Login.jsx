import registration from './Ragistration.module.css';
import login from '../../../images/signin.png';
import google from '../../../images/google-icon.png'
import facebook from '../../../images/facebook-circle.png'
import insta from '../../../images/instagram.png'
import { useNavigate } from 'react-router-dom';
import { useAuthState, useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebase.init';
import { useEffect, useState} from 'react';
import { toast } from 'react-toastify';


const Login = () => {
    const [user] = useAuthState(auth)
 
    console.log(user?.email)
    const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
    const [emailReset, setEmailReset] = useState('');

      const actionCodeSettings = {
        url: 'http://localhost:5173/',
      };

    const [errorHolder, setErrorHolder] = useState('');

    const [
        signInWithEmailAndPassword,
      
        // eslint-disable-next-line no-unused-vars
        userLogin, loading, error
      ] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    const navigate = useNavigate();
   

    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

       
            if(email === import.meta.env.VITE_ADMIN_EMAIL){
                await signInWithEmailAndPassword(email, password)
                    .then(res => {
                    if(res){
                        navigate('/dashboard')
                        toast.success('successfully signed in')
                    }
                })
            }else{
                toast.error('sorry you are not admin')
            }
    }


   useEffect(() => {
    if(error){
        setErrorHolder(error?.code)
    }
   },[error])


    

    return (
        <div className={`${registration.main}`}>
            <div className={`${registration.one} flex`}>
                <img style={{width:'95%'}} src={login} alt="" />
           </div>
            <div className={`${registration.two} `}>
                <p onClick={() => navigate('/signup')} className={registration.signInUp} style={{position:'absolute', top:'10px', right:'30px'}}>SIGN UP</p>
               
                <p style={{position:'absolute', top:'10px', left:'0', color:'red', fontStyle:'italic'}}>{errorHolder ? errorHolder : ''}</p>

               
                <div className={`${registration.twoContainer}`}>
                    <p className={`${registration.twoTitle} `}>SIGN IN</p>
                    <p className={`${registration.sub_title} `}>Create new account for sign in</p>
                    <br />
                    <form action="" onSubmit={handleSubmitLogin}>
                        <label htmlFor="">Email Address</label>
                        <br />
                        <input type="text" name="email" id=""
                        onChange={(e) => setEmailReset(e.target.value)}
                        />
                        <br />
                        <br />
                        <label htmlFor="">Password</label>
                        <br />
                        <input type="text" name="password" id="" />
                        <div className={`${registration.forgetPass} flex_end `}
                         onClick={async () => {
                            const success = await sendPasswordResetEmail(
                             emailReset,
                              actionCodeSettings
                            );
                            if(emailReset){
                                if (success) {
                                    alert('Sent email');
                                  }
                            }else{
                                toast.error('please type email to change password')
                            }
                          }}
                        >
                            change password!
                        </div>
                        <div className={`${registration.btnAndGoogleSignIn} flex `}>
                            <div style={{width:'200px', height:'130px'}} className=''>
                                <button type='submit'  className={registration.signup} style={{margin:'auto',textAlign:'center', padding:'5px 0',  width:'100px', borderRadius:'5px', fontWeight:'bold'}}>Sign In</button>
                                <p style={{textAlign:'center', fontWeight:'bold'}}>Or</p>
                                <p style={{margin:'10px 0', padding:'0', textAlign:'center', color:'#5E5E5E'}}>Sign in with</p>
                                <div className='flex_between' style={{margin:'auto', width:'150px'}}>
                                <img onClick={async() => {
                                      await signInWithGoogle().then(res => {
                                            if(res){
                                                
                                                toast.success('successfully logged in with google');
                                                setTimeout(() => {
                                                    navigate('/dashboard');
                                                    console.log('hello')
                                                }, 6000) 
                                            }
                                        })         
                                    }} style={{width:'30px', height:'30px', cursor:'pointer'}} src={google} alt="" />
                                    <img style={{width:'30px', height:'30px'}} src={facebook} alt="" />
                                    <img style={{width:'30px', height:'30px'}} src={insta} alt="" />
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                    </form>
                </div>
           </div>
        </div>
    );
};

export default Login;
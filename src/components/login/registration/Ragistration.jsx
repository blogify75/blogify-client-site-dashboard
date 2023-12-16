import registration from './Ragistration.module.css';
import signup from '../../../images/signup.png';
import google from '../../../images/google-icon.png'
import facebook from '../../../images/facebook-circle.png'
import insta from '../../../images/instagram.png'
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase/firebase.init';
import { useAuthState, useCreateUserWithEmailAndPassword, useSendEmailVerification, useSignInWithGoogle, useUpdateProfile} from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';


const Ragistration = () => {

   
    const [user] = useAuthState(auth);
    const [signInWithGoogle] = useSignInWithGoogle(auth);

  
    const navigate = useNavigate();

    const [updateProfile] = useUpdateProfile(auth);
    const [sendEmailVerification] = useSendEmailVerification(auth);

    const [
        createUserWithEmailAndPassword,
        loading,
      ] = useCreateUserWithEmailAndPassword (auth);

      
    


      const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        if(email && password && name){
            await createUserWithEmailAndPassword(email, password).then(res => {
                if(res){
                    toast.success('successfully signed up');
                    navigate('/');
                }
            }).catch(error => {
                if(error){
                    toast.error('failed sign up')
                }
            })
            await updateProfile({displayName: name}).then(res => console.log(res));
            await sendEmailVerification(auth.currentUser).then(
                () => {
                    toast.success("an email has been sent. please check!");
                    console.log('sent');
                }
            )
            
        }else{
            toast.error('please prodvide your name, email and password')
        }
      }

    return (
        <div className={`${registration.main}`}>
            <div className={`${registration.one} flex`}>
                <img style={{width:'95%'}} src={signup} alt="" />
           </div>
            <div className={`${registration.two} `}>
            <p onClick={() => navigate('/')} className={registration.signInUp} style={{position:'absolute', top:'10px', right:'30px'}}>SIGN IN</p>
           
           
                <div className={`${registration.twoContainer} `}>
                    <p className={`${registration.twoTitle} `}>SIGN UP</p>
                    <p className={`${registration.sub_title} `}>Create new account for sign up</p>
                    <br />
                    <form action="" onSubmit={handleSubmit}>
                        <label htmlFor="">Name</label>
                        <br />
                        <input type="text" name="name" id="" />
                        <br />
                        <br />
                        <label htmlFor="">Email Address</label>
                        <br />
                        <input type="text" name="email" id="" />
                        <br />
                        <br />
                        <label htmlFor="">Password</label>
                        <br />
                        <input type="text" name="password" id="" />
                        
                        <div className={`${registration.btnAndGoogleSignIn} flex `}>
                            <div style={{width:'200px', height:'130px'}} className=''>
                                {
                                    user?.email
                                    ?
                                    <div className={registration.signup} style={{textAlign:'center', padding:'5px 0',  width:'220px', borderRadius:'5px', fontWeight:'bold'}}>you are already signed up</div>
                                    :
                                    <button type='submit' className={registration.signup} style={{margin:'auto',textAlign:'center', padding:'5px 0',  width:'100px', borderRadius:'5px', fontWeight:'bold'}}>{loading ? 'loading...' : 'Sign Up'}</button>
                                    
                                }
                                <p style={{textAlign:'center', fontWeight:'bold'}}>Or</p>
                                <p style={{margin:'10px 0', padding:'0', textAlign:'center', color:'#5E5E5E'}}>Registration with</p>
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
                                    <img
                                    onClick={() => toast.error('not available yet')}
                                    style={{width:'30px', height:'30px',cursor:'pointer'}} src={facebook} alt="" />
                                    <img
                                     onClick={() => toast.error('not available yet')}
                                    style={{width:'30px', height:'30px',cursor:'pointer'}} src={insta} alt="" />
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

export default Ragistration;
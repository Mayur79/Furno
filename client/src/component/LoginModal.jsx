import React, { useRef, useEffect,useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
const Modal = ({ type, onClose, onSwitch }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const modalRef = useRef();
  const { logIn } = useAuth();
  const [user, setUser] = useState([]);
  const handleSwitchClick = (e) => {
    e.preventDefault();
    onSwitch();
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        if (!name || !email || !password || !confirmPassword) {
            toast.error('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/signup`, { name, email, password, confirmPassword });
        if (res && res.data.success) {
          onClose();
            navigate("/about");
        } else {
            console.log(res.data.message);
        }
    } catch (error) {
        console.log(error);
    }
};
 
useEffect(() => {
  if(type==='login'){
  if (user) {
      axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
              headers: {
                  Authorization: `Bearer ${user.access_token}`,
                  Accept: 'application/json',
              },
          })
          .then((res) => {
              axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/googleLogin`, { profile: res.data }).then((response) => {
                  console.log('User register successfully', response.data);
                  const token = response.data.token;
                  logIn(response.data, token);
                  localStorage.setItem('auth', JSON.stringify(response.data));
                  window.location.reload();
              });
          })
          .catch((err) => console.log(err));
  }
}
}, [user]);
const handleGoogleRegister = useGoogleLogin({
  onSuccess: (codeResponse) => {
      setUser(codeResponse);
      toast.success("User registered successfully", {
          autoClose: 1000,
      });
  },
  onError: (error) => console.log('Login Failed:', error)
});
useEffect(() => {
  if(type!='login'){

 
  if (user) {
      const res = axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
              headers: {
                  Authorization: `Bearer ${user.access_token}`,
                  Accept: 'application/json',
              },
          })
          .then((res) => {
              axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/storeUserData`, { profile: res.data }).then((response) => {
                  console.log('User data stored successfully:', response.data);
                  navigate('/about');
                  window.location.reload();
              });
          })
          .catch((err) => console.log(err));
  }
}
}, [user]);


const handleGoogleLogin = useGoogleLogin({
  onSuccess: (codeResponse) => {
      setUser(codeResponse);
      toast.success("User login successfully");
      logIn(codeResponse);
  },
  onError: (error) => console.log('Login Failed:', error)
});


const handleLogin = async (e) => {
  e.preventDefault();
  try {
      const startTime = new Date(); // Record start time

      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`, { email, password });
      
      if (res && res.data.success) {
        const token = res.data.token;
                logIn(res.data, token);
                localStorage.setItem('auth', JSON.stringify(res.data));

          const endTime = new Date(); // Record end time
          const timeTaken = (endTime - startTime) / 1000; // Calculate time taken in seconds

          // Display success toast with time taken
          toast.success(`Login successful. Redirecting in ${timeTaken} seconds`, {
            onClose: () => {
                // Reload the page after displaying the toast
                window.location.reload();
            },
        });
      } else {
          toast.error(res.data.message);
      }
  } catch (error) {
      console.log(error)
      toast.error("Something went wrong");
  }
}

const handleSubmit = (e) => {
  if (type === 'login') {
    handleLogin(e);
  } else {
    handleRegister(e);
  }
};
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={onClose}
      ></div>
      <div
        ref={modalRef}
        className="z-50 w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            {type === 'login' ? 'Sign in to your account' : 'Sign up to your account'}
          </h1>
          <form className="space-y-4 md:space-y-6"  onSubmit={handleSubmit}>
            {type !== 'login' && (
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {type !== 'login' && (
           <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
             Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            )}
            {type === 'login' && (
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Forgot password?
                </a>
              </div>
            )}
            <button
              type="submit"
              
              className="w-full text-white bg-[#1e3a8a] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {type === 'login' ? 'Sign in' : 'Sign Up'}
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              {type === 'login' ? (
                <>
                  Don’t have an account yet?{' '}
                  <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={handleSwitchClick}>
                    Sign Up
                  </a>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={handleSwitchClick}>
                    Login
                  </a>
                </>
              )}
            </p>
          </form>
          {type==='login'?(
            <div className='mt-4 flex items-center justify-center'>
                            <button onClick={handleGoogleLogin} class="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-grey-900 hover:border-slate-400 dark:hover:border-slate-500 hover:text-grey-950 font-bold hover:shadow transition duration-150">
                                <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google logo" />
                                <span>SignIn with Google</span>
                            </button>
                        </div>
          ):(
            <div className='mt-2 flex items-center justify-center'>


            <button onClick={handleGoogleRegister} class="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                <span>SignUp with Google</span>
            </button>
        </div>
          )}
          
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Modal;

import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate("/");
        }
      });
  }, [])
       
  const handleLogin = (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/")
          console.log(user);
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
          if(errorCode == 'auth/wrong-password') {
            setError('Wrong email or password')
          }
      });
      
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 mx-auto">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Welcome back
          </h1>
          
          <div className="flex items-center gap-4">
            <Link to="#" className="flex items-center gap-2 border border-gray-300 px-4 py-2.5 w-1/2 rounded-lg font-semibold text-sm leading-4 hover:bg-gray-300"><FcGoogle className="w-5 h-5"></FcGoogle>Login with Google</Link>
            <Link to="#" className="flex items-center gap-2 border border-gray-300 px-4 py-2.5 w-1/2 rounded-lg font-semibold text-sm leading-4 hover:bg-gray-300"><BsGithub className="w-5 h-5"></BsGithub>Login with Github</Link>
          </div>

          <div className="flex items-center gap-3 text-center">
            <div className="w-1/2 border rounded border-gray-300"></div>
            <div className="font-semibold text-sm">or</div>
            <div className="w-1/2 border rounded border-gray-300"></div>
          </div>

          
          <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
              <input onChange={(e)=>setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" placeholder="email" required />
              {error && <div className="text-red-500 font-bold text-xs">{error}</div>}

            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input onChange={(e)=>setPassword(e.target.value)} minLength="6" type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" required/>
            </div>
            <button type="submit" className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
            <p className="text-sm font-light text-gray-500">
              Don't have an account yet? <Link to="/register" className="font-medium text-primary hover:underline">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;
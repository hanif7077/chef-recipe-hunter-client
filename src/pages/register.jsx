import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {  createUserWithEmailAndPassword, updateProfile, onAuthStateChanged  } from 'firebase/auth';
import { auth } from '../firebase';

function Register() {const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate("/");
        }
      });
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoUrl
          })

          console.log(user);
          navigate("/")
          // ...
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ..
      });
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 mx-auto">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Create New Account
          </h1>
          
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your name</label>
              <input onChange={(e) => setName(e.target.value)}  type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" placeholder="name" required />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
              <input onChange={(e) => setEmail(e.target.value)}  type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" placeholder="email" required />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input onChange={(e) => setPassword(e.target.value)} minLength="6" type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" required />
            </div>
            <div>
              <label htmlFor="photo_url" className="block mb-2 text-sm font-medium text-gray-900">Photo Url</label>
              <input onChange={(e) => setPhotoUrl(e.target.value)} type="url" name="photo_url" id="photo_url" placeholder="https://" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" required />
            </div>
            <button type="submit" className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign up</button>
            <p className="text-sm font-light text-gray-500">
              Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import 'react-toastify/dist/ReactToastify.css';

function Root() {
  const route = useLocation();
  let [user, setUser] = useState('');
  let [isOpenMenu, setIsOpenMenu] = useState(false);

  const routes = [
    {name: 'Home', path: '/'},
    {name: 'Blog', path: '#'},
  ]

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser({name: user.displayName, email: user.email, photo: user.photoURL});
        }
      });
  }, [])

  const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        location.href = "/login";
        console.log("Signed out successfully")
    }).catch((error) => {
    // An error happened.
    });
  }

  return (
    <>
      <div className="bg-gray-100 px-16 py-6 min-h-screen">
        <header className="flex items-center justify-between">
          <Link to="/" className="text-gray-700 text-3xl font-semibold">Fôôdy</Link>
          <div className="flex items-center justify-center gap-8 md:justify-end">
            {routes.map(item => 
              <Link
                to={item.path}
                key={item.name}
                className={`font-bold text-sm hover:text-primary uppercase ${route.pathname == item.path ? 'text-primary' : 'text-secondary-200'}`}
              > {item.name}</Link>
            )}

            {user && <div className="flex items-center relative md:order-2">
              <button onClick={() => setIsOpenMenu(!isOpenMenu)} type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300">
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src={user.photo ? user.photo : `https://ui-avatars.com/api/?name=${user.name}`} title={user.name} />
              </button>
              <div className={`z-50 ${isOpenMenu ? '' : 'hidden'} absolute top-5 right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow`}>
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900">{user.name}</span>
                  <span className="block text-sm  text-gray-500 truncate">{user.email}</span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <a onClick={() => handleLogout()} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                  </li>
                </ul>
              </div>
            </div>}

            { !user && <Link to="/login"
                className={`btn font-bold text-sm border-2  rounded-full hover:text-white hover:bg-primary hover:border-primary uppercase ${route.pathname == '/login' ? 'text-primary border-primary' : 'text-secondary-200 border-secondary-200'}`}
              > Log in</Link> }
          </div>
        </header>
        <Outlet />
        <footer>
          <p className="text-center text-gray-500">© {new Date().getFullYear()} All Rights Reserved</p>
        </footer>
        <ToastContainer />
      </div>
    </>
  );
}

  export default Root;
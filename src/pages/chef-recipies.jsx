import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FcLike } from 'react-icons/fc'
import { toast } from 'react-toastify';
import axios from '../axios';

function ChefRecipies() {
  const [chef, setChef] = useState({});
  const param = useParams();

  useEffect(() => {
    axios.get(`/chefs/${param.id}`).then(res => {
      console.log(res)
      setChef(res.data);
    }).catch(err => console.log(err.message));
  }, []);

  const notify = () => toast("Recipe added to favorites!");

  return (
    <>
      {chef ? <div className="container">
        <div className="relative bg-white shadow-lg rounded-lg px-8 py-6 my-10">
          <div className="flex items-center gap-2">
            <img className="w-20 h-20 rounded-full mr-4" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="Chef Name"/>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{chef.name}</h1>
              <p className="text-gray-700 text-sm mt-1">{chef.experience} Years of Experience</p>
              <p className="text-gray-700 text-sm mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lobortis consequat dapibus. Vestibulum eleifend elit ac nulla commodo, vel consectetur tortor maximus. In in lorem sapien. Vivamus euismod gravida ex, vel ullamcorper ipsum vehicula a. Proin ac leo massa. Donec sed tristique urna.</p>
            </div>
          </div>

          <div className="absolute top-2 right-2 flex items-center gap-2">
            <div className="badge">
              <FcLike className="w-4 h-4"></FcLike>
              <span>{chef.likes}</span>
            </div>
            <span className="left-20 badge">{chef.recipes?.length} recipies</span>
          </div>
        </div>
        <div className="bg-white shadow-md rounded my-6">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Recipe Name</th>
                <th className="py-3 px-6 text-left">Ingredients</th>
                <th className="py-3 px-6 text-left">Cooking Method</th>
                <th className="py-3 px-6 text-center">Rating</th>
                <th className="py-3 px-6 text-center">Favorite</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {chef.recipes?.length > 0 && chef.recipes.map((reipe, i) =>
              <tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{reipe.recipeName}</td>
                <td className="py-3 px-6 text-left">{reipe.ingredients}</td>
                <td className="py-3 px-6 text-left">{reipe.cookingMethod}</td>
                <td className="flex items-center gap-1 py-3 px-6 text-center">{reipe.rating}</td>
                <td className="py-3 px-6 text-center"><button onClick={notify} className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"><FcLike></FcLike></button></td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div> : <div>No chef found</div>}
    </>
  )
}

export default ChefRecipies;
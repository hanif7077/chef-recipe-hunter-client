import { Link } from 'react-router-dom';
import { FcLike } from 'react-icons/fc'

const ChefCard = ({ chef }) => {
  return (
    <div className="card">
      <img
        src={chef.image}
        alt="stew"
        className="w-full h-32 sm:h-48 object-cover"
      />
      <div className="m-4">
        <div className="flex items-center justify-between">
          <span className="font-bold">{chef.name}</span>
        </div>
        <span className="block text-gray-500 text-sm">{chef.experience} years of experience</span>
        <Link to={`/chef/${chef.id}/recipies`} className="btn text-white bg-primary rounded-full mt-4 inline-block">View Recipies</Link>
      </div>

      <div className="absolute top-2 left-2 flex items-center gap-2">
        <div className="badge">
          <FcLike className="w-4 h-4"></FcLike>
          <span>{chef.likes}</span>
        </div>
        <span className="left-20 badge">{chef.recipes?.length} recipies</span>
      </div>
    </div>
  );
};

export default ChefCard;
import { useRouteError } from "react-router-dom";
import NotFound from '../assets/404.png'

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="grid place-items-center min-h-screen">
      <div className="text-center space-y-2">
        <img src={NotFound} alt="" />
      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';

const MarketingPage = () => (
  <div>
    <div className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
      Passiv Orthodox
    </div>
    <div className="text-xl mt-2">
      Everything you need, nothing you don't
    </div>
    <Link to="/dashboard">Login</Link>
  </div>
);

export default MarketingPage;
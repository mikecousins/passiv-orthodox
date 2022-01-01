import { Link } from 'react-router-dom';

const MarketingPage = () => (
  <div>
    <div className="text-2xl font-serif">
      Passiv Orthodox
    </div>
    <div>
      Everything you need, nothing you don't
    </div>
    <Link to="/dashboard">Login</Link>
  </div>
);

export default MarketingPage;
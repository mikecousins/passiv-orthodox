import { Link } from '@remix-run/react';

const MarketingPage = () => (
  <div className="text-center">
    <div className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
      Passiv Orthodox
    </div>
    <div className="text-xl mt-2">Everything you need, nothing you don't</div>
    <div className="mt-8">
      <Link
        to="/login"
        className="w-1/2 px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 md:py-4 md:text-lg md:px-10"
      >
        Let's Go
      </Link>
    </div>
  </div>
);

export default MarketingPage;

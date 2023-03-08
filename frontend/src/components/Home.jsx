import { Link } from 'react-router-dom';

const Home = () => (
  <div className="d-flex flex-column justify-content-center align-items-center vh-100">
    <h1 className="text-center mb-4">Home page</h1>
    <Link to="/login">Login</Link>
  </div>
);
export default Home;

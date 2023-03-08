import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import PageNotFound from './PageNotFound.jsx';
import Home from './Home.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;

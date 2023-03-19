import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';
import init from './init.jsx';

const app = async () => {
  const socket = io();
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  const vdom = await init(socket);
  root.render(vdom);
};

app();

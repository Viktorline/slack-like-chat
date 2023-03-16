import addNewChannel from './AddNewChannel.jsx';
import removeChannel from './RemoveChannel.jsx';

const modals = { addNewChannel, removeChannel };

const getModal = (modalType) => modals[modalType];

export default getModal;

import addNewChannel from './AddNewChannel.jsx';

const modals = { addNewChannel };

const getModal = (modalType) => modals[modalType];

export default getModal;

import addNewChannel from './AddNewChannel.jsx';
import removeChannel from './RemoveChannel.jsx';
import renameChannel from './RenameChannel.jsx';

const modals = { addNewChannel, removeChannel, renameChannel };

const getModal = (modalType) => modals[modalType];

export default getModal;

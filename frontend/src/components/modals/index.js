import addNewChannel from './AddNewChannel.jsx';
import removeChannel from './RemoveChannel.jsx';
import renameChannel from './RenameChannel.jsx';

const modals = { addNewChannel, removeChannel, renameChannel };

const getModal = (modalType) => modals[modalType];

export default getModal;

// import Add from './AddNewChannel.jsx';
// import Remove from './RemoveChannel.jsx';
// import Rename from './RenameChannel.jsx';

// const modals = {
//   adding: Add,
//   removing: Remove,
//   renaming: Rename,
// };

// const getModal = (modalType) => modals[modalType];

// export default getModal;

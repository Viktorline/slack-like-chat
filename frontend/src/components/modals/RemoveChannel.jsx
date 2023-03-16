import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSocket } from '../../hooks/index.js';

const Remove = (props) => {
  const { onHide, id } = props;
  const chat = useSocket();

  const handleRemove = (channelId) => {
    chat.removeChannel(channelId);
    onHide();
  };

  console.log(id);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Delete channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Sure?</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" type="submit" variant="danger" onClick={() => handleRemove(id)}>
            Delete
          </Button>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;

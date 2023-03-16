import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const Remove = (props) => {
  const { onHide, id } = props;
  console.log(id);

  return (
    <Modal>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Delete channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Sure?</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={onHide}>Cancel</Button>
          <Button type="submit" variant="danger">Delete</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;

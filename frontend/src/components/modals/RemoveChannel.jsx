import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../hooks/index.js';

const Remove = (props) => {
  const { onHide, id } = props;
  const chat = useSocket();
  const { t } = useTranslation();

  const handleRemove = (channelId) => {
    chat.removeChannel(channelId);
    onHide();
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modal.remove.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.remove.sure')}</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" type="submit" variant="danger" onClick={() => handleRemove(id)}>
            {t('modal.remove.delete')}
          </Button>
          <Button variant="secondary" onClick={onHide}>
            {t('modal.remove.cancel')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;

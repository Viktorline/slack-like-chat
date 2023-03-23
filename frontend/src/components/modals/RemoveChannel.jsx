import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useSocket } from '../../hooks/index.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';

const Remove = () => {
  const dispatch = useDispatch();
  const chat = useSocket();
  const { t } = useTranslation();
  const itemId = useSelector((state) => state.modals.itemId);

  const handleRemove = (channelId) => {
    chat.removeChannel(channelId);
    toast.success(t('modal.remove.success'));
    dispatch(modalsActions.hideModal());
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(modalsActions.hideModal())}>
        <Modal.Title>{t('modal.remove.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.remove.sure')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            type="submit"
            variant="danger"
            onClick={() => handleRemove(itemId)}
          >
            {t('modal.remove.delete')}
          </Button>
          <Button variant="secondary" onClick={() => dispatch(modalsActions.hideModal())}>
            {t('modal.remove.cancel')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;

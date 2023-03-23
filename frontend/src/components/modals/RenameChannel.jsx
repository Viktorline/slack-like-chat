import { useFormik } from 'formik';
import leoProfanity from 'leo-profanity';
import React, { useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useSocket } from '../../hooks/index.js';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';

const Rename = () => {
  const dispatch = useDispatch();
  const inputEl = useRef();
  const chat = useSocket();
  const { t } = useTranslation();

  const channels = useSelector(channelsSelectors.selectAll);
  const itemId = useSelector((state) => state.modals.itemId);
  const currentChannel = channels.find((channel) => channel.id === itemId);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, t('inputRequirements'))
      .max(20, t('inputRequirements'))
      .notOneOf(
        channels.map((channel) => channel.name),
        t('modal.yup.exist'),
      )
      .required(t('modal.yup.required')),
  });

  const formik = useFormik({
    initialValues: {
      name: currentChannel.name,
    },
    validationSchema,
    onSubmit: (values) => {
      const cleanedName = leoProfanity.clean(values.name);
      chat.renameChannel({ id: itemId, name: cleanedName });
      toast.success(t('modal.rename.success'));
      dispatch(modalsActions.hideModal());
    },
  });

  useEffect(() => {
    inputEl.current.select();
  }, []);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(modalsActions.hideModal())}>
        <Modal.Title>{t('modal.rename.header')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            className="mb-2"
            onChange={formik.handleChange}
            ref={inputEl}
            id="name"
            name="name"
            value={formik.values.name}
            isInvalid={formik.errors.name && formik.touched.name}
            autoComplete="off"
          />
          <Form.Label htmlFor="name" className="visually-hidden">
            {t('modal.rename.name')}
          </Form.Label>
          <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button type="submit" variant="primary" className="me-2">
              {t('modal.rename.rename')}
            </Button>
            <Button variant="secondary" onClick={() => dispatch(modalsActions.hideModal())}>
              {t('modal.rename.cancel')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;

import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import * as yup from 'yup';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useSocket } from '../../hooks/index.js';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';

const Rename = (props) => {
  const { onHide, id } = props;
  const inputEl = useRef();
  const chat = useSocket();
  const { t } = useTranslation();

  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannel = channels.find((channel) => channel.id === id);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, t('modal.yup.min'))
      .max(20, t('modal.yup.max'))
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
      const { name } = values;
      chat.renameChannel(id, name);
      onHide();
    },
  });

  useEffect(() => {
    inputEl.current.select();
  }, []);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
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
          />
          <Form.Label htmlFor="name" className="visually-hidden">
            {t('modal.rename.name')}
          </Form.Label>
          <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button type="submit" variant="primary" className="me-2">
              {t('modal.rename.rename')}
            </Button>
            <Button variant="secondary" onClick={onHide}>
              {t('modal.rename.cancel')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;

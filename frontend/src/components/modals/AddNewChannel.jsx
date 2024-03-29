import { useFormik } from 'formik';
import leoProfanity from 'leo-profanity';
import React, { useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useSocket } from '../../hooks/index.js';
import {
  actions as channelsActions,
  selectors as channelsSelectors,
} from '../../slices/channelsSlice.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';

const Add = () => {
  const dispatch = useDispatch();
  const inputEl = useRef();
  const chat = useSocket();
  const { t } = useTranslation();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const channels = useSelector(channelsSelectors.selectAll);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
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
      name: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const cleanedName = leoProfanity.clean(values.name);
      console.log(channelsSelectors);
      const callback = (id) => dispatch(channelsActions.setCurrentChannelId(id));
      chat.addNewChannel({ name: cleanedName }, callback);

      toast.success(t('modal.add.success'));
      dispatch(modalsActions.hideModal());
    },
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(modalsActions.hideModal())}>
        <Modal.Title>{t('modal.add.header')}</Modal.Title>
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
            {t('modal.add.name')}
          </Form.Label>
          <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button className="me-2" type="submit" variant="primary">
              {t('modal.add.create')}
            </Button>
            <Button variant="secondary" onClick={() => dispatch(modalsActions.hideModal())}>
              {t('modal.add.cancel')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;

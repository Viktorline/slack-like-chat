import { useFormik } from 'formik';
import leoProfanity from 'leo-profanity';
import React, { useEffect, useRef } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { useAuth, useSocket } from '../../hooks/index.js';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import { selectors as messagesSelectors } from '../../slices/messagesSlice.js';
import Message from './Message.jsx';

const Messages = () => {
  const inputRef = useRef();
  const lastMessageRef = useRef();
  const auth = useAuth();
  const chat = useSocket();
  const { t } = useTranslation();

  leoProfanity.clearList();
  leoProfanity.add(leoProfanity.getDictionary('en'));
  leoProfanity.add(leoProfanity.getDictionary('ru'));

  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannel = useSelector(
    (state) => channelsSelectors.selectById(state, currentChannelId),
  );
  const messages = useSelector(messagesSelectors.selectAll);
  const currentMessages = messages.filter(
    (currentMessage) => currentMessage.channelId === currentChannelId,
  );

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    lastMessageRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  }, [currentMessages]);

  const validationSchema = yup.object().shape({
    body: yup.string().trim().required(),
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const { body } = values;
      const cleanedMessage = leoProfanity.clean(body);
      const channelId = currentChannelId;
      const { username } = auth.user;
      const data = {
        body: cleanedMessage,
        channelId,
        username,
      };
      chat.addNewMessage(data);
      formik.resetForm();
    },
  });

  const messagesRender = () => {
    if (currentMessages.length === 0) {
      return null;
    }
    return currentMessages.map((message) => <Message key={message.id} content={message} />);
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannel?.name}`}</b>
          </p>
          <span className="text-muted">
            {currentMessages.length}
            {' '}
            {t('messages.messages')}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messagesRender()}
          <span ref={lastMessageRef} />
        </div>
        <div className="mt-auto px-5 py-3">
          <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
            <InputGroup>
              <Form.Control
                onChange={formik.handleChange}
                name="body"
                aria-label={t('messages.new')}
                placeholder={t('messages.type')}
                className="border-0 p-0 ps-2 form-control"
                value={formik.values.body}
                ref={inputRef}
                disabled={formik.isSubmitting}
                autoComplete="off"
              />
              <Button
                type="submit"
                variant="link"
                className="btn-group-vertical"
                disabled={formik.errors.body || !formik.values.body}
              >
                <span>{t('messages.send')}</span>
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Messages;

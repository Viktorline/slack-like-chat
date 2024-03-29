import React from 'react';

import { Button, Col, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';
import Channel from './Channel.jsx';

const Channels = () => {
  const channels = useSelector(channelsSelectors.selectAll);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  return (
    <Col className="d-flex flex-column h-100 col-4 col-md-2 border-end pt-3 px-0 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-3 ps-4 pe-2 ">
        <span>
          {' '}
          {t('channels.channels')}
        </span>
        <Button
          onClick={() => dispatch(modalsActions.showModal({ modalType: 'addNewChannel', itemId: null }))}
          variant="outline-primary"
          className="border p-1 m-1"
        >
          <span className="font-weight-bold">+</span>
        </Button>
      </div>
      <Nav
        variant="pills"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.length > 0
          && channels.map((channel) => <Channel key={channel.id} channel={channel} />)}
      </Nav>
    </Col>
  );
};

export default Channels;

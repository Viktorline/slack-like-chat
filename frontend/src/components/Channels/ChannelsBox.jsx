import React from 'react';

import { Button, Col, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import Channel from './Channel.jsx';

const Channels = (props) => {
  const { showModal } = props;
  const channels = useSelector(channelsSelectors.selectAll);
  const { t } = useTranslation();

  return (
    <Col className="col-4 col-md-2 border-end pt-3 px-0 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-3 ps-4 pe-2">
        <span>
          {' '}
          {t('channels.channels')}
        </span>
        <Button
          onClick={() => showModal('addNewChannel')}
          variant="outline-primary"
          className="border p-1 m-1"
        >
          <span className="font-weight-bold">+</span>
        </Button>
      </div>
      <Nav fill variant="pills" className="d-flex flex-column px-2" as="ul">
        {channels.length > 0
          && channels.map((channel) => (
            <Channel key={channel.id} channel={channel} showModal={showModal} />
          ))}
      </Nav>
    </Col>
  );
};

export default Channels;
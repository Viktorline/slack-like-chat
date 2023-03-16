import cn from 'classnames';
import React from 'react';

import { Button, Col, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  actions as channelsActions,
  selectors as channelsSelectors,
} from '../slices/channelsSlice.js';

const Channels = (props) => {
  const { showModal } = props;
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const dispatch = useDispatch();

  const channelsRender = () => {
    const handleClick = (id) => {
      dispatch(channelsActions.setCurrentChannelId(id));
    };

    return (
      <Nav fill variant="pills" className="d-flex flex-column px-2" as="ul">
        {channels.map((channel) => (
          <li key={channel.id} className="nav-item w-100">
            <button
              type="button"
              onClick={() => handleClick(channel.id)}
              className={cn('w-100', 'rounded-0', 'text-start', 'btn', {
                'btn-secondary': channel.id === currentChannelId,
              })}
            >
              <span className="me-1">#</span>
              {channel.name}
            </button>
          </li>
        ))}
      </Nav>
    );
  };

  return (
    <Col className="col-4 col-md-2 border-end pt-3 px-0 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-3 ps-4 pe-2">
        <span>Channels</span>
        <Button
          onClick={() => showModal('addNewChannel')}
          variant="outline-primary"
          className="border p-1 m-1"
        >
          <span className="font-weight-bold">+</span>
        </Button>
      </div>
      {channelsRender()}
    </Col>
  );
};

export default Channels;

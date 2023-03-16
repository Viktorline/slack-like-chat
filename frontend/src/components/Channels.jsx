import cn from 'classnames';
import React from 'react';

import {
  Button, ButtonGroup, Col, Dropdown, Nav,
} from 'react-bootstrap';
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
          <Nav.Item as="li" key={channel.id} className="w-100">
            {channel.removable ? (
              <Dropdown as={ButtonGroup} className="w-100">
                <button
                  type="button"
                  onClick={() => handleClick(channel.id)}
                  className={cn('w-100', 'rounded-0', 'text-start', 'text-truncate', 'btn', {
                    'btn-secondary': channel.id === currentChannelId,
                  })}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </button>

                <Dropdown.Toggle
                  split
                  variant={channel.id === currentChannelId ? 'secondary' : 'light'}
                  className="flex-grow-0 text-end"
                >
                  <span className="visually-hidden">controls</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => showModal('removeChannel', channel.id)}>
                    Delete
                  </Dropdown.Item>
                  <Dropdown.Item>Rename</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <button
                type="button"
                onClick={() => handleClick(channel.id)}
                className={cn('w-100', 'rounded-0', 'text-start', 'text-truncate', 'btn', {
                  'btn-secondary': channel.id === currentChannelId,
                })}
              >
                <span className="me-1">#</span>
                {channel.name}
              </button>
            )}
          </Nav.Item>
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

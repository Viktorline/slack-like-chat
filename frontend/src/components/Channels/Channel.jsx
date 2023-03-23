import React from 'react';

import cn from 'classnames';
import { ButtonGroup, Dropdown, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { actions as channelsActions } from '../../slices/channelsSlice.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';

const Channel = (props) => {
  const { channel } = props;
  console.log(channel);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClick = (id) => {
    dispatch(channelsActions.setCurrentChannelId(id));
  };

  return (
    <Nav.Item key={channel.id} className="w-100">
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
            <span className="visually-hidden">{t('channels.controls')}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => dispatch(
                modalsActions.showModal({ modalType: 'removeChannel', itemId: channel.id }),
              )}
            >
              {t('channels.remove')}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => dispatch(
                modalsActions.showModal({ modalType: 'renameChannel', itemId: channel.id }),
              )}
            >
              {t('channels.rename')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <button
          type="button"
          onClick={() => handleClick(channel.id)}
          className={cn('w-100', 'rounded-2', 'text-start', 'text-truncate', 'btn', {
            'btn-secondary': channel.id === currentChannelId,
          })}
        >
          <span className="me-1">#</span>
          {channel.name}
        </button>
      )}
    </Nav.Item>
  );
};

export default Channel;

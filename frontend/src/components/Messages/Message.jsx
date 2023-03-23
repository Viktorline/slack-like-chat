import React from 'react';
import { Card } from 'react-bootstrap';
import { useAuth } from '../../hooks/index.js';

const Message = (props) => {
  const { content } = props;
  const auth = useAuth();
  const isCurrentUser = content.username === auth.user.username;

  return (
    <Card
      className={`my-2 bordered ${
        isCurrentUser ? 'align-self-end bg-light' : 'align-self-start bg-light bg-secondary'
      }`}
    >
      <Card.Body className="text-break p-2">
        <Card.Text className={`mb-1 ${isCurrentUser ? 'text-end' : ''}`}>{content.body}</Card.Text>
        <Card.Text
          style={{ fontSize: '10px' }}
          className={` text-muted ${isCurrentUser ? 'text-end' : ''}`}
        >
          <b>{content.username}</b>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Message;

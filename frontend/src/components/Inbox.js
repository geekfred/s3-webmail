import React from 'react';

import InboxNavBar from './InboxNavBar';
import Message from './MessagePreview';
import ComposePopUp from './ComposePopUp';

import '../styles/Inbox.css';

const Inbox = (props) => {
  return (
    <div className="inbox">
      <InboxNavBar
        getNewMessages = {props.getNewMessages}
        showComposeWindow = {props.showComposeWindow}
        setComposeStateToShow = {props.setComposeStateToShow}
        />
      <h1>Inbox</h1>
      <div className="headers">
        <div className="subject">subject</div>
        <div className="from">from</div>
        <div className="text">message</div>
        <div className="date">date</div>
      </div>
      {props.messages.map((msg) => {
        return (
          <Message
            msg={msg}
            markAsRead={props.markAsRead}
            key={msg._id}
            />
        );
      })}
      <ComposePopUp
        showComposeWindow={props.showComposeWindow}
        setComposeStateToHide={props.setComposeStateToHide}
        sendMail={props.sendMail}
        />
    </div>
  );
};

export default Inbox;

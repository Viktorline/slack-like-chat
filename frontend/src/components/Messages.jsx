const Messages = () => (
  <div className="col-md-9 col-lg-8">
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b># general</b>
        </p>
        <span className="text-muted">2 messages</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        <div className="text-break mb-2">
          <b>admin</b>
        </div>
        <div className="text-break mb-2">
          <b>some guy</b>
        </div>
      </div>
      <div className="mt-auto px-5 py-3">
        <form noValidate="" className="py-1 border rounded-2">
          <div className="input-group has-validation">
            <input
              name="body"
              aria-label="New message"
              placeholder="Enter message"
              className="border-0 p-0 ps-2 form-control"
              value=""
            />
            <button type="submit" className="btn btn-group-vertical" disabled="">
              <span>Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default Messages;

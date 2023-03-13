import React from 'react';

const Channels = () => (
  <div className="col-md-3 col-lg-4 bg-light shadow-sm">
    <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
      <span>Channels</span>
    </div>
    <ul className="nav flex-column nav-pills nav-fill px-2">
      <li className="nav-item w-100">
        <button type="button" className="w-100 rounded-0 text-start btn btn-secondary">
          <span className="me-1"># general</span>
        </button>
      </li>
      <li className="nav-item w-100">
        <button type="button" className="w-100 rounded-0 text-start btn">
          <span className="me-1"># random</span>
        </button>
      </li>
    </ul>
  </div>
);

export default Channels;

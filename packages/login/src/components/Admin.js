import React from 'react';
import { Link } from "react-router-dom";
import "./../web-components/dashboard-component";

const Admin = () => {
  return (
    <div>
      <dashboard-component></dashboard-component>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Admin;

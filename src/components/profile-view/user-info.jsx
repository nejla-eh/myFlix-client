import React from "react";
import { connect } from "react-redux";

function UserInfo({ email, name }) {
  return (
    <>
      <h4>Your Info</h4>
      <p>Name: {name}</p>
      <p>e-mail: {email}</p>
    </>
  );
}

export default UserInfo;

import React from "react";

const BeforeLogin = () => {
  return (
    // info text for the application, it will only render if its not logedin
    <div className="info-container">
      <p className="info-text">
        To create and manage to-do lists, you need to sign up or register if you
        don’t have an account. Signing up is quick and easy. Once you have an
        account, you can create and manage your to-do lists with ease.
      </p>
    </div>
  );
};

export default BeforeLogin;

import * as React from 'react';
import RegisterBox from '../components/accounts/RegisterBox';
import Navigation from '../components/Navigation';

const Register = () => {
  return (
    <>
      <Navigation />
      <div className="mt-10">
        <RegisterBox type="Register" />
      </div>
    </>
  );
}

export default Register;
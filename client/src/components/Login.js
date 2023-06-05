import React from 'react';
import './mix.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Login = () => {
  const [passShow, setPassShow] = useState(false);

  const [inpval, setinpval] = useState({
    email: '',
    password: '',
  });

  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setinpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const loginuser = (e) => {
    e.preventDefault();
    const { email, password } = inpval;

    if (email === '') {
      alert('please enter your email');
    } else if (!email.includes('@')) {
      alert('enter valid email');
    } else if (password === '') {
      alert('please enter your password');
    } else if (password.length < 6) {
      alert('password must include 6 characters');
    } else {
      alert('User login successfully done');
    }
  };
  return (
    <>
      <section>
        <div className='form_data'>
          <div className='form_heading'>
            <h1>Welcome Back, Log In</h1>
            <p>Hi, We are glad you are back. Please login</p>
          </div>
          <form>
            <div className='form_input'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                onChange={setVal}
                value={inpval.email}
                name='email'
                id='email'
                placeholder='Enter your email address'
              />
            </div>
            <div className='form_input'>
              <label htmlFor='password'>Password</label>
              <div className='two'>
                <input
                  type={!passShow ? 'password' : 'text'}
                  onChange={setVal}
                  value={inpval.password}
                  name='password'
                  id='password'
                  placeholder='Enter password'
                />
                <div
                  className='showpass'
                  onClick={() => {
                    setPassShow(!passShow);
                  }}
                >
                  {!passShow ? 'Show' : 'Hide'}
                </div>
              </div>
            </div>
            <button className='btn' onClick={loginuser}>
              Login
            </button>
            <p>
              Don't have an account? <NavLink to='/register'>Sign Up</NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;

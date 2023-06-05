import React from 'react';
import { useState } from 'react';
import './mix.css';
import { NavLink } from 'react-router-dom';

const Register = () => {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setcPassShow] = useState(false);

  const [inpval, setinpval] = useState({
    fname: '',
    email: '',
    password: '',
    cpassword: '',
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

  const addUserData = (e) => {
    e.preventDefault();
    const { fname, email, password, cpassword } = inpval;
    if (fname === '') {
      alert('please enter your name');
    } else if (email === '') {
      alert('please enter your email');
    } else if (!email.includes('@')) {
      alert('enter valid email');
    } else if (password === '') {
      alert('please enter your password');
    } else if (password.length < 6) {
      alert('password must include 6 characters');
    } else if (cpassword === '') {
      alert('please enter your password again');
    } else if (password !== cpassword) {
      alert('passwords do not match');
    } else {
      alert('User registration successfully done');
    }
  };
  return (
    <>
      <section>
        <div className='form_data'>
          <div className='form_heading'>
            <h1>Sign Up</h1>
            <p style={{ textAlign: 'center' }}>
              We are glad that you will be using Project Cloud to manage <br />{' '}
              your tasks! We hope that you will like it.
            </p>
          </div>
          <form>
            <div className='form_input'>
              <label htmlFor='fname'>Name</label>
              <input
                type='text'
                onChange={setVal}
                value={inpval.fname}
                name='fname'
                id='fname'
                placeholder='Enter your name'
              />
            </div>
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
            <div className='form_input'>
              <label htmlFor='password'>Confirm Password</label>
              <div className='two'>
                <input
                  type={!cpassShow ? 'password' : 'text'}
                  onChange={setVal}
                  value={inpval.cpassword}
                  name='cpassword'
                  id='cpassword'
                  placeholder='Confirm password'
                />
                <div
                  className='showpass'
                  onClick={() => {
                    setcPassShow(!cpassShow);
                  }}
                >
                  {!cpassShow ? 'Show' : 'Hide'}
                </div>
              </div>
            </div>
            <button className='btn' onClick={addUserData}>
              SignUp
            </button>
            <p>
              Already have an account? <NavLink to='/'>Login</NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;

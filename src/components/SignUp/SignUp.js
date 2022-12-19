import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';
import './SignUp.css';

const SignUp = () => {
    const [error, setError] = useState(null);
    const {createUser} = useContext(AuthContext);

    const handleSignUpSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        if(password.length < 6){
            setError('Password should be 6 character or more.');
            return;
        }

        if(password !== confirm){
            setError('Your Password did not match');
            return;
        }

        createUser(email, password)
        .then(result => {
            const user= result.user;
            console.log('User from signUp:',user);
            form.reset();
        })        
        .catch(error =>{
            console.error(error);
        })
    }



    return (
        <div className='form-container'>
        <h2 className='form-title'>Sign Up</h2>
        <form onSubmit={handleSignUpSubmit}>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id=""  placeholder='email' required />
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="" placeholder='password' required />
            </div>
            <div className="form-control">
                <label htmlFor="confirm">Confirm Password</label>
                <input type="password" name="confirm" id="" placeholder='Confirm your password' required />
            </div>
            <input className='btn-submit' type="submit" value="Sign Up" />
        </form>
                <p className='text-error'>{error}</p>
        <p className='new-account-create'>Already have an account? <Link to='/login'>Login</Link></p>
    </div>
    );
};

export default SignUp;
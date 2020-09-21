import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useHistory, useLocation } from 'react-router-dom';
import fb from '../../Images/Icon/fb.png';
import google from '../../Images/Icon/google.png';
import './Login.css';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [signedInUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: 'false',
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const [newUser, setNewUser] = useState(false);
    const history = useHistory();
    const location = useLocation();
    console.log(location);
    let { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    //login using google account
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            let { displayName, email } = result.user;
            const signedInUser = { displayName, email, isSignedIn: true };
            setNewUser(signedInUser);
            setLoggedInUser(signedInUser);
            history.replace(from);
        })
            .catch(function (error) {
                var errorCode = error.code;
                console.log(errorCode);
            });
    }

    // login using facebook account
    const handleFbSignIn = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            const { displayName, email } = result.user;
            const signedInUser = { displayName, email, isSignedIn: true };
            setNewUser(signedInUser);
            setLoggedInUser(signedInUser);
            history.replace(from);
        })
            .catch(function (error) {
                var errorCode = error.code;
                console.log(errorCode);
                signedInUser.error = errorCode;
                signedInUser.success = false;
                setUser(signedInUser);
            });
    }

    // to validate email and password
    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);

        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (e.target.value === 'confirmPassword') {
            let isPasswordValid = true;
            let passwordHasNumber = true;
            let isPasswordConfirmed;
            let password1 = user.password;
            let password2 = user.confirmPassword;
            (password1 !== password2) ? isPasswordConfirmed = false :
                isPasswordConfirmed = true;
            isPasswordConfirmed.message = "password is not correct";
            isFieldValid = isPasswordValid && passwordHasNumber && isPasswordConfirmed;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    // login using email & password
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setNewUser(newUserInfo);
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    updateUserName(user.name);
                    history.replace(from);
                })
                .catch(error => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch(error => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });
        }
        e.preventDefault();
    }

    // to update users
    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        })
            .then(function () {
                console.log('user updated')
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} >
                <div className="formDiv" >
                    {newUser ? <h2>Create an account</h2> : <h2>Login</h2>}

                    {newUser && <label>First Name <br />
                        <input type="text" name="firstName" onBlur={handleBlur} placeholder="First Name" /></label>}
                    <br />

                    {newUser && <label>Last Name  <br />
                        <input type="text" name="lastName" onBlur={handleBlur} placeholder="Last Name" /></label>}
                    <br />

                    <label>Username or Email  <br />
                        <input type="text" name="email" onBlur={handleBlur} placeholder="UserName or E-mail" required /> </label>
                    <br />

                    <label>Password <br />
                        <input type="password" name="password" onBlur={handleBlur} placeholder="Password" required /> </label>
                    <br />

                    {newUser ? <label>Confirm password <br />
                        <input type="password" name="confirmPassword" onBlur={handleBlur} placeholder="Confirm password" required /> </label> : null}
                    <br />
                    {!newUser ? <input name="newUser" type="submit" value="Sign in" /> :
                        <input name="newUser" type="submit" value="Sign up" />}
                    <br /> <hr />
                    {newUser ? <p>Already have an account ? <br />
                        <button name='newUser' onClick={() => setNewUser(!newUser)}>login</button> </p> :
                        <p>Don't have an account ?
                    <button name='newUser' onClick={() => setNewUser(!newUser)}>Create an account</button> </p>
                    }
                </div>
            </form>
            <hr /> <p>Or</p>
            <button className="loginButton" onClick={handleFbSignIn}> <img style={{ width: '10px' }} src={fb} alt="" /> Continue with Facebook</button>
            <br />
            <button className="loginButton" onClick={handleGoogleSignIn}><img style={{ width: '10px' }} src={google} alt="" />Continue with Google</button>
            <p style={{ color: 'red' }}>{user.error}</p>

            {
                user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'logged in'} successfully</p>
            }
        </div>
    );
};

export default Login;
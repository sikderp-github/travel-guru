import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { Link, useHistory, useLocation } from 'react-router-dom';
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
    let { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

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
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);

        }
    }
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
    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name

        }).then(function () {
            console.log('user updated')
        }).catch(function (error) {
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
                    <br />
                    {newUser ? <p>Already have an account ?
                    <Link name='newUser' onClick={() => setNewUser(!newUser)}>login</Link> </p> :
                        <p>Don't have an account ?
                    <Link to='/login' name='newUser' onClick={() => setNewUser(!newUser)}>Create an account</Link> </p>
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
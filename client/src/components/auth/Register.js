import React, {Fragment, useState} from "react";
import {connect} from 'react-redux';
import axios from 'axios';
import {Link,Redirect} from 'react-router-dom';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import propTypes from 'prop-types';
import {login} from '../../actions/auth';
import { ReactReduxContext } from "react-redux";

const Register=({setAlert,register,isAuthenticated})=>{
    const [formData, setFormData]=useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });

    const {name,email,password,password2}= formData;
    const onChange = e => setFormData({
        ...formData,[e.target.name]:e.target.value
    });
    const onSubmit = async e => {
        e.preventDefault();
        if(password!==password2){
            setAlert('Passwords do not match','danger');
        }else{
            register({name,email,password});

            const newUser={
                name,
                email,
                password
            }

            try {
                const config={
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }

                const body=JSON.stringify(newUser);
                const res=await axios.post('/api/users',body,config);
                console.log(res.data);
            } catch (err) {
                console.error(err.response.data);
            }

            console.log(formData);
        }
    };

    //Redirect if logged in
    if(isAuthenticated){
        return <Redirect to="/collection" />;
    }

    return (<Fragment>
        <div className="d-flex flex-column align-items-center p-4">
        <div className="center card-login">
            <h1 className="large header-login mb-5">Sign Up</h1>
            <form 
            className="form" 
            action="create-profile.html"
            onSubmit={e=>onSubmit(e)}>
                <div className="form-group flex-login">
                    <i className="black fas fa-user icon-login"></i>&nbsp;&nbsp;&nbsp;
                    <input type="text" placeholder="Name" 
                    name="name" 
                    value={name}
                    onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group flex-login">
                    <i className="black fas fa-mail-bulk icon-login"></i>&nbsp;&nbsp;&nbsp;
                    <input 
                    value={email} 
                    onChange={e => onChange(e)}
                    type="email" 
                    placeholder="Email Address" 
                    name="email" 
                    />
                </div>
                <div className="form-group flex-login">
                    <i className="black fas fa-lock icon-login"></i>&nbsp;&nbsp;&nbsp;
                    <input
                        value={password}
                        onChange={e => onChange(e)}
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                </div>
                <div className="form-group flex-login">
                    <i className="black fas fa-lock icon-login"></i>&nbsp;&nbsp;&nbsp;
                    <input
                        type="password"
                        value={password2}
                        onChange={e => onChange(e)}
                        placeholder="Confirm Password"
                        name="password2"
                    />
                </div>
                <div className="form-group flex-login">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="submit" className="btn btn-primary" value="REGISTER" />
                </div>
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </div>
        </div>
        </Fragment>
    );
};

Register.propTypes={
    setAlert:propTypes.func.isRequired,
    register:propTypes.func.isRequired,
    isAuthenticated:propTypes.bool
};

const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
});

export default connect(
    mapStateToProps, 
    {setAlert,register,login}
    )(Register);
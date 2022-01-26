import React, {Fragment, useState} from "react";
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {login} from '../../actions/auth';

const Login=({login,isAuthenticated})=>{
    const [formData, setFormData]=useState({
        email:'',
        password:'',
    });

    const {email,password}= formData;
    const onChange = e => setFormData({
        ...formData,[e.target.name]:e.target.value
    });
    const onSubmit = async e => {
        e.preventDefault();
        login(email,password);
            
    };

    //Redirect if logged in
    if(isAuthenticated){
        return <Redirect to="/collection" />;
    }

    return <Fragment>
            <div className="d-flex flex-column align-items-center p-4">
                    <div className="card-login">
                    <h1 className="header-login black">Krider Collection</h1>
                    <p className="lead mb-5 black">
                        We are handling the best of Krider Collection
                    </p>
                    <form 
                    className="form" 
                    action="create-profile.html"
                    onSubmit={e=>onSubmit(e)}>
                        <div className="form-group flex-login">
                        <i className="fas fa-user icon-login black"></i>&nbsp;&nbsp;&nbsp;
                        <input 
                        value={email} 
                        onChange={e => onChange(e)}
                        required 
                        type="email" 
                        placeholder="Email Address" 
                        name="email" />
                        </div>
                        <div className="form-group flex-login">
                        <i className="fas fa-lock icon-login black"></i>&nbsp;&nbsp;&nbsp;
                        <input
                            value={password}
                            onChange={e => onChange(e)}
                            type="password"
                            placeholder="Password"
                            name="password"
                        />
                        </div>
                        <div>
                            <input type="submit" className="btn btn-primary" value="LOGIN" />
                        </div>
                        <br />
                    </form>
                    </div>
            </div>
        </Fragment>
    ;
}

Login.propTypes={
    login:propTypes.func.isRequired,
    isAuthenticated:propTypes.bool
}

const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
});

export default connect(
    mapStateToProps, 
    {login}
    )(Login);
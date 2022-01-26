import React, {Fragment, useState} from "react";
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {login} from '../../actions/auth';

const Ladmin = ({login,isAuthenticated}) =>{
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
        return <Redirect to="/dashboard" />;
    }

    return <Fragment>
                <section className="section-body center">
                <div className="container">
                    <div className="d-flex justify-content-center width-100-percent">
                        <div className="mt-3 login p-3 login-card">
                            <img className="mt-5 img-logo" />
                            <h3 className="white">Archipelago's</h3>
                            <div className="section">
                                <p className="lead white">We are handling the best of indonesian cuisine</p>
                            </div>

                            <form 
                                action="/auth/admin_process" 
                                method="POST" 
                                className="col s12" 
                                onSubmit={e=>onSubmit(e)}>
                                <div className="divider"></div>
                                <div className="row mt-4">
                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
                                    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-4">
                                        <input 
                                            className="form-control" 
                                            name="email" 
                                            type="text" 
                                            placeholder="Email..." 
                                            value={email}
                                            onChange={e => onChange(e)}
                                            required  />
                                        <input 
                                            className="form-control mt-2" 
                                            name="password" 
                                            type="password" 
                                            placeholder="Password..." 
                                            value={password}
                                            onChange={e => onChange(e)} />
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
                                </div>
                                <div className="section mb-5 center mt-4">
                                    <button type="submit" className="btn btn-login">Log In</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                </section>
            </Fragment>
        ;
}

Ladmin.propTypes={
    login:propTypes.func.isRequired,
    isAuthenticated:propTypes.bool
}

const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
});

export default connect(
    mapStateToProps, 
    {login}
    )(Ladmin);
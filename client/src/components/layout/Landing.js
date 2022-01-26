import React, {Fragment, useState, useEffect} from "react";
import {Link,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {login} from '../../actions/auth';
import Spinner from '../layout/Spinner';
import CollectionItem from '../collection/CollectionItem';
import {getCollections} from '../../actions/collection';

const Landing = (
    {
        getCollections, collection: {collections, loading},
    }
    ) => {

    useEffect(()=>{
        getCollections();
        console.log(collections);
    }, [loading, getCollections]);

    return <Fragment>
            <main id="transcroller-body" className="aos-all" >
            <section id="hero" className="d-flex align-items-center">
                <div className="container">
                    <div className="row">
                            <img className="img-reef" data-scroll-speed="8" src="/img/reef.svg" />
                            <img className="img-ocean" data-scroll-speed="8" src="/img/sea.svg" />

                        <div className="col-lg-12 d-flex justify-content-center" data-aos="fade-down">
                            <img src="/img/g4.gif" className="img-hero animated" alt="" />
                        </div>
                        <div className="col-lg-12 mt-3 d-flex center flex-column justify-content-center mb-5" data-aos="fade-up">
                            <h1>&nbsp;</h1>
                            <h2>&nbsp;</h2>
                        </div>
                    </div>
                </div>
            </section>

            <section id="skills" className="about">
                <div className='stars'></div>
                <div className='stars2'></div>
                <div className='stars3'></div>
                
                <div className="container">
                    <div className="row d-flex flex-row justify-content-center">
                        <h2 className="header-krider mr-3 white" style={{'z-index':'1000000000'}}>Kamen Rider Collection</h2>
                    </div>
                    <div className="row d-flex justify-content-center mt-5">
                        <div className="appetizers d-flex align-items-center center m-2 padding-all-card">
                            <div className="row">
                            {collections.map(collection => (
                                <CollectionItem key={collection._id} collection={collection} />
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="education" className="services">
                
            </section>

            <section id="projects" className="projects">
                
            </section>

            <section id="certificate" className="certificate">
                
            </section>

            <section id="coral" className="coral d-flex align-items-center">
                <img className="img-coral" data-scroll-speed="8" src="/img/coral.png" />
            </section>
        </main>
        

    </Fragment>
}

Landing.propTypes={
    collection: propTypes.object.isRequired
};

const mapStateToProps=state=>({
    collection:state.collection
});

export default connect(mapStateToProps, {getCollections})(Landing);
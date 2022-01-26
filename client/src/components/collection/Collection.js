import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import CollectionItem from './CollectionItem';
import {connect} from 'react-redux';
import {getCollections} from '../../actions/collection';

const Collections = (
    {
        getCollections, collection: {collections, loading},
    }
    ) => {

    useEffect(()=>{
        getCollections();
        console.log(collections);
    }, [loading, getCollections]);

    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <div className="row d-flex flex-row justify-content-center mt-5">
                <Link to='/addcollection'>
                    <div
                        class="btn btn-danger mt-5">
                            Add Collection&nbsp;&nbsp;{<i class="fas fa-plus"></i>}
                    </div>
                </Link>
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
        </Fragment>
    );
};

Collections.propTypes = {
    collection: propTypes.object.isRequired
}

const mapStateToProps= state => ({
    collection:state.collection
});

export default connect(mapStateToProps, {getCollections})(Collections);
import React, {Fragment, useEffect} from 'react';
import propTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {deleteCollection} from '../../actions/collection';

const pathname = window.location.pathname;

const Collection = ({
  auth: { isAuthenticated},
  deleteCollection,
  collection: { _id, name, year, pic }
}) => (
    <div className="center col-lg-4 col-md-4 col-sm-12 mb-3 padding-card">
    <div className="bg-white card-rider p-3">
      <div className="">
      <img className='img-krider' src={pic} border="0" />
      </div>
      <div className="mt-3">
        <div>
          <h5 className='bold black'>
            {name}
          </h5>
          <h5 className='black'>
            {year}
          </h5>
        </div>
      </div>
      {isAuthenticated ? 
      <div className="mt-3 center">
          <button onClick={e => window.location.href=`/editcollection/${_id}`}
              type="button"
              className="btn btn-danger">
                  {<i className="fas fa-edit"></i>}
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={e => deleteCollection(_id)}
              type="button"
              className="btn btn-danger">
                  {<i className="fas fa-times"></i>}
          </button>
      </div>
      : null}
      </div>
    </div>
    );

Collection.defaultProps = {
  showActions: true
}


Collection.propTypes = {
  deleteCollection:propTypes.object.isRequired
}

const mapStateToProps= state => ({
    auth: state.auth
});

export default connect(
  mapStateToProps, 
  {deleteCollection}
)(Collection);
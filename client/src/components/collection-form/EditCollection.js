import React, { Fragment, useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import Progress from './Progress';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';
import { getCollection } from '../../actions/collection';
import {withRouter} from 'react-router-dom';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

const EditCollection = ({
  collection :{collection, loading},
  getCollection,
  match
}) => {

  const [formData, setFormData] = useState({
      name: '',
      year: '',
      pic: ''
  });

  // useEffect(() => {
  //   getCollection(match.params.id);
  //   console.log(collection);
  // }, [loading, collection]);

  useEffect(() => {
    getCollection(match.params.id);
    console.log(collection);

    if(collection){

      if(!loaded){
        setFormData({
          name: loading || !collection.name ? '' : collection.name,
          year: loading || !collection.year ? '' : collection.year,
          pic: loading || !collection.pic ? '' : collection.pic
        });
      }

      setLoaded(true);
    }
  }, [loading, collection]);

  const [loaded, setLoaded] = useState(false);
  const {name, year, pic} = formData;
  const [message, setMessage] = useState('');

  const onTextChange = e => setFormData({...formData,[e.target.name]:e.target.value});

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('year', year);
    formData.append('pic', pic);

    try {
      const res = await axios.put('/api/collection/'+collection._id, formData, {
      });

      window.location = "/collection";
      //<Redirect to="/dashboard" />;
    } catch (err) {
      setMessage(err);
      // if (err.response.status === 500) {
      //   setMessage('There was a problem with the server');
      // } else {
      //   setMessage(err.response.data.msg);
      // }
    }
  };

  return (
    <Fragment>
      {collection === null || loading ? <Spinner /> : <Fragment>

        <div className="d-flex justify-content-center mt-5 p-4">
          <div className="card-login">
          <form onSubmit={onSubmit}>
            <table className="mt-5" cellPadding="10">
              <thead>
                <tr>
                  <td className="center" colSpan="3">
                    <h2 className='black'>Edit Collection</h2>
                  </td>
                </tr>
              </thead>
              <tbody>
              <tr>
                <td className="center" colSpan="4"></td>
              </tr>
              <tr>
                <td className='left black'>Name</td>
                <td className='black'>:</td>
                <td><input required value={name} type="text" name="name" onChange={e => onTextChange(e)} /></td>
              </tr>
              <tr>
                <td className='left black'>Year</td>
                <td className='black'>:</td>
                <td><input required value={year} type="text" name="year" onChange={e => onTextChange(e)} /></td>
              </tr>
              <tr>
                <td className='left black'>Pic</td>
                <td className='black'>:</td>
                <td><input required value={pic} type="text" name="pic" onChange={e => onTextChange(e)} /></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <input
                    type='submit'
                    value='Submit'
                    className='btn btn-primary btn-block mt-4'
                  />
                </td>
              </tr>
              </tbody>
              </table>
          </form>
        </div>
      </div>
      </Fragment>}
    </Fragment>
  );
};

EditCollection.propTypes = {
    getCollection: propTypes.func.isRequired,
    collection: propTypes.object.isRequired
};

const mapStateToProps = state => ({
    collection:state.collection
});

export default connect(
    mapStateToProps,
    {getCollection}
)(withRouter(EditCollection));

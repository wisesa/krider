import React, { Fragment, useState } from 'react';
import {Redirect} from 'react-router-dom';
import Progress from './Progress';
import axios from 'axios';

const AddCollection = () => {
  const [formData, setFormData] = useState({
      name: '',
      year: '',
      pic: ''
  });
  const {name, year, pic} = formData;

  const [message, setMessage] = useState('');

  const onTextChange = e => setFormData({...formData,[e.target.name]:e.target.value});

  // const onChange = e => {
  //   setFile(e.target.files[0]);
  //   setFilename(e.target.files[0].name);
  // };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('year', year);
    formData.append('pic', pic);
    //formData.append('file', file);

    try {
      const res = await axios.post('/api/collection', formData, {
        
      });

      window.location = "/collection";
      //<Redirect to="/dashboard" />;
    } catch (err) {
      setMessage(err);
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      <div className="d-flex justify-content-center p-4">
        <div className="card-login">
          <form onSubmit={onSubmit}>
            <table className="mt-5" cellPadding="10">
              <tr>
                <td class="center" colSpan="3">
                  <h2 className='black'>Add Collection</h2>
                </td>
              </tr>
              <tr>
                <td class="center" colSpan="4"></td>
              </tr>
              <tr>
                <td className='black left'>Name</td>
                <td className='black'>:</td>
                <td><input required value={name} type="text" name="name" onChange={e => onTextChange(e)} /></td>
              </tr>
              <tr>
                <td className='black left'>Year</td>
                <td className='black'>:</td>
                <td><input required value={year} type="text" name="year" onChange={e => onTextChange(e)} /></td>
              </tr>
              <tr>
                <td className='black left'>URL Picture</td>
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
              </table>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddCollection;

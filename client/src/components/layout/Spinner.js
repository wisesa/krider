import React, {Fragment} from 'react';
import spinner from './spinner.gif';

export default() => (
    <Fragment>
        <img
            src={spinner}
            style={{width:'50px', marginTop:'200px', marginLeft:'50%', display:'block'}}
            alt="Loading..."
        />
    </Fragment>
);
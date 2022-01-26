import React, { Fragment,useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch }  from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import AddCollection from './components/collection-form/AddCollection';
import EditCollection from './components/collection-form/EditCollection';
import Collection from './components/collection/Collection';
import PrivateRoute from './components/routing/PrivateRoute';
import Spinner from './components/layout/Spinner';

//Redux
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './public/bootstrap.min.css';
import './public/style.css';

if(localStorage.token){
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(()=>{
        store.dispatch(loadUser());
    },[]);

    return !Landing ? (
        <Spinner />
    ) : (
    <Provider store={store}>
        <Router>
            <Fragment>
      
                <Navbar />
                    <Alert />
                        <Switch>
                                <Route exact path="/" component={Landing} />
                                <Route exact path="/register" component={Register} />
                                <Route exact path="/login" component={Login} />
                                <PrivateRoute exact path="/collection" component={Collection} />
                                <PrivateRoute exact path="/addcollection" component={AddCollection} />
                                <PrivateRoute exact path="/editcollection/:id" component={EditCollection} />
                        </Switch>
            </Fragment>

        </Router>
    </Provider> 
)};

export default App;
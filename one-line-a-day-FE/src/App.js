import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import './styles/App.scss';

// components
import Login from './components/Login';
import SignUp from './components/SignUp';
import JournalEntries from './components/JournalEntries';
import SelectedPost from './components/Post/SelectedPost';
import CreateEntry from './components/createEntry/CreateEntry';
import EditEntry from './components/editEntry/EditEntry';

function App() {
	return (
    <div className="App">
			<Route exact path="/" render={props => <Login {...props} />} />
			<Route exact path="/signup" render={props => <SignUp {...props} />} />
			<PrivateRoute exact path="/home" component={JournalEntries} />
			<Route exact path="/post/:id" render={props => <SelectedPost {...props} />} />
			<Route exact path="/createpost" component={CreateEntry} />
			<Route exact path="/editpost" render={props => <EditEntry {...props} />} />
    </div>
  );
}

export default withRouter(App);


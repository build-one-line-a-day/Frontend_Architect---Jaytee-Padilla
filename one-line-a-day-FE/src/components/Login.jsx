import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Image, Grid, Segment, Message } from 'semantic-ui-react';
import axios from 'axios';
import logo from '../assets/OLAD_logo.png';

export default function Login(props) {
	// loginCreds will store the email & password inputted by the user and is sent to the backend for verification
	const [loginCreds, setCreds] = useState({
		email: "",
		password: ""
	});

	// will cause error message to appear
	const [incorrectCreds, setIncorrectCreds] = useState({
		isIncorrect: false
	})

	// sends loginCreds to the backend for verification
	// if verification is successful (i.e. the email/password combo exists on backend), set the authorization token and user's id to local storage
	const submitHandler = event => {
		event.preventDefault();

		axios.post("https://one-line-daily.herokuapp.com/api/auth/login", loginCreds)
		.then(response => {
			setIncorrectCreds({isIncorrect: false})

			localStorage.setItem('token', response.data.token);
			localStorage.setItem('user_id', response.data.user.id);

			props.history.push("/home");
		})
		.catch(error => {
			console.log(error.message)
			setIncorrectCreds({isIncorrect: true})
		})
	};

	const changeHandler = event => {
		setCreds({...loginCreds, [event.target.name]: event.target.value})
	};

	return (
		<Grid textAlign="center" verticalAlign="middle" style={{height: "100vh"}}>
			<Grid.Column style={{maxWidth: 500}}>
				<Image centered src={logo} alt="Logo" style={{width: "300px"}} />

				{/* reveals error message if email or password is incorrect */}
				{incorrectCreds.isIncorrect && <Message error header="Email or password is incorrect" />}

				<Form onSubmit={submitHandler}>
					<Segment>
						<Form.Input fluid type="email" placeholder="Email" icon="user" iconPosition="left" name="email" value={loginCreds.email} onChange={changeHandler} required />
						<Form.Input fluid type="password" placeholder="Password" icon="lock" iconPosition="left" name="password" value={loginCreds.password} onChange={changeHandler} required />

						<Form.Button fluid content="Login" size="large" />
					</Segment>
				</Form>

				<Message>
					Don't have an account? <Link to="/signup">Sign Up</Link>
				</Message>
			</Grid.Column>
		</Grid>
	)
};
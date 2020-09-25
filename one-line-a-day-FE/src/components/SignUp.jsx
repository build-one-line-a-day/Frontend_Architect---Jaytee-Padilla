import React, { useState } from 'react';
import { Form, Image, Grid, Segment, Message } from 'semantic-ui-react';
import axios from 'axios';
import logo from '../assets/OLAD_logo.png';

export default function SignUp(props) {
	const [userCredentials, setCredentials] = useState({
		firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: ""
	});

	// will cause error message to appear if true
	const [incorrectCreds, setIncorrectCreds] = useState({
		isIncorrect: false
	});

	const submitHandler = event =>{
		event.preventDefault();

		axios.post("https://one-line-daily.herokuapp.com/api/auth/register", userCredentials)
			.then(response => {
				setIncorrectCreds({isIncorrect: false});

				props.history.push("/");
			})
			.catch(error =>{
				console.log(error);
				setIncorrectCreds({isIncorrect: true});
			})
	}

	const changeHandler = event => {
		setCredentials({...userCredentials, [event.target.name]: event.target.value})
	}

	return (
		<div>
			<Grid textAlign="center" verticalAlign="middle" style={{height: "100vh"}}>
				<Grid.Column style={{maxWidth: 500}}>
					<Image centered src={logo} alt="Logo" style={{width: "300px"}} />

					{/* reveals error message if email or password is incorrect */}
					{incorrectCreds.isIncorrect && <Message error header="Please provide proper account details" />}

					<Form onSubmit={submitHandler}>
						<Segment>
							<Form.Input fluid type="text" placeholder="First Name" name="firstname" onChange={changeHandler} value={userCredentials.firstname} required />
							<Form.Input fluid type="text" placeholder="Last Name" name="lastname" onChange={changeHandler} value={userCredentials.lastname} required />
							<Form.Input fluid type="text" placeholder="Username" name="username" onChange={changeHandler} value={userCredentials.username} required />
							<Form.Input fluid type="email" placeholder="Email" name="email" onChange={changeHandler} value={userCredentials.email} required />
							<Form.Input fluid type="password" placeholder="Password" name="password" onChange={changeHandler} value={userCredentials.password} required />

							<Form.Button fluid content="Sign Up" size="large" />
						</Segment>
					</Form>
				</Grid.Column>
			</Grid>
		</div>
	)
}

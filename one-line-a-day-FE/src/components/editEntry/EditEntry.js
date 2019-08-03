import React, { useState } from 'react';
import { axiosWithAuth } from '../../auth/axiosWithAuth';
import { Form, TextArea, Container, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import '../../variables.scss';

// components
import EditPostNav from '../PostNav/EditPostNav';

export const PostStyle = styled.div`
	margin-bottom: 20px;
	border: 1px solid lightgrey;
	padding: 20px;
`;

const EditEntry = (props) => {
	const { id, text, title, user_id } = props.location.state.post.post;

	const [
		entry,
		setEntry
	] = useState({
		id      : id,
		title   : title,
		text    : text,
		user_id : user_id
	});

	const changeHandler = (event) => {
		setEntry({ ...entry, [event.target.name]: event.target.value });
	};

	const deleteEntry = (event) => {
		axiosWithAuth()
			.delete(`https://one-line-daily.herokuapp.com/api/entries/${id}`)
			.then((response) => {
				console.log(response);
				props.history.push('/home');
			})
			.catch((error) => console.log(error));
	};

	return (
		<div>
			<EditPostNav entry={entry} routerProps={props} />

			<Container text>
				<PostStyle>
					<Form>
						<Form.Field>
							<label>Edit Post</label>
							<input name="title" value={entry.title} onChange={changeHandler} />
						</Form.Field>
						<TextArea name="text" value={entry.text} onChange={changeHandler} />
					</Form>
				</PostStyle>

				<Button basic size="medium" color="red" onClick={deleteEntry}>
					Delete Entry
				</Button>
			</Container>
		</div>
	);
};

export default EditEntry;

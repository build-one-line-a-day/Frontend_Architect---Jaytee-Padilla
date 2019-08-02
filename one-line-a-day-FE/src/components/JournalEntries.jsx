import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../auth/axiosWithAuth';
import Loader from 'react-loader-spinner';

// Components
import PostCard from './PostCard';
import PostListNav from './PostNav/PostListNav';


export default function JournalEntries(props) {
	// stores the id of the current user that's logged in
	const loginId = localStorage.getItem("user_id");

	// component state that will house the journal entries coming in from the backend so they can be mapped and rendered
	const [entries, setEntries] = useState([]);

	// tracks whether the logged in user has journal entries or not
	const [isEmpty, setIsEmpty] = useState(true);

	// tracks the fetching status of the journal entries
	const [isLoading, setIsLoading] = useState(true);

	// populates page with initial journal entries from the logged in user upon loading
	useEffect(() => {
		axiosWithAuth().get(`https://one-line-daily.herokuapp.com/api/entries/user/${loginId}`)
			.then(response => {
				// the sort() method organizes the journal entries so the newest entries show up first
				// .sort() mutates whatever array it's sorting, so the [...] spread operator is used to create a new instance of the array to be sorted and modified instead
				// that new sorted/modified instance is then stored in unorderedEntries and used to setEntries
				setIsLoading(false);
				setIsEmpty(false);
				const unorderedEntries = [...response.data.data].sort((a, b) => (a.id < b.id) ? 1 : -1);

				setEntries(unorderedEntries);
			})
			.catch(error => {
				console.log(error);
				setIsLoading(false);
				setIsEmpty(true);
			})
	}, []);

	return (
		<React.Fragment>
			<div className="postListNav-container">
				<PostListNav props={props} />
			</div>

			<div style={{width: "75%", margin: "0 auto"}}>
				{isLoading ? <Loader type="Oval" color="grey" height={80} width={80} /> :
					isEmpty ? <h1>You don't have any journal entries yet</h1> :
					entries.map(entry => {
						return (
							<PostCard key={entry.id} id={entry.id} date={entry.created_at} title={entry.title} text={entry.text} />
						)
					})
				}
			</div>
			
		</React.Fragment>
	)
};

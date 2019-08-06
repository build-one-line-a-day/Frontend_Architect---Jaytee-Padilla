import React from 'react';
import './post.scss';
import { Card, Container, Image } from 'semantic-ui-react';

const Post = ({ post }) => {
	const { id, title, text, created_at } = post;

	// formats the date
	const changedate = created_at.split('-');
	const item3 = changedate[2];
	const item3split = item3.split('T');
	const month = changedate[1];
	const day = item3split[0];
	const year = changedate[0];
	const dateword = () => {
		if (month === '01') {
			return 'January';
		}
		else if (month === '02') {
			return 'February';
		}
		else if (month === '03') {
			return 'March';
		}
		else if (month === '04') {
			return 'April';
		}
		else if (month === '05') {
			return 'May';
		}
		else if (month === '06') {
			return 'June';
		}
		else if (month === '07') {
			return 'July';
		}
		else if (month === '08') {
			return 'August';
		}
		else if (month === '09') {
			return 'September';
		}
		else if (month === '10') {
			return 'October';
		}
		else if (month === '11') {
			return 'November';
		}
		else if (month === '12') {
			return 'December';
		}
		else {
			return 'Not a Month';
		}
	};
	const datedisplay = `${dateword()} ${day}, ${year}`;

	return (
		<Container text>
			<div className="post-container">
				<Card raised fluid className="card-container">
					<Card.Content>
						<Image src={require('../../assets/quill-drawing-a-line.svg')} size="small" />

						<Card.Header>
							<span className="post-title">{title}</span>
						</Card.Header>

						<Card.Meta>
							<span className="date">{datedisplay}</span>
						</Card.Meta>

						<Card.Description className="text">{text}</Card.Description>
					</Card.Content>
				</Card>
			</div>
		</Container>
	);
};

export default Post;

//must credit on marketing page to use graphics
// <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
//<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

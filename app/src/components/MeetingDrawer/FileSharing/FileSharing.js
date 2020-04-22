import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRoomContext } from '../../../RoomContext';
import { useIntl } from 'react-intl';
import FileList from './FileList';
import FileSharingModerator from './FileSharingModerator';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const styles = (theme) =>
	({
		root :
		{
			display       : 'flex',
			flexDirection : 'column',
			width         : '100%',
			height        : '100%'
		},
		input :
		{
			display : 'none'
		},
		button :
		{
			margin : theme.spacing(1)
		}
	});

const FileSharing = (props) =>
{
	const intl = useIntl();

	const handleFileChange = async (event) =>
	{
		if (event.target.files.length > 0)
		{
			props.roomClient.shareFiles(event.target.files);
		}
	};

	const {
		canShareFiles,
		canShare,
		classes
	} = props;

	const buttonDescription = canShareFiles ?
		intl.formatMessage({
			id             : 'label.shareFile',
			defaultMessage : 'Share file'
		})
		:
		intl.formatMessage({
			id             : 'label.fileSharingUnsupported',
			defaultMessage : 'File sharing not supported'
		});

	return (
		<Paper className={classes.root}>
			<FileSharingModerator />
			<input
				className={classes.input}
				type='file'
				disabled={!canShare}
				onChange={handleFileChange}
				id='share-files-button'
			/>
			<label htmlFor='share-files-button'>
				<Button
					variant='contained'
					component='span'
					className={classes.button}
					disabled={!canShareFiles || !canShare}
				>
					{buttonDescription}
				</Button>
			</label>

			<FileList />
		</Paper>
	);
};

FileSharing.propTypes = {
	roomClient    : PropTypes.any.isRequired,
	canShareFiles : PropTypes.bool.isRequired,
	tabOpen       : PropTypes.bool.isRequired,
	canShare      : PropTypes.bool.isRequired,
	classes       : PropTypes.object.isRequired
};

const mapStateToProps = (state) =>
{
	return {
		canShareFiles : state.me.canShareFiles,
		tabOpen       : state.toolarea.currentToolTab === 'files',
		canShare      :
			state.me.roles.some((role) =>
				state.room.permissionsFromRoles.SHARE_FILE.includes(role))
	};
};

export default withRoomContext(connect(
	mapStateToProps,
	null,
	null,
	{
		areStatesEqual : (next, prev) =>
		{
			return (
				prev.room.permissionsFromRoles === next.room.permissionsFromRoles &&
				prev.me.roles === next.me.roles &&
				prev.me.canShareFiles === next.me.canShareFiles &&
				prev.toolarea.currentToolTab === next.toolarea.currentToolTab
			);
		}
	}
)(withStyles(styles)(FileSharing)));

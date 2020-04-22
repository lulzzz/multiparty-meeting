const initialState =
{
	id                    : null,
	picture               : null,
	browser               : null,
	roles                 : [ 'normal' ], // Default role
	canSendMic            : false,
	canSendWebcam         : false,
	canShareScreen        : false,
	canShareFiles         : false,
	audioDevices          : null,
	webcamDevices         : null,
	webcamInProgress      : false,
	audioInProgress       : false,
	screenShareInProgress : false,
	displayNameInProgress : false,
	loginEnabled          : false,
	raiseHand             : false,
	raiseHandInProgress   : false,
	loggedIn              : false,
	isSpeaking            : false
};

const me = (state = initialState, action) =>
{
	switch (action.type)
	{
		case 'SET_ME':
		{
			const {
				peerId,
				loginEnabled
			} = action.payload;

			return {
				...state,
				id : peerId,
				loginEnabled
			};
		}

		case 'SET_BROWSER':
		{
			const { browser } = action.payload;

			return { ...state, browser };
		}

		case 'LOGGED_IN':
		{
			const { flag } = action.payload;

			return { ...state, loggedIn: flag };
		}

		case 'ADD_ROLE':
		{
			if (state.roles.includes(action.payload.role))
				return state;

			const roles = [ ...state.roles, action.payload.role ];

			return { ...state, roles };
		}

		case 'REMOVE_ROLE':
		{
			const roles = state.roles.filter((role) =>
				role !== action.payload.role);

			return { ...state, roles };
		}

		case 'SET_PICTURE':
			return { ...state, picture: action.payload.picture };

		case 'SET_MEDIA_CAPABILITIES':
		{
			const {
				canSendMic,
				canSendWebcam,
				canShareScreen,
				canShareFiles
			} = action.payload;

			return {
				...state,
				canSendMic,
				canSendWebcam,
				canShareScreen,
				canShareFiles
			};
		}

		case 'SET_AUDIO_DEVICES':
		{
			const { devices } = action.payload;

			return { ...state, audioDevices: devices };
		}

		case 'SET_WEBCAM_DEVICES':
		{
			const { devices } = action.payload;

			return { ...state, webcamDevices: devices };
		}

		case 'SET_AUDIO_IN_PROGRESS':
		{
			const { flag } = action.payload;

			return { ...state, audioInProgress: flag };
		}

		case 'SET_WEBCAM_IN_PROGRESS':
		{
			const { flag } = action.payload;

			return { ...state, webcamInProgress: flag };
		}

		case 'SET_SCREEN_SHARE_IN_PROGRESS':
		{
			const { flag } = action.payload;

			return { ...state, screenShareInProgress: flag };
		}

		case 'SET_MY_RAISE_HAND_STATE':
		{
			const { flag } = action.payload;

			return { ...state, raiseHand: flag };
		}

		case 'SET_MY_RAISE_HAND_STATE_IN_PROGRESS':
		{
			const { flag } = action.payload;

			return { ...state, raiseHandInProgress: flag };
		}

		case 'SET_DISPLAY_NAME_IN_PROGRESS':
		{
			const { flag } = action.payload;

			return { ...state, displayNameInProgress: flag };
		}

		case 'SET_IS_SPEAKING':
		{
			const { flag } = action.payload;

			return { ...state, isSpeaking: flag };
		}

		default:
			return state;
	}
};

export default me;

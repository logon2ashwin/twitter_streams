import { SEARCH, LOAD_NEW_TWEETS, LOAD_TWEET, PHRASE_CHANGE_INIT, PHRASE_CHANGE_SUCCESS, SOCKET_DISCONNECTED } from "../actions";

const initialState = {
  tweets:[],
  displayTweets: [],
  searchPhrase: "Tony",
  socketDisconnected: false
};

const tweetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return {
      };
    case LOAD_NEW_TWEETS: 
      let newDisplayTweets = state.tweets.slice(0,25);
      let newTweets = state.tweets.slice(newDisplayTweets.length);
      return {
        ...state,
        tweets: newTweets,
        displayTweets: newDisplayTweets
      };
    case LOAD_TWEET:
      if(state.displayTweets.length < 25) {
        return {
          ...state,
          displayTweets: [
            action.payload,
            ...state.displayTweets
          ]
        }
      }
      else {
        return {
          ...state,
          tweets: [
            action.payload,
            ...state.tweets
          ]
        }
      };
    case PHRASE_CHANGE_INIT:
      return {
        ...state,
        tweets: [],
        displayTweets: []
      };
    case PHRASE_CHANGE_SUCCESS:
      return {
        ...state,
        searchPhrase: action.payload
      };
    case SOCKET_DISCONNECTED:
      return {
        ...state,
        socketDisconnected: true
      };
    default:
    return state;
  }
};

export default tweetsReducer;

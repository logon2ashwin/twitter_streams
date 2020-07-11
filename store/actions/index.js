import socket from "../../socket";

export const SEARCH = "SEARCH";
export const LOAD_NEW_TWEETS = "LOAD_NEW_TWEETS";
export const LOAD_TWEET = "LOAD_TWEETS";
export const PHRASE_CHANGE_INIT = "PHRASE_CHANGE_INIT";
export const PHRASE_CHANGE_SUCCESS = "PHRASE_CHANGE_SUCCESS";
export const SOCKET_DISCONNECTED = "SOCKET_DISCONNECTED";

const connection = socket.getConnection();

export const search = (data) => {
  return (dispatch) => {
    dispatch(phraseChangeInit());
    connection.emit('updateSearchTerm', { term: data }, (result)=> {
      dispatch(phraseChangeSuccess(data));
    });
  };
};

export const updateNewTweets = () => {
  return {
    type : LOAD_NEW_TWEETS
  };
};

export const loadTweets = (data) => {
  return {
    type : LOAD_TWEET,
    payload: data
  };
};

const phraseChangeInit = () => {
  return {
    type: PHRASE_CHANGE_INIT
  }
};

const phraseChangeSuccess = (data) => {
  return {
    type: PHRASE_CHANGE_SUCCESS,
    payload: data
  }
};

export const socketDisconnected = () => {
  return {
    type: SOCKET_DISCONNECTED
  }
};

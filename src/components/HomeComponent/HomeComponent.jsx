import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loadTweets } from "store/actions";
import SearchComponent from "../SearchComponent/SearchComponent";
import TweetList from "../TweetList/TweetList";
import socket from "../../../socket";

const HomeComponent = () => {
  const dispatch = useDispatch();
  const searchPhrase = useSelector(store => store.searchPhrase);
  
  useEffect(()=> {
    let connection = socket.getConnection();
    connection.on('connect', ()=> {
      connection.emit('updateSearchTerm', { term: searchPhrase }, ()=> {
        console.log('Initial Phrase set to', searchPhrase);
      });
    })
    connection.on('tweets', data => {
      console.log(data);
      dispatch(loadTweets(data));
    });
    connection.on('disconnect', () => {
      connection.off("tweets")
      connection.removeAllListeners("tweets");
    });

    () => {
      connection.disconnect();
    }
  },[])

  return (
    <div>
      <SearchComponent />
      <TweetList />
    </div>
  )
}

export default HomeComponent;

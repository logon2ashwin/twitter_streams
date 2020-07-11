import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { loadTweets } from "store/actions";
import SearchComponent from "../SearchComponent/SearchComponent";
import TweetList from "../TweetList/TweetList";
import socket from "../../../socket";

const HomeComponent = () => {
  const dispatch = useDispatch();
  
  useEffect(()=> {
    let connection = socket.getConnection();
    connection.on('tweets', function(data){
      console.log(data);
      dispatch(loadTweets(data));
    });
    connection.on('disconnect', function(){
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

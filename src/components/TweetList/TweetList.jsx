import React, { useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import "./TweetList.scss";

const TweetList = (props) => {
  const searchPhrase = useSelector(store => store.searchPhrase);
  const displayTweets = useSelector(store => store.displayTweets);

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en', { month: 'long', day:'numeric', hour: 'numeric', minute: 'numeric'}).format(new Date(dateString));
  }

  return (
    <motion.div className="tweets">
      <motion.h2>Showing Trends for {searchPhrase} </motion.h2>
      <motion.ul className="tweets-container" >
        {
          displayTweets.length ? 
          displayTweets.map((tweet, i) => {
            if(i < 25) {
              return <motion.li key={i} className="tweet">
                  <div className="tweet-text">
                    {tweet.text}
                  </div>
                  <span className="tweet-user">
                    <FaUserCircle className="tweet-user-icon" />
                    <span className="user-name">{tweet.user.name} @{tweet.user.screen_name}</span>
                  </span>
                  <span className="tweet-time">{formatDate(tweet.created_at)}</span>
                </motion.li>
            }
          })
          :
          null
        }
      </motion.ul>
    </motion.div>
  )
}

export default TweetList;

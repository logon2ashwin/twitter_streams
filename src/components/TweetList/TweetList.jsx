import React, { useEffect, useState } from 'react';
import { unix } from "moment";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import "./TweetList.scss";

const TweetList = (props) => {
  const searchPhrase = useSelector(store => store.searchPhrase);
  const displayTweets = useSelector(store => store.displayTweets);

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
                  <span className="tweet-time">{unix(tweet.timestamp_ms).format('MM Do, h:mm a')}</span>
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

import config
import requests
import base64
import json
import pyrebase
from getTweets import uploadTweets
import numpy as np
from collections import OrderedDict

def getAllTweetsArray(db):
    hockey_tweet_data = np.array(uploadTweets(db, ['hockey', 'gretzky', 'nhl', 'sidney crosby', 'ovechkin', 'connor mcdavid', 'evgeni malkin', 'victor hedman', 'nathan mackinnon', 'erik karlsson', 'anze kopitar']))

    football_tweet_data = np.array(uploadTweets(db, ['nfl -RT', 'touchdown','field goal','quarterback OR runningback', 'sunday football','aaron rogers','gronkowski', 'von miller', 'brees', 'aaron donald', 'gurley', 'julio jones', 'tom brady', 'antonio brown', 'russel wilson', 'deandre hopkins', 'wide AND receiver', 'baker mayfield', 'philip rivers', 'patrick mahomes', 'yards AND catch', 'yards AND carry', 'passing yards', 'espnnfl']))

    basketball_tweet_data = np.array(uploadTweets(db, ['dunk', 'nba', 'damian lillard', 'embiid', 'kawhi leonard', 'russel westbrook', 'anthony davis', 'giannis', 'kevin durant', 'james harden', 'steph curry', 'stephen curry', 'lebron', 'three pointer']))

    return [hockey_tweet_data, football_tweet_data, basketball_tweet_data]


def rank(all_tweets, sport):
    #all_tweets is 3 arrays: tweet ids, fav counts, rt count
    #array of scores
    newest_tweet_id = np.amax(all_tweets[0,:])
    oldest_tweet_id = np.amin(all_tweets[0,:])
    tweet_id_range = newest_tweet_id - oldest_tweet_id
    time_scores = np.divide(all_tweets[0,:]-oldest_tweet_id,tweet_id_range)+2
    composite_scores = np.multiply(time_scores,all_tweets[1,:])
    #print(composite_scores)
    sorted_ind = np.argsort(-composite_scores)
    tweet_ids = all_tweets[0,:]
    sorted_tweet_ids = tweet_ids[sorted_ind]
    return [str(id) for id in list(OrderedDict.fromkeys(sorted_tweet_ids))]

def uploadSortedArray(db, sortedFeedObj):
    db.update(sortedFeedObj)

#where feeds is a list of each sport's individual sorted feeds
def zipperMerge(feeds):
    combined_feed = []
    i = 0
    while i < min([len(f) for f in feeds]):
        for feed in feeds:
            combined_feed.append(feed[i])
        i = i +1
    return combined_feed


def runUpdate():
    client_key = config.client_key
    client_secret = config.client_secret
    firebase_config = config.firebase_config

    firebase = pyrebase.initialize_app(firebase_config)
    my_database = firebase.database()

    [hockey_all_tweets, football_all_tweets, basketball_all_tweets] = getAllTweetsArray(my_database)

    hockey_sorted_tweets = rank(hockey_all_tweets, 'hockey')
    football_sorted_tweets = rank(football_all_tweets, 'football')
    basketball_sorted_tweets = rank(basketball_all_tweets, 'basketball')


    hockey_football_sorted_tweets = zipperMerge([hockey_sorted_tweets, football_sorted_tweets])
    hockey_basketball_sorted_tweets = zipperMerge([hockey_sorted_tweets, basketball_sorted_tweets])
    football_basketball_sorted_tweets = zipperMerge([football_sorted_tweets, basketball_sorted_tweets])

    hockey_football_basketball_sorted_tweets = zipperMerge([hockey_sorted_tweets, football_sorted_tweets, basketball_sorted_tweets])

    uploadSortedArray(my_database, { 'hockey_feed': hockey_sorted_tweets} )
    uploadSortedArray(my_database, { 'football_feed': football_sorted_tweets} )
    uploadSortedArray(my_database, { 'basketball_feed': basketball_sorted_tweets} )

    uploadSortedArray(my_database, { 'hockey_football_feed': hockey_football_sorted_tweets} )
    uploadSortedArray(my_database, { 'hockey_basketball_feed': hockey_basketball_sorted_tweets} )
    uploadSortedArray(my_database, { 'football_basketball_feed': football_basketball_sorted_tweets} )

    uploadSortedArray(my_database, { 'hockey_football_basketball_feed': hockey_football_basketball_sorted_tweets} )

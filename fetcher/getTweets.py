import config
import requests
import base64
import json
import pyrebase
import numpy as np

client_key = config.client_key
client_secret = config.client_secret
firebase_config = config.firebase_config

def uploadTweets(db, queries):
    key_secret = '{}:{}'.format(client_key, client_secret).encode('ascii')
    b64_encoded_key = base64.b64encode(key_secret)
    b64_encoded_key = b64_encoded_key.decode('ascii')

    base_url = 'https://api.twitter.com/'
    auth_url = '{}oauth2/token'.format(base_url)

    auth_headers = {
        'Authorization': 'Basic {}'.format(b64_encoded_key),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }

    auth_data = {
        'grant_type': 'client_credentials'
    }

    auth_resp = requests.post(auth_url, headers=auth_headers, data=auth_data)

    access_token = auth_resp.json()['access_token']

    search_headers = {
    'Authorization': 'Bearer {}'.format(access_token)
    }
    id_arr = []
    date_arr = []
    fav_count_arr = []
    rt_count_arr = []

    for query in queries:
        search_params = {
            'q': query,
            'lang': 'en',
            'result_type': 'popular',
            'count': 20
        }

        search_url = '{}1.1/search/tweets.json'.format(base_url)

        search_resp = requests.get(search_url, headers=search_headers, params=search_params)
        tweet_data = search_resp.json()

        #import p#print
        #pp = pprint.PrettyPrinter(indent=4)
        #pp.pprint(tweet_data)
        #x= input('press to stop')



        new_tweet_ids = [str(x['id']) for x in tweet_data['statuses']]
        id_arr.extend(new_tweet_ids)

        date_arr.extend([str(x['created_at']) for x in tweet_data['statuses']])
        fav_count_arr.extend([int(x['favorite_count']) for x in tweet_data['statuses']])
        rt_count_arr.extend([int(x['retweet_count']) for x in tweet_data['statuses']])
        #print('{} total tweets found for query: {}'.format(len(new_tweet_ids),query))

    for i in range(len(id_arr)):
        next_entry = {
            'date': date_arr[i],
            'favs': fav_count_arr[i],
            'rts': rt_count_arr[i]
        }

        db.child('static').child(id_arr[i]).update(next_entry)





    return [[int(id) for id in id_arr], fav_count_arr, rt_count_arr]

#firebase = pyrebase.initialize_app(firebase_config)
#my_database = firebase.database()

#print(uploadTweets(my_database, ['nfl -RT', 'touchdown OR field goal', 'college football','ncaa football','quarterback OR runningback', 'RB OR QB OR WR', 'tom brady', 'dak prescott']))

import tweepy
import json
from datetime import datetime

# Replace with your own credentials
bearer_token = 'AAAAAAAAAAAAAAAAAAAAAGDXvQEAAAAA71f7Ds3pn2fpyxm6UGXZOrBHqyc%3DoVIdu4ixoyEXsWpaRYvDp3m7v3fGajcSyP54eEDh3g7SanfvJI'

# Authenticate to Twitter
client = tweepy.Client(bearer_token=bearer_token)

def fetch_recent_tweets(query):
    try:
        # Search for recent tweets containing the query
        tweets = client.search_recent_tweets(query=query, max_results=10)
        
        tweet_data = {
            'date': datetime.now().isoformat(),
            'tweets': [{'text': tweet.text, 'created_at': tweet.created_at} for tweet in tweets.data]
        }
        
        filename = f'recent_tweets_{query}_{datetime.now().strftime("%Y-%m-%d_%H-%M-%S")}.json'
        with open(filename, 'w') as file:
            json.dump(tweet_data, file, indent=4)

        return tweet_data

    except tweepy.TweepyException as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    # Example query to search for recent tweets
    query = 'trending'  # Modify based on your interest
    tweet_data = fetch_recent_tweets(query)
    print(tweet_data)

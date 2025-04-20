from flask import Flask, request, jsonify
from pymongo import MongoClient
import pandas as pd
from surprise import Dataset, Reader, KNNBasic
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# MongoDB connection
client = MongoClient('mongodb+srv://vanshita222003:Klawclaw_22@mitrc.onxuacg.mongodb.net/',
                     tlsAllowInvalidCertificates=True)
db = client['bloging']
orders_collection = db['recomm']

# Function to get recommendations
def get_recommendations(user_id):
    try:
        # Ensure user_id is treated as a string for MongoDB query consistency
        # user_id = str(user_id)
        print(f"Fetching orders for user_id: {user_id} (Type: {type(user_id)})")

        # Fetch last 10 orders for the user
        # last_10_orders = list(orders_collection.find({'user_id': user_id}).sort('order_date', -1).limit(10))
        last_10_orders = list(orders_collection.find({'user_id': int(user_id)}).sort('order_date', -1).limit(10))

        print(f"Last 10 orders for user_id {user_id}: {last_10_orders}")

        if not last_10_orders:
            print(f"No orders found for user_id {user_id}")
            return []

        df_last_10_orders = pd.DataFrame(last_10_orders)

        # Ensure required fields exist
        if 'order_date' not in df_last_10_orders or 'item_id' not in df_last_10_orders or 'rating' not in df_last_10_orders:
            print("Missing required fields in fetched data")
            return []

        df_last_10_orders['order_date'] = pd.to_datetime(df_last_10_orders['order_date'])
        df_sorted = df_last_10_orders.sort_values(by=['user_id', 'order_date'], ascending=True)

        # Prepare dataset for recommendation
        data = Dataset.load_from_df(df_sorted[['user_id', 'item_id', 'rating']], Reader(rating_scale=(1, 5)))

        # Train item-based collaborative filtering model
        sim_options = {'name': 'cosine', 'user_based': False}
        algo = KNNBasic(sim_options=sim_options)
        trainset = data.build_full_trainset()
        algo.fit(trainset)

        # Get recommended items
        recommended_items = set()
        for item_id in df_sorted['item_id']:
            try:
                inner_id = algo.trainset.to_inner_iid(item_id)
                neighbors = algo.get_neighbors(inner_id, k=5)
                similar_items = [algo.trainset.to_raw_iid(inner_id) for inner_id in neighbors]
                recommended_items.update(similar_items)
            except Exception as e:
                print(f"Error processing item_id {item_id}: {str(e)}")

        return list(recommended_items)

    except Exception as e:
        print(f"Error in get_recommendations: {str(e)}")
        return []

# API Endpoint
@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        user_id = request.json.get('user_id')
        if not user_id:
            return jsonify({'error': 'Missing user_id'}), 400
        
        # Convert user_id to string for consistency in database query
        user_id = str(user_id)

        recommendations = get_recommendations(user_id)
        return jsonify({'recommendations': recommendations})

    except Exception as e:
        print(f"Error in /recommend API: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(debug=True)

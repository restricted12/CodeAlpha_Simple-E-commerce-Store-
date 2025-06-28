# Simple Recommendation System using Scikit-learn for integration with MERN app
# This code can be served via Flask API and connected to your Node.js backend

import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Sample dataset (e.g., user-item interactions for an e-commerce app)
data = {
    'user_id': [1, 1, 1, 2, 2, 3, 3, 3],
    'item_id': ['item1', 'item2', 'item3', 'item1', 'item4', 'item2', 'item3', 'item4'],
    'rating': [5, 3, 4, 4, 5, 3, 4, 2]
}
df = pd.DataFrame(data)

# Create user-item matrix
user_item_matrix = df.pivot_table(index='user_id', columns='item_id', values='rating').fillna(0)

# Calculate cosine similarity between users
user_similarity = cosine_similarity(user_item_matrix)
user_similarity_df = pd.DataFrame(user_similarity, index=user_item_matrix.index, columns=user_item_matrix.index)

# Function to get recommendations for a user
def get_recommendations(user_id, user_item_matrix, user_similarity_df, top_n=2):
    similar_users = user_similarity_df[user_id].sort_values(ascending=False)[1:top_n+1].index
    recommended_items = []
    for similar_user in similar_users:
        # Get items rated by similar users but not by the target user
        user_items = user_item_matrix.loc[user_id]
        similar_user_items = user_item_matrix.loc[similar_user]
        new_items = similar_user_items[similar_user_items > 0][user_items == 0].index
        recommended_items.extend(new_items)
    return list(set(recommended_items))[:top_n]

# Example: Get recommendations for user 1
recommendations = get_recommendations(1, user_item_matrix, user_similarity_df)
print(f"Recommended items for user 1: {recommendations}")

# To integrate with MERN:
# 1. Save this as a Flask API endpoint (e.g., /recommend/<user_id>)
# 2. Call it from your Node.js backend using axios or fetch
# 3. Display results in your React frontend
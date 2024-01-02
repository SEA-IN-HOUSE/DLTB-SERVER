#!/bin/bash

# Define the MongoDB connection string
MONGO_URI="localhost:27017/filipay-live"

# Extracting database name from connection string
DB_NAME=$(echo $MONGO_URI | awk -F '/' '{print $NF}')

# Get a list of collections in the database
COLLECTIONS=$(mongo $MONGO_URI --eval "db.getCollectionNames()" --quiet | tr -d '[] ' | tr ',' '\n')

# Create a directory for the exports
EXPORT_DIR="mongodb_exports_$(date +"%Y%m%d_%H%M%S")"
mkdir "$EXPORT_DIR"

# Loop through each collection and export it to a JSON file
for COLLECTION in $COLLECTIONS
do
    COLLECTION_NAME=$(echo $COLLECTION | tr -d '"')
    echo "Exporting collection: $COLLECTION_NAME"
    mongoexport --uri="mongodb://$MONGO_URI" --collection="$COLLECTION" --out="$EXPORT_DIR/$COLLECTION_NAME.json" --jsonArray
done

echo "All collections exported to $EXPORT_DIR"

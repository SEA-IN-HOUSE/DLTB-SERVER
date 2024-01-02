# Define the MongoDB connection string
$MONGO_URI = "localhost:27017/filipay-live"

# Specify the directory containing the exported JSON files
$EXPORT_DIR = "filipay-live"  # Update this path to match your export directory

# Get a list of JSON files in the export directory
$JSON_FILES = Get-ChildItem -Path $EXPORT_DIR -Filter *.json

# Loop through each JSON file and import it into the corresponding collection
foreach ($FILE in $JSON_FILES) {
    $COLLECTION_NAME = $FILE.BaseName
    Write-Host "Importing collection: $COLLECTION_NAME"
    & mongoimport --uri "mongodb://$MONGO_URI" --collection $COLLECTION_NAME --file $FILE.FullName --jsonArray
}

Write-Host "All collections imported from $EXPORT_DIR to $MONGO_URI"

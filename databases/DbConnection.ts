import mongoose from "mongoose";

export function connectToMongoDB (connectionString: string){
  console.log('Connecting to database...')
  mongoose.connect(connectionString)
  const db = mongoose.connection;
  db.on('error', (error) => {
    console.error(error)
    console.log("Reconnecting to databasesssssss...")
    console.log("connectToMongoDB connectionString: "+connectionString)
    setTimeout(connectToMongoDB, 1000)
  })
  db.once('open', () => console.log("Connected to database"))
};


export function connectToFilipayDB (connectionString: string)  {
  console.log("Connecting to database...");
  console.log("connectToFilipayDB connectionString: "+connectionString)
  const db = mongoose.createConnection(connectionString);

  db.on("error", (error) => {
    console.error(error);
    console.log("Reconnecting to databasessssssss...");
    setTimeout(() => connectToFilipayDB(connectionString), 1000);
  });

  db.once("open", () => console.log("Connected to database"));

  return db;
};


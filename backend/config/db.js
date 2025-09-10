import mongoose from "mongoose";

export const connectDB = async () => {          //We mark it async because connecting to MongoDB takes time, so we want to wait until the connection is done.
  try {                                         //If there's a problem (like wrong password or no internet), the error is caught in the catch block.
  
    const conn = await mongoose.connect(process.env.MONGO_URI, {            // //This tries to connect to the MongoDB database using the connection string stored in your .env file under the name MONGO_URI.
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      dbName: "seat_reservation" // 👈 force database name
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);              //prints the MongoDB host address
  } catch (error) {                                                        //If the connection fails, this part runs.
    console.error(`Error connecting to MongoDB: ${error.message}`);         //Prints an error message explaining why it failed (e.g., wrong password, server down).
    process.exit(1);                                                        //This stops the app immediately if the connection fails.
                                                                            //1 means "exit with error" (0 would mean "success").
  }
};

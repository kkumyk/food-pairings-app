import express from 'express';
import cors from 'cors';

// this line creates a new express app;
const app = express();

/*
converts the body of requests and responses we make them into json
so that we don't need to do it manually every time we a request;
*/
app.use(express.json());

// takes care of the security of the requests
app.use(cors());

// return a "success" message as a part of the response whenever this endpoint is called
app.get("/api/recipes/search", async (req, res) => {
    res.json({message: 'success!'});
})

/*
- a function to start the app
- the first parameter is going to be the port
- the second parameter is not necessary but helpful to have
- it is a function that runs after the app has started 
*/
app.listen(5000, () => {
    console.log("server running on localhost:5000");
});
// export mongoose
const mongoose = require("mongoose")

// assign mongoDb connection string to Uri and declare options settings
var uri = "mongodb+srv://tanzilu:tanzilu10@cluster0.b6yer.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.set('useFindAndModify', false);

mongoose.connect(uri, options).then(
    () => {
    console.log("Database connection established!");
    },
    err => {  
        console.log("Error connecting Database instance due to:", err); 
    }
);


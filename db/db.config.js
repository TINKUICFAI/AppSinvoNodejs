const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "appsinvo",
});

connection.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
    console.log(`Database is Connected`);

    }
})

exports.connect = connection.promise();

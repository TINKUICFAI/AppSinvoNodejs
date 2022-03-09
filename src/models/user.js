const { connect } = require("../../db/db.config.js");
const { currentDateTime } = require("../../utils/date.js");

const User = {};

User.getAllUsers = async () => {
    const result = await connect.query("select id, name, email, createdAt from user");
    return result;
};

User.getUserById = async (id) => {
    const result = await connect.query("select name, email,address, latitude, longitude, status, createdAt from user where id=?", [id]);
    return result;
};

User.getUserByEmail = async (email) => {
    const result = await connect.query("select * from user where email=?", [email]);
    return result;
};

User.insertUser = async (body) => {
    const { ...restBody } = body;

    const keys = Object.keys(restBody);

    let queryString = "";
    const valueArray = [];

    keys.forEach((key) => {
        queryString += `${key}=?,`;
        valueArray.push(restBody[key]);
    });

    const result = await connect.query(`insert into user set  ${queryString} createdAt=?`, [
        ...valueArray,
        currentDateTime()
    ]);

    return result;
};

User.deleteUserById = async (id) => {
    const result = await connect.query("delete from user where id=?", [id]);
    return result;
};

User.updateUserById = async (body) => {
    const { id, ...restBody } = body;

    delete restBody.password;
    delete restBody.email;

    const keys = Object.keys(restBody);

    let queryString = "";
    const valueArray = [];

    keys.forEach((key) => {
        queryString += `${key}=?,`;
        valueArray.push(restBody[key]);
    });

    const result = await connect.query(`update user set ${queryString} updatedAt=? where id=?`, [
        ...valueArray,
        currentDateTime(),
        id,
    ]);

    return result;
};

User.updateUserSatus = async (body) => {

    const result = await connect.query(`update user set updatedAt=?, status = (CASE status WHEN 1 THEN 0 ELSE 1 END) `, [
        currentDateTime(),
    ]);

    return result;
};

User.updateUserPassword = async (body) => {
    const { id, ...restBody } = body;

    delete restBody.email;
    delete restBody.name;
    delete restBody.createdDate;
    delete restBody.verify;

    const keys = Object.keys(restBody);

    let queryString = "";
    const valueArray = [];

    keys.forEach((key) => {
        queryString += `${key}=?,`;
        valueArray.push(restBody[key]);
    });

    const result = await connect.query(`update user set ${queryString} updatedDate=? where id=?`, [
        ...valueArray,
        currentDateTime(),
        id,
    ]);

    return result;
};


User.getDistance = async (body,id) => {
    const result = await connect.query(`call getUserDistance(${id},${body.latitude},${body.longitude}) `,[
        id
    ]);
    return result;
};

User.getWeekDay = async () => {
    const result = await connect.query(`select name , email,
    case
    when weekday(createdAt)='0' then 'Sunday'
    when weekday(createdAt)='1' then 'Monday'
    when weekday(createdAt)='2' then 'Tuesday'
    when weekday(createdAt)='3' then 'Wednesday'
    when weekday(createdAt)='4' then 'Thursday'
    when weekday(createdAt)='5' then 'Friday'
    when weekday(createdAt)='6' then 'Saturday'
    end as ActualDayName
    from user ;`);
    return result;
};

// User.getWeekDay = async () => {
//     const result = await connect.query(`select name , email from user   ;`);
//     return result;
// };

module.exports = User;

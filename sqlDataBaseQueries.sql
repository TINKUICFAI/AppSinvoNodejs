create database userDemoAuth;

use userdemoauth;

create table user(id int primary key auto_increment, name varchar(100) not null,email varchar(100) unique key not null,password varchar(500) not null,createdDate timestamp not null, updatedDate timestamp);

ALTER TABLE user
ADD verify tinyint not null;

desc user;

DELIMITER //
create procedure insertUser(name varchar(100), email varchar(100),password varchar(500), createdDate timestamp ,verify tinyint)
begin
insert into user(name, email,password, createdDate, verify) values(name, email,password, createdDate, verify);
end;//
DELIMITER ;

call insertUser("Tinku Kumar","demoemail@gmail.com","123456",now(),0);

DELIMITER //
create procedure getAllUser()
begin
select * from user;
end;//
DELIMITER ;

call getAllUser;

DELIMITER //
create procedure getUser(id int)
begin
select * from user where id=id;
end;//
DELIMITER ;



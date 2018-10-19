use mysql;
ALTER USER 'nodester'@'%' IDENTIFIED WITH mysql_native_password BY 'nodester';
flush privileges;
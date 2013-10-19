#Script to setup dvelopment and test database on localhost

create role rabhdev with login password 'dev';
create schema "rabhdev" authorization rabhdev;

create role rabhtest with login password 'test';
create schema "rabhtest" authorization rabhtest;
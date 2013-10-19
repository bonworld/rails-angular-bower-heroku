#Script to setup dvelopment and test database on localhost

create role rabhdev with login password '';
alter role rabhdev with createdb;
create schema rabhdev authorization rabhdev;

create role rabhtest with login password '';
alter role rabhtest with createdb;
create schema rabhtest authorization rabhtest;

# For dropping and recreating

drop schema rabhdev cascade;
drop role rabhdev;

drop schema rabhtest cascade;
drop role rabhtest;

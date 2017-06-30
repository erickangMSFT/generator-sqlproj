#!/bin/bash

mv $(ls | grep Table.sql) ./tables
mv $(ls | grep View.sql) ./views
mv $(ls | grep Type.sql) ./types
mv $(ls | grep Function.sql) ./functions
mv $(ls | grep Procedure.sql) ./procedures
mv $(ls | grep User.sql) ./security
mv $(ls | grep Schema.sql) ./security
mv $(ls | grep .sql) ./misc
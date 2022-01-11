#!/bin/bash
# select * from <tablename>

if [ "$#" != 1 ];
then
    echo "Usage: ./select.sh <table_name>"
else
    if [ "$1" == "sv_hotel_in" ];
    then
        cat ./sql/sv_hotel_in-select.sql | mysql -hlocalhost -uayrton -p sv_hoteles
    elif [ "$1" == "sv_hotel_out" ];
    then
        cat ./sql/sv_hotel_out-select.sql | mysql -hlocalhost -uayrton -p sv_hoteles
    fi
fi
#!/bin/bash
# desc table <tablename>

if [ "$#" != 1 ];
then
    echo "Usage: ./desc_table.sh <table_name>"
else
    if [ "$1" == "sv_hotel_in" ];
    then
        cat sv_hotel_in-desc.sql | mysql -hlocalhost -uayrton -p sv_hoteles
    elif [ "$1" == "sv_hotel_out" ];
    then
        cat sv_hotel_out-desc.sql | mysql -hlocalhost -uayrton -p sv_hoteles
    fi
fi
#!/bin/bash
echo "start test"
if  test $# -ne 1; then
    echo "param error,please input correct param! for example: ./press_test.sh 1000 \n"
    exit 0
fi

for((i = 0; i < $1; i=i+1))
    do nohup node load.js &
    sleep 0.1
done
echo "end test"


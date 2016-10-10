#!/bin/bash

for ((i=0;i<5;i++)); do

{
    #echo $i
    node test.js $i
}
done

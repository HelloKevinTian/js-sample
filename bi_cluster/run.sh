#!/bin/bash

pm2 install pm2-intercom

pm2 start pm2.config.js --env prod
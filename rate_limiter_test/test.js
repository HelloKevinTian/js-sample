var RateLimiter = require('limiter').RateLimiter;
// Allow 150 requests per hour (the Twitter search limit). Also understands
// 'second', 'minute', 'day', or a number of milliseconds
var limiter = new RateLimiter(5, 'min');

function go() {
    // Throttle requests
    limiter.removeTokens(1, function(err, remainingRequests) {
      // err will only be set if we request more than the maximum number of
      // requests we set in the constructor
      
      // remainingRequests tells us how many additional requests could be sent
      // right this moment
      
      callMyRequestSendingFunction(err, remainingRequests);
    });
}

function callMyRequestSendingFunction(err, remainingRequests) {
    console.log('>>', err, remainingRequests, Math.floor(Date.now() / 1000))
}

for (let index = 0; index < 7; index++) {
    go();
}
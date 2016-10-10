/**
 * Created by King Lee on 2015/1/5.
 */
var redis_pools = require("./redis_pools");
var redis_rank_pvp_wrapper = module.exports;
var util = require('./util');
var h_rank_pvp = 'h_rank_pvp';
var z_rank_pvp_score = 'z_rank_pvp_score';
var z_rank_pvp_strength = 'z_rank_pvp_strength';
var h_award_pvp = 'h_award_pvp';
var h_rank_pvp_cheat = 'h_rank_pvp_cheat';
var h_rank_pvp_cheat2 = 'h_rank_pvp_cheat2';
var h_rank_pvp_upload = 'h_rank_pvp_upload';

/**
 * add rank info at first enter pvp
 * @param device_guid
 * @param rank_info
 */
redis_rank_pvp_wrapper.set_rank_info = function(channel,device_guid,rank_info,cb){
    redis_pools.execute('memory_leak',function(client, release) {
        client.hset(h_rank_pvp, device_guid, JSON.stringify(rank_info), function (err, reply) {
            if (err) {
                //  some thing log
                console.log(err);
            }
            cb(reply);
            release();
        });
    });
    var championship_id = util.getWeek(new Date());
    redis_pools.execute('memory_leak',function(client, release) {
        client.hset(h_rank_pvp + ":" + championship_id, device_guid, JSON.stringify(rank_info), function (err, reply) {
            if (err) {
                //  some thing log
                console.log(err);
            }
            cb(reply);
            release();
        });
    });

        redis_pools.execute('memory_leak',function(client, release) {
            client.hset(h_rank_pvp + ":" + channel,device_guid, JSON.stringify(rank_info),function (err, reply) {
                if (err) {
                    //  some thing log
                    console.log(err);
                }
                release();
            });
        });
    
};

/**
 * get rank info form redis
 * @param device_guid
 * @param cb
 */
redis_rank_pvp_wrapper.get_rank_info = function(device_guid,device_emui,cb){
    //  use device_guid first, if not exist,try device_emui
    redis_pools.execute('memory_leak',function(client, release) {
        client.hget(h_rank_pvp, device_guid, function (err, reply) {
            if (err) {
                //  some thing log
                console.log(err);
            }
            if(!reply){
                redis_pools.execute('memory_leak',function(client, release) {
                    client.hget(h_rank_pvp, device_emui, function (err, reply) {
                        if (err) {
                            //  some thing log
                            console.log(err);
                        }
                        if(reply){
                            //  copy data from device_emui to device_guid
                            var rank_info = JSON.parse(reply);
                            //  clear data
                            //rank_info.phone_number = "";
                            //rank_info.nickname = "跑男车手";
                            //rank_info.area = "滨海市";
                            redis_rank_pvp_wrapper.set_rank_info(rank_info.channel,device_emui,rank_info,function(){});
                            rank_info.device_guid = device_guid;
                            redis_rank_pvp_wrapper.dump_rank_pvp(rank_info);
                            reply = JSON.stringify(rank_info);
                        }
                        cb(reply);
                        release();
                    });
                });
            }else{
                cb(reply);
            }
            release();
        });
    });
};

/**
 * get rank info form redis batch
 * @param device_guid
 * @param cb
 */
redis_rank_pvp_wrapper.get_rank_info_batch = function(device_guid_array,cb){
    redis_pools.execute('memory_leak',function(client, release) {
        client.hmget(h_rank_pvp, device_guid_array, function (err, reply) {
            if (err) {
                //  some thing log
                console.log(err);
            }
            cb(reply);
            release();
        });
    });
};

redis_rank_pvp_wrapper.get_rank_info_weekly_batch = function(championship_id,device_guid_array,cb){
    redis_pools.execute('memory_leak',function(client, release) {
        client.hmget(h_rank_pvp + ":" + championship_id, device_guid_array, function (err, reply) {
            if (err) {
                //  some thing log
                console.log(err);
            }
            cb(reply);
            release();
        });
    });
};

redis_rank_pvp_wrapper.get_rank_info_activity_batch = function(championship_id,device_guid_array,cb){
    redis_pools.execute('memory_leak',function(client, release) {
        client.hmget(h_rank_pvp + ":" + championship_id, device_guid_array, function (err, reply) {
            if (err) {
                //  some thing log
                console.log(err);
            }
            cb(reply);
            release();
        });
    });
};

/**
 * update some about area,phone info for player
 * @param device_guid
 * @param area
 * @param phone
 * @param cb
 */
redis_rank_pvp_wrapper.update_rank_info = function(device_guid,device_emui,channel,area,phone_number,nickname,cb){
    redis_rank_pvp_wrapper.get_rank_info(device_guid,device_emui,function(rank_info){
        if(rank_info){
            rank_info = JSON.parse(rank_info);
            rank_info.area = area;
            rank_info.phone_number = phone_number;
            rank_info.nickname = nickname;
            redis_rank_pvp_wrapper.set_rank_info(channel,device_guid,rank_info);
        }
        cb(rank_info);
    });
};

/**
 * update score to rank/rank weekly
 * @param device_guid
 * @param championship_id : the week index
 * @param score : the latest score
 */
redis_rank_pvp_wrapper.update_score_rank = function(channel,device_guid,championship_id,rank_info){
    //  avoid score is 0 in redis
    if(0 != rank_info.score){
        redis_pools.execute('memory_leak',function(client, release) {
            client.zadd(z_rank_pvp_score, rank_info.score,device_guid, function (err, reply) {
                if (err) {
                    //  some thing log
                    console.log(err);
                }
                release();
            });
        });
    }
    //  avoid score_weekly is 0 in redis
    if(0 != rank_info.score_weekly){
        redis_pools.execute('memory_leak',function(client, release) {
            client.zadd(z_rank_pvp_score + ":" + championship_id, rank_info.score_weekly,device_guid, function (err, reply) {
                if (err) {
                    //  some thing log
                    console.log(err);
                }
                release();
            });
        });
    }

        //  avoid score_activity is 0 in redis
        if(0 != rank_info.score_activity){
            redis_pools.execute('memory_leak',function(client, release) {
                client.zadd(z_rank_pvp_score + ":" + channel, rank_info.score_activity,device_guid, function (err, reply) {
                    if (err) {
                        //  some thing log
                        console.log(err);
                    }
                    release();
                });
            });
            //  if the channel is different from store in file, record it!
            if(channel != rank_info.channel){
                redis_rank_pvp_wrapper.record_cheat2_info(channel,rank_info);
            }
        }
    /*
    redis_pools.execute('memory_leak',function(client, release) {
        client.hset(h_rank_pvp_upload,Date.now(), JSON.stringify(rank_info),function (err, reply) {
            if (err) {
                //  some thing log
                console.log(err);
            }
            release();
        });
    });
    */
};

/**
 * get rank by score
 * @param device_guid
 * @param cb
 */
redis_rank_pvp_wrapper.get_score_rank = function(device_guid,cb){
    redis_pools.execute('memory_leak',function(client, release) {
        client.zrevrank(z_rank_pvp_score,device_guid,function (err, reply) {
            if (err) {
                //  some thing log
                console.log(err);
            }
            cb(reply);
            release();
        });
    });
};

/**
 * get score rank from 1 to 10
 * @param cb
 */
redis_rank_pvp_wrapper.get_score_rank_partial = function(cb){
    redis_pools.execute('memory_leak',function(client, release) {
        client.zrevrange(z_rank_pvp_score,0,9,function (err, reply) {
            if (err) {
                //  some thing log
                console.log(err);
            }
            cb(reply);
            release();
        });
    });
};

/**
 * get rank by score weekly
 * @param device_guid
 * @param championship_id
 * @param cb
 */
redis_rank_pvp_wrapper.get_score_rank_weekly = function(device_guid,championship_id,cb){
    redis_pools.execute('memory_leak',function(client, release) {
        client.zrevrank(z_rank_pvp_score + ":" + championship_id,device_guid, function (err, reply) {
            if (err) {
                //  some thing log
                console.log(err);
            }
            cb(reply);
            release();
        });
    });
};

redis_rank_pvp_wrapper.get_score_rank_activity = function(device_guid,channel,cb){
    redis_pools.execute('memory_leak',function(client, release) {
        client.zrevrank(z_rank_pvp_score + ":" + channel,device_guid, function (err, reply) {
            if (err) {
                //  some thing log
                console.log(err);
            }
            cb(reply);
            release();
        });
    });
};

/**
 * get the top 10 by score weekly
 * @param championship_id
 * @param cb
 */
redis_rank_pvp_wrapper.get_score_rank_partial_weekly = function(championship_id,cb){
    redis_pools.execute('memory_leak',function(client, release) {
        client.zrevrange(z_rank_pvp_score + ":" + championship_id,0,9,function (err, reply) {
            if (err) {
                //  some thing log
                console.log(err);
            }
            cb(reply);
            release();
        });
    });
};

redis_rank_pvp_wrapper.get_score_rank_partial_activity = function(device_guid,championship_id,cb){
    redis_rank_pvp_wrapper.get_score_rank_weekly(device_guid,championship_id,function(mine_score_rank_weekly){
        var score_rank_weekly = (mine_score_rank_weekly != null) ? parseInt(mine_score_rank_weekly) + 1 : mine_score_rank_weekly;
        var rank_range_low = (score_rank_weekly - 11) > 0 ? score_rank_weekly - 11 : 0;
        var rank_range_high = score_rank_weekly != null ? (score_rank_weekly + 9) : 9;
        redis_pools.execute('memory_leak',function(client, release) {
            client.zrevrange(z_rank_pvp_score + ":" + championship_id,rank_range_low,rank_range_high,function (err, reply) {
                if (err) {
                    //  some thing log
                    console.log(err);
                }
                cb(reply);
                release();
            });
        });
    });
};

/**
 * get current week's rank info
 * @param championship_id
 * @param cb
 */
redis_rank_pvp_wrapper.get_all_rank_info_weekly = function(championship_id,cb){
    redis_pools.execute('memory_leak',function(client, release) {
        client.hgetall(h_rank_pvp + ":" + championship_id,function (err, reply) {
            if (err) {
                //  some thing log
                console.log(err);
            }
            cb(reply);
            release();
        });
    });
};

/**
 * set award
 * @param device_guid
 * @param award_info
 */
redis_rank_pvp_wrapper.set_award = function(device_guid,award_info){
    redis_pools.execute('memory_leak',function(client, release) {
        client.hset(h_award_pvp,device_guid, JSON.stringify(award_info),function (err, reply) {
            if (err) {
                //  some thing log
                console.log(err);
            }
            release();
        });
    });
};

/**
 * get award
 * @param device_guid
 * @param cb
 */
redis_rank_pvp_wrapper.get_award = function(device_guid,cb){
    redis_pools.execute('memory_leak',function(client, release) {
        client.hget(h_award_pvp,device_guid,function (err, reply) {
            if (err) {
                //  some thing log
                console.log(err);
            }
            cb(reply);
            release();
        });
    });
};

/**
 * del award
 * @param device_guid
 */
redis_rank_pvp_wrapper.del_award = function(device_guid){
    redis_pools.execute('memory_leak',function(client, release) {
        client.hdel(h_award_pvp,device_guid,function (err, reply) {
            if (err) {
                //  some thing log
                console.log(err);
            }
            release();
        });
    });
};

/**
 * update score to rank
 * @param device_guid
 * @param strength
 */
redis_rank_pvp_wrapper.update_strength_rank = function(device_guid,strength){
    redis_pools.execute('memory_leak',function(client, release) {
        client.zadd(z_rank_pvp_strength, strength,device_guid, function (err, reply) {
            if (err) {
                //  some thing log
                console.log(err);
            }
            release();
        });
    });
};

/**
 * get rank by strength
 * @param device_guid
 * @param cb
 */
redis_rank_pvp_wrapper.get_strength_rank = function(device_guid,cb){
    redis_pools.execute('memory_leak',function(client, release) {
        client.rank(z_rank_pvp_strength,device_guid, function (err, reply) {
            if (err) {
                //  some thing log
                console.log(err);
            }
            cb(reply);
            release();
        });
    });
};

redis_rank_pvp_wrapper.get_player_by_strength = function(min,max,count,cb){
    redis_pools.execute('memory_leak',function(client, release) {
        //  offset form the first result
        var offset = 0;
        var args = [ z_rank_pvp_strength, min, max, 'LIMIT', offset, count ];
        client.zrangebyscore(args, function (err, reply) {
            if (err) {
                //  some thing log
                console.log(err);
            }
            cb(reply);
            release();
        });
    });
};

/**
 * dump rank info from device emui to device guid
 */
redis_rank_pvp_wrapper.dump_rank_pvp = function(rank_info){
    var channel = rank_info.channel;
    var device_guid = rank_info.device_guid;
    var strength = rank_info.strength;
    var championship_id = util.getWeek(new Date());
    if(championship_id != rank_info.championship_id){
        rank_info.score_weekly = 0;
    }
    redis_rank_pvp_wrapper.set_rank_info(channel,device_guid,rank_info,function(){});
    redis_rank_pvp_wrapper.update_score_rank(channel,device_guid,championship_id,rank_info);
    redis_rank_pvp_wrapper.update_strength_rank(device_guid,strength);
};

redis_rank_pvp_wrapper.record_cheat_info = function(device_guid,rank_info){
    redis_pools.execute('memory_leak',function(client, release) {
        client.hset(h_rank_pvp_cheat,Date.now(), JSON.stringify(rank_info),function (err, reply) {
            if (err) {
                //  some thing log
                console.log(err);
            }
            release();
        });
    });
};

redis_rank_pvp_wrapper.record_cheat2_info = function(channel,rank_info){
    redis_pools.execute('memory_leak',function(client, release) {
        client.hset(h_rank_pvp_cheat2,Date.now() + ':' + channel, JSON.stringify(rank_info),function (err, reply) {
            if (err) {
                //  some thing log
                console.log(err);
            }
            release();
        });
    });
};
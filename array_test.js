var pvpConfig = require('./pvp.json');
var dynamicDungeonTemplate  = require('./DynamicDungeonTemplate.json');;

console.log('array test!')
var rank_level = 3;
var stars = 4;
var scores = 1000;
var fight_winning_continuous_count = 2;

console.log(pvpConfig.rank_players.length)
var rank_players_test = [];
console.log(rank_players_test.length)
rank_players_test.push(pvpConfig.rank_players[0]);
console.log(rank_players_test)

random_val = Math.floor(Math.random()*4);
console.log(random_val)
var val1 = null;
if(!val1)
{
	console.log('is  null')
}
else
{
	console.log('is not null')
}

function test() 
{
	var rank_players = [];
    //  suppose the data get from redis are the same rank level!
    for(var i = 0; i < pvpConfig.rank_players.length; ++i)
    {
        if(pvpConfig.rank_players[i].online)
        {
            if(stars >= stars - pvpConfig.extract_stars_diff 
			&& stars <= stars + pvpConfig.extract_stars_diff)
            {
                rank_players.push(pvpConfig.rank_players[i]);
            }
        }
        if(1 == rank_players.length)
        {
            return rank_players[0].id;
        }
        else if(1 < rank_players.length)
        {
            var rank_player_same_win_times = [];
            //  get the near player by win times continue;
            for(var j = 0; j < rank_players.length; ++j)
            {
                if(rank_players[j].fight_winning_continuous >= rank_players[j].fight_winning_continuous - pvpConfig.extract_win_times_diff
                    && rank_players[j].fight_winning_continuous <= rank_players[j].fight_winning_continuous + pvpConfig.extract_win_times_diff)
                {
                    rank_player_same_win_times.push(rank_players[j]);
                }
            }
            var random_val = 0;
            if(0 != rank_player_same_win_times.length)
            {
                random_val = Math.floor(Math.random()*rank_player_same_win_times.length);
                return rank_player_same_win_times[random_val];
            }
            //  if not any near player by win times continue
            else
            {
                 random_val = Math.floor(Math.random()*rank_players.length);
                return rank_players[random_val].id;
            }
        }
        return -1;
    }
	
}

//test();
var arr = [];
arr[1] = 5;
arr[5] = 55;
console.log(arr.length);
console.log('**********************');
var a = [1,2,3,4,5,6,7,8];
console.log(a);
a.splice(4,1);
console.log(a);
console.log(parseInt(dynamicDungeonTemplate));
//console.log(dynamicDungeonTemplate);
for(var v  in dynamicDungeonTemplate)
{
	if(parseInt(v) == 500000){
		console.log(v)
		console.log(dynamicDungeonTemplate[v])
    }
}

var b = [1,2,3,4,5,6,7,8];
for(var i = 0; i < b.length;)
{
	if(b[i] > 5){
		b.splice(i,1);
		break;
	}
	else{
		++i;
	}
}
console.log("after iterator splice " + b);

var arr_before_sort = [[21000,1],[20000,3]];
console.log("arr_before_sort " + arr_before_sort);
arr_before_sort.sort();
console.log("arr_sfter_sort " + arr_before_sort);

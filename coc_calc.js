//	reference from : http://www.zhihu.com/question/21061157
            var diamond_ranges = [
                1,
                5,
                25,
                125,
                600,
                3000
            ];

            var coins_ranges = [
                100,
                1000,
                10000,
                100000,
                1000000,
                10000000
            ];

var getCoinsLev = function(diamond_number){
    var lev = -1;
    if(diamond_number == 100){
        lev = 0;
    }
    else if(diamond_number > 100 && diamond_number <= 1000){
        lev = 1;
    }
    else if(diamond_number > 1000 && diamond_number <= 10000){
        lev = 2;
    }
    else if(diamond_number > 10000 && diamond_number <= 100000){
        lev = 3;
    }
    else if(diamond_number > 100000 && diamond_number <= 1000000){
        lev = 4;
    }
    else if(diamond_number > 1000000 && diamond_number <= 10000000){
        lev = 5;
    }
    return lev;
};
			var consume_diamond = 0;
			var buys_gold = 9000000;
            var gold_lev = getCoinsLev(buys_gold);
			console.log(gold_lev);
            if(0 == gold_lev){
                consume_diamond = diamond_ranges[gold_lev];
            }
            else if(0 < gold_lev && 5 >= gold_lev){
                consume_diamond = Math.round(
                    (buys_gold-coins_ranges[gold_lev-1])/( (coins_ranges[gold_lev]-coins_ranges[gold_lev-1])/(diamond_ranges[gold_lev]-diamond_ranges[gold_lev-1]) )+ diamond_ranges[gold_lev-1]
                );
            }
			console.log(consume_diamond);
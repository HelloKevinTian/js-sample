const sourceArr = [
    ['942652732',
        'Download',
        'Word Mind - Find and Connect Words (iOS) First open',
        '71.00',
        '0.00'
    ],
    ['942652732',
        'Download',
        'Word Crossy - A crossword game (iOS) first_open',
        '79.00',
        '79.00'
    ],
    ['942652732',
        'Download',
        'WordMind_iOS_AF监测留存使用',
        '64.00',
        '0.00'
    ],
    ['942652732',
        'Other',
        'Word Crossy - A crossword game (iOS) session_start',
        '17.00',
        '17.00'
    ],
    ['1070547079',
        'Download',
        'android_download',
        '1928.00',
        '1928.00'
    ],
    ['1070547079',
        'Purchase/Sale',
        'Word Crossy - A crossword games (Android) In-app purchase',
        '4.00',
        '10.79'
    ],
    ['1070547079', 'Download', 'wordmind 安卓 af转化', '1368.00', '0.00']
];
var sourceObj = {}; //存储整合后的数据项

sourceArr.forEach(item => {
    if (!sourceObj.hasOwnProperty(item[0])) { //创建出该Campaign的结构
        sourceObj[item[0]] = {};
        sourceObj[item[0]].CampaignId = item[0];
    }
    if (item[1] == 'Download' && item[2].indexOf('First open') > -1) {
        let index = item[2].indexOf('(Android)') > -1 ? item[2].indexOf('(Android)') : item[2].indexOf('(iOS)');
        if (index > -1) {
            sourceObj[item[0]].app = item[2].substr(0, index - 1); //存储app
        } else {
            console.error('getCampaignConversionReport no First open:', clientCustomerId, oneDate, item[2]);
        }
        sourceObj[item[0]].Installs = item[3] || 0; //TODO所有转化次数作为安装数
    } else if (item[1] == 'Purchase/Sale') {
        if (!sourceObj[item[0]].hasOwnProperty('app')) {
            let index = item[2].indexOf('(Android)') > -1 ? item[2].indexOf('(Android)') : item[2].indexOf('(iOS)');
            if (index > -1) {
                sourceObj[item[0]].app = item[2].substr(0, index - 1); //存储app
            } else {
                console.error('getCampaignConversionReport no In-app purchase:', clientCustomerId, oneDate, item[2]);
            }
        }
        sourceObj[item[0]].AllConversions = item[3] || 0; //存储所有转化数
        sourceObj[item[0]].AllConversionValue = item[4] || 0; //存储所有转化数
    } else if (item[1] == 'Download' && item[2].indexOf('android_download') > -1) {
        if (!sourceObj[item[0]].hasOwnProperty('Installs')) {
            sourceObj[item[0]].Installs = item[3] || 0; //TODO所有转化次数作为安装数
        }
    }
});

console.log(Object.values(sourceObj)); 
var a = {
    '942652732': {
        CampaignId: '942652732',
        app: 'Word Mind - Find and Connect Words',
        Installs: '71.00'
    },
    '1070547079': {
        CampaignId: '1070547079',
        Installs: '1928.00',
        app: 'Word Crossy - A crossword games',
        AllConversions: '4.00',
        AllConversionValue: '10.79'
    }
}
module.exports = {
    HOUSES: {
        1: { COST: 50, GOLD_RATE: 2 },
        2: { COST: 250, GOLD_RATE: 4 },
        3: { COST: 550, GOLD_RATE: 6 },
        4: { COST: 1250, GOLD_RATE: 8 },
        5: { COST: 2000, GOLD_RATE: 10 },
        6: { COST: 3600, GOLD_RATE: 12 },
        7: { COST: 5000, GOLD_RATE: 14 },
        8: { COST: 9700, GOLD_RATE: 16 },
        9: { COST: 16000, GOLD_RATE: 18 },
        10: { COST: 25000, GOLD_RATE: 20 },
        11: { COST: 42980, GOLD_RATE: 22 },
        12: { COST: 59999, GOLD_RATE: 24 },
        13: { COST: 89540, GOLD_RATE: 26 },
        14: { COST: 140000, GOLD_RATE: 28 },
        15: { COST: 199990, GOLD_RATE: 30 },
        16: { COST: 355585, GOLD_RATE: 32 },
        17: { COST: 555555, GOLD_RATE: 34 },
        18: { COST: 999999, GOLD_RATE: 36 },
        19: { COST: 1500000, GOLD_RATE: 38 },
        20: { COST: 3000000, GOLD_RATE: 40 }
    },
    MARKET: {
        1: {COST: 5000, SAVE_PERCENT: 10},
        2: {COST: 25000, SAVE_PERCENT: 20},
        3: {COST: 200000, SAVE_PERCENT: 30},
        4: {COST: 500000, SAVE_PERCENT: 40},
        5: {COST: 1000000, SAVE_PERCENT: 50}
    },
    SEPTON: {
        COST: 500,
        TRIBUTE: {
          1000: {MULTIPLIER: 2, MESSAGE: 'Septon looks at you with a \"Thanks for nothing\" face'},
          10000: {MULTIPLIER: 4, MESSAGE: 'Septon feels a little grateful'},
          100000: {MULTIPLIER: 6, MESSAGE: 'Septon thinks that the tribute is cheap'},
          250000: {MULTIPLIER: 8, MESSAGE: 'Septon thanks the tribute'},
          500000: {MULTIPLIER: 10, MESSAGE: 'Septon explodes with joy (not literally)'},
          500288: {MULTIPLIER: 12, MESSAGE: 'The seven Gods came from the heavens to get the tribute'}
        }
    },
    FAMILIES: {
        TARGARYEN: {NAME: 'Targaryen', COST: 1000000, SOLDIERS: 400000},
        LANNISTER: {NAME: 'Lannister', COST: 500000, SOLDIERS: 150000},
        STARK: {NAME: 'Stark', COST: 325000, SOLDIERS: 65000},
        BARATHEON: {NAME: 'Baratheon', COST: 250000, SOLDIERS: 25000},
        GREYJOY: {NAME: 'Greyjoy', COST: 125000, SOLDIERS: 52500},
        MARTELL: {NAME: 'Martell', COST: 80000, SOLDIERS: 30000},
        TYRELL: {NAME: 'Tyrell', COST: 10000, SOLDIERS: 4000},
        TULLY: {NAME: 'Tully', COST: 1000, SOLDIERS: 500}
    },
    BARRACKS: {COST:500, TRAIN_COST: 10},
    GAMBLING_HALL: {COST: 7500}
};

const actors = {
    Hero: {
        position: {
            x: 280,
            y: 325
        },
        image: {
            src: './img/emberSprite.png'
        },
        frames: {
            max: 4,
            hold: 40
        },
        animate: true,
        name: 'Hero',
        attacks: [attacks.Strike, attacks.Firebolt, attacks.Witchbolt, attacks.Magebolt] //this selects which attack this actor has
    },

    Heroe: {
        position: {
            x: 280,
            y: 325
        },
        image: {
            src: './img/blueEmberSprite.png'
        },
        frames: {
            max: 4,
            hold: 40
        },
        animate: true,
        name: 'H&eacute;roe',
        attacks: [attacks.Placaje, attacks.Arremetida, attacks.Corte, attacks.Asalto] //this selects which attack this actor has
    },

    Enemy: {
        position: {
            x: 800,
            y: 100
        },
        image: {
            src: './img/dragonSprite.png'
        },
        frames: {
            max: 4,
            hold: 40
        },
        animate: true,
        isEnemy: true,
        name: 'Goblin',
        attacks: [attacks.Strike, attacks.Bite] //this selects which attack this actor has
    },

    Boss: {
        position: {
            x: 730,
            y: 50
        },
        image: {
            src: './img/map.png'
        },
        frames: {
            max: 1,
            hold: 40
        },
        animate: true,
        isEnemy: true,
        name: 'BigKaHoona',
        scale: 1,
        attacks: [attacks.Strike, attacks.Firebolt, attacks.Bite, attacks.Witchbolt] //this selects which attack this actor has
    }
}
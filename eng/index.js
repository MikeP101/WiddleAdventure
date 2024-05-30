const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
//console.log(collisions)
//console.log(battlezonesData)
//console.log(gsap)
// c.fillStyle = 'white'
// c.fillRect(0, 0, canvas.width, canvas.height)

//SCORES
let score = 0;
let enemiesDefeated = 0;

function increaseScore() {
    const randomIncrement = Math.random() < 0.5 ? 1 : 3; // Incrementa en 1 o 3 de forma aleatoria
    score += randomIncrement;
}

function increaseEnemiesDefeated() {
    enemiesDefeated++;
}



canvas.width = 1024
canvas.height = 576
console.log(c)

//map
const image = new Image()
image.src = './img/WAbig.png'

//foreground
const foregroundImage = new Image()
foregroundImage.src = './img/bigforeground.png'

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 140){ //140 is = to the width of the map
    collisionsMap.push(collisions.slice(i, 140 + i))
}

const battlezonesMap = []
for (let i = 0; i < battlezonesData.length; i += 140){ //140 is = to the width of the map
    battlezonesMap.push(battlezonesData.slice(i, 140 + i))
}

const transitionsMap = []
for (let i = 0; i < transitionsData.length; i += 140){ //140 is = to the width of the map
    transitionsMap.push(transitionsData.slice(i, 140 + i))
}

const charactersMap = []
for (let i = 0; i < charactersData.length; i += 140){ //140 is = to the width of the map
    charactersMap.push(charactersData.slice(i, 140 + i))
}


const boundaries = []
//offset for starting position
const offset = {
    x: -260,
    y: -2800
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) 
        boundaries.push(
            new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            })
        )
    })
})
//console.log(boundaries)

const transitions = []

transitionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) 
        transitions.push(
            new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            })
        )
    })
}) 
//console.log(transitions)

const battlezones = []

battlezonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) 
        battlezones.push(
            new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            })
        )
    })
})
//console.log(battlezones)

const characters = []
const pacoImage = new Image()
pacoImage.src = './img/Paco/pacoIdle.png'

const kidImage = new Image()
kidImage.src = './img/Paco/kidIdle.png'

const weirdoImage = new Image()
weirdoImage.src = './img/Paco/weirdIdle.png'

const boyImage = new Image()
boyImage.src = './img/Paco/boyIdle.png'

const mageImage = new Image()
mageImage.src = './img/Paco/mageIdle.png'

const godImage = new Image()
godImage.src = './img/Paco/godIdle.png'

charactersMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        //Paco
        if (symbol === 1026){
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
            characters.push(
                new Character({//Paco
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    image: pacoImage,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    scale: 3,
                    aniamte: false,
                    dialogue: ['I am sorry Hero, but I am all out of bread', 'Those pesky Goblins took all of it', 'Could you take care of this problem?']
                    
                })
            )
        } else if (symbol === 1034){//kid
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    image: kidImage,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    scale: 3,
                    aniamte: false,
                    dialogue: ['Hi Hero!', 'Out to buy some bread?', 'Go quick, before the old man uphill runs out of it!!']

                    
                })
            )
        }else if (symbol === 1042){//weirdo
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    image: weirdoImage,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    scale: 3,
                    aniamte: false,
                    dialogue: ['Have you ever eaten a goblin?', 'Hmm...', 'I wonder how they taste.']

                    
                })
            )
        }else if (symbol === 1038){//BOY
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    image: boyImage,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    scale: 3,
                    aniamte: false,
                    dialogue: ['Hoo boy!', 'I sure wanna fight like you do.', 'Hey Hero, do you even become a flamething?']

                    
                })
            )
        }else if (symbol === 1046){//Mage
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    image: mageImage,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    scale: 3,
                    aniamte: false,
                    dialogue: ['Goblins...', 'How do they work? Why do they only eat bread?', 'I envy your flame form...']

                    
                })
            )
        }else if (symbol === 1030){//God
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    image: godImage,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    scale: 3,
                    aniamte: false,
                    dialogue: ['Hero.', 'Forget the meaningless bread.', 'Become my chosen, the chosen of God.', 'Defeat the evil that lies up this path.', 'And my power will be yours.']

                    
                })
            )
        }

        if (symbol !== 0){
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
})
//console.log(battlezones)


//player
const playerDownImage = new Image()
playerDownImage.src = './img/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = './img/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight.png'

const player = new Sprite({
    position:{ 
        x: canvas.width/2 - 192 / 4 / 2, //on the png, click info and it gives dimensions
        y:canvas.height/2 - 68/2
    },
    image: playerDownImage,
    frames: {
        max: 4, //this crops the player sprite
        hold: 10
    },
    sprites: {
        up: playerUpImage,
        down: playerDownImage,
        left: playerLeftImage,
        right: playerRightImage
    }
})

//starting level position
let background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

let foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const movables = [background, ...boundaries, foreground, ...battlezones, ...transitions, ...characters]//ARRAY THAT DECLARES OBJECTS THAT MOVE

const renderables = [//ARRAY THAT DECLARES OBJECTS THAT ARE RENDERED ON SCREEN
    background, 
    ...boundaries, 
    ...battlezones, 
    ...transitions, 
    ...characters,
    player, 
    foreground
]

const battle = {
    initiated: false
}

const bossbattle = {
    initiated: false
}

const breadCounterElement = document.querySelector('#breadCounter')
const imageElement = document.createElement('img')
imageElement.src = './img/bossIdle.png'
breadCounterElement.appendChild(imageElement)
//ANIMATION LOOP
function animate(){

    document.querySelector('#userInterface').style.display = 'none'//hides battle UI
    const animationId = window.requestAnimationFrame(animate)
    renderables.forEach(renderable => {
        renderable.draw()//this renders and moves renderables
        })
        
    document.querySelector('#breadCounter').style.display = 'block'
    document.querySelector('#breadCounter').innerHTML = 'Bread: ' + score

    let moving = true
    player.animate = false

    if (battle.initiated) return
    //initiates battle randomly when player steps on battle zones
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed){
        
        for (let i = 0; i < battlezones.length; i++){
            //detect for player stepping on battle zone
            const battlezone = battlezones[i]
            const overlappingArea = 
                (Math.min(
                    player.position.x + player.width,
                    battlezone.position.x + battlezone.width
                ) -
                Math.max( player.position.x, battlezone.position.x )) *
                    (Math.min(
                        player.position.y + player.height, 
                        battlezone.position.y + battlezone.height
                    ) - 
                    Math.max( player.position.y, battlezone.position.y ))
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: battlezone
                }) && 
                overlappingArea > (player.width*player.height) / 2
                && Math.random() < 0.02 //randomizes battle encounters
            ){
                console.log("BATTLE ZONE!!")

                //deactivate current animation loop so you don't move during battles
                window.cancelAnimationFrame(animationId)

                audio.Map.stop()//Stops map music
                audio.initBattle.play()//Plays encounter music
                audio.fight.play()//Plays Battle music
                battle.initiated = true
                gsap.to('#overlapdiv', {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete() {
                      gsap.to('#overlapdiv', {
                        opacity: 1,
                        duration: 0.4,
                        onComplete() {
                          // activate a new animation loop for battles
                          initBattle()
                          animateBattle()
                          gsap.to('#overlapdiv', {
                            opacity: 0,
                            duration: 0.4
                          })
                        }
                      })
                    }
                  })
                break
            }
        }
    }

//hopefully activates LEVEL TRANSITION when player steps on battle zones

    if (bossbattle.initiated) return
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed){
        
        for (let i = 0; i < transitions.length; i++){
            //detect for player stepping on battle zone
            const transition = transitions[i]
            const overlappingArea = 
                (Math.min(
                    player.position.x + player.width,
                    transition.position.x + transition.width
                ) -
                Math.max( player.position.x, transition.position.x )) *
                    (Math.min(
                        player.position.y + player.height, 
                        transition.position.y + transition.height
                    ) - 
                    Math.max( player.position.y, transition.position.y ))
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: transition
                }) && 
                overlappingArea > (player.width*player.height) / 2
            ){
                console.log("TRANSITION!!")
                
                //deactivate current animation loop so you don't move during battles
                window.cancelAnimationFrame(animationId)

                audio.Map.stop()//Stops map music
                audio.initBattle.play()//Plays encounter music
                audio.bossFight.play()//Plays Battle music

                bossbattle.initiated = true
                gsap.to('#overlapdiv', {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete() {
                      gsap.to('#overlapdiv', {
                        opacity: 1,
                        duration: 0.4,
                        onComplete() {
                          // activate a new animation loop for bossbattle
                          initBossBattle()
                          animateBossBattle()
                          gsap.to('#overlapdiv', {
                            opacity: 0,
                            duration: 0.4
                          })
                        }
                      })
                    }
                  })
                break
            }
        }
    }
//LEVEL TRANSITION ENDS HERE??

    if (keys.w.pressed && lastKey === 'w') {
        player.animate = true
        player.image = player.sprites.up

        //monitor for character collission
        checkCharacterCollision({characters, player, characterOffset: {x:0, y:3}})

        for(let i = 0; i < boundaries.length; i++){
            //detect for collision 
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }}
                })
            ){
                //console.log("collision right")
                moving = false
                break
            }
        }
        if (moving)
        movables.forEach(movable => {
            movable.position.y += 3
        })
    } else if(keys.a.pressed && lastKey === 'a') {
        player.animate = true
        player.image = player.sprites.left

        //monitor for character collission
        checkCharacterCollision({characters, player, characterOffset: {x:3, y:0}})

        for (let i = 0; i < boundaries.length; i++){
            //detect for collision 
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }}
                })
            ){
                //console.log("collision right")
                moving = false
                break
            }
        }
        if(moving)
        movables.forEach(movable => {
            movable.position.x += 3
        })
    } else if (keys.s.pressed && lastKey === 's') {
        player.animate = true
        player.image = player.sprites.down

        //monitor for character collission
        checkCharacterCollision({characters, player, characterOffset: {x:0, y:-3}})

        for (let i = 0; i < boundaries.length; i++){
            //detect for collision 
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }}
                })
            ){
                //console.log("collision right")
                moving = false
                break
            }
        }
        if (moving)
        movables.forEach(movable => {
            movable.position.y -= 3
        })
    } else if (keys.d.pressed && lastKey === 'd') {
        player.animate = true
        player.image = player.sprites.right

        //monitor for character collission
        checkCharacterCollision({characters, player, characterOffset: {x:-3, y:0}})

        for (let i = 0; i < boundaries.length; i++){
            //detect for collision 
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }}
                })
            ){
                //console.log("collision right")
                moving = false
                break
            }
        }
        if (moving)
        movables.forEach(movable => {
            movable.position.x -= 3
        })
    }
}


animate() //MAIN FUNCTION THAT DRAWS THE GAME!!!


let lastKey = ''
//player movement
window.addEventListener('keydown', (e) => {
    if (player.isInteracting){
        switch(e.key){
            case ' ':
                player.interactionAsset.dialogueIndex++

                const {dialogueIndex, dialogue} = player.interactionAsset
                if (dialogueIndex <= dialogue.length-1){//so it doesn't access dialogue that doesn't exist
                    document.querySelector('#chracterDialogueBox').innerHTML = 
                    player.interactionAsset.dialogue[dialogueIndex]//this cycles the dialogue
                    audio.talk.play()//This lays the talk audio
                    return
                }
                //finish convo
                player.isInteracting = false
                player.interactionAsset.dialogueIndex = 0
                document.querySelector('#chracterDialogueBox').style.display = 'none'
                break
        }
        return
    }
    switch (e.key){
        case ' ':
            if (!player.interactionAsset) return//if there's no npc to talk to this won't activate
            //begin conversation
            audio.talk.play()//This lays the talk audio
            const firstMessage = player.interactionAsset.dialogue[0]
            document.querySelector('#chracterDialogueBox').innerHTML = firstMessage
            document.querySelector('#chracterDialogueBox').style.display = 'flex'
            player.isInteracting = true
            break
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
         case 'W':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'A':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 'S':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'D':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key){
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        case 'W':
            keys.w.pressed = false
            break
        case 'A':
            keys.a.pressed = false
            break
        case 'S':
            keys.s.pressed = false
            break
        case 'D':
            keys.d.pressed = false
            break
    }
})

let clicked = false
addEventListener('click', () => {
    if(!clicked){
        audio.Map.play()
        clicked = true
    }
})
const bossBattleBackgroundImage = new Image()
bossBattleBackgroundImage.src ='./img/battleBackground1.png'
const bossBattleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: bossBattleBackgroundImage
})

function initBossBattle() {
    //these reset the battle UI
    document.querySelector('#breadCounter').style.display = 'none'
    document.querySelector('#userInterface').style.display = 'block'
    document.querySelector('#dialogueBox').style.display = 'none'
    document.querySelector('#enemyHealthBar').style.width = '100%'
    document.querySelector('#heroHealthBar').style.width = '100%'
    document.querySelector('#attackBox').replaceChildren()

    enemy = new Actor(actors.Boss)//ENEMY SPRITE IN BATTLE
    hero = new Actor(actors.Heroe)//PLAYER SPRITE IN BATTLE
    renderedSprites = [enemy, hero]
    queue = []

    hero.attacks.forEach(attack => {
        //this will draw buttons on attack box with the attack name and function
        const button = document.createElement('button')
        button.innerHTML = attack.name
        document.querySelector("#attackBox").append(button)
    })
    //listeners for buttons
    document.querySelectorAll('button').forEach( button => {
        button.addEventListener('click', (e) => {
            //console.log(attacks[e.currentTarget.innerHTML])
            const selectedAttack = attacks[e.currentTarget.innerHTML]
            hero.attack({ 
                attack: selectedAttack, 
                recipient: enemy,
                renderedSprites //this will draw attack sprites
            })
            
            if (enemy.health <= 0) {
                queue.push(() => {
                    enemy.faint()
                    increaseEnemiesDefeated()//increase score
                    increaseScore()//increase score
                })
                queue.push(() => {
                    //fade back to black
                    gsap.to('#overlapdiv', {
                        opacity: 1,
                        onComplete: () => {
                            window.cancelAnimationFrame(battleAnimationId)//cancels battle animation
                            //animate()//returns to map
                            document.querySelector('#userInterface').style.display = 'none' //hides battle UI
                            gsap.to('#overlapdiv', {
                                opacity: 0
                            })
                            battle.initiated = false
                            window.location.href = 'ingreso.html'; // redirect to ingreso.html
                        }
                    })
                })
                
            }

            localStorage.setItem('puntuacion', score)//saves score
            localStorage.setItem('enemigos', enemiesDefeated)//saves score

            //enemy attacks!!
            const randomAttack = enemy.attacks[Math.floor(Math.random() * enemy.attacks.length)]

            queue.push(() => {
                enemy.attack({ 
                    attack: randomAttack, //this selects which attacks an enemy can do
                    recipient: hero, //this is so the attack is directed to the player
                    renderedSprites //this will draw attack sprites
                })

                if (hero.health <= 0) {
                    queue.push(() => {
                        hero.faint()
                        queue.push(() => {
                            //fade back to black
                            gsap.to('#overlapdiv', {
                                opacity: 1,
                                onComplete: () => {
                                    window.cancelAnimationFrame(battleAnimationId)//cancels battle animation
                                    animate()//returns to map
                                    document.querySelector('#userInterface').style.display = 'none' //hides battle UI
                                    gsap.to('#overlapdiv', {
                                        opacity: 0
                                    })

                                    battle.initiated = false
                                }
                            })
                        })
                    })
                }
            }) 
        })

        button.addEventListener('mouseenter', (e) => {
            const selectedAttack = attacks[e.currentTarget.innerHTML]
            document.querySelector('#attackType').innerHTML = selectedAttack.type
            document.querySelector('#attackType').style.color = selectedAttack.color
            //console.log('go')
        })
    })
}

function animateBossBattle(){
    battleAnimationId = window.requestAnimationFrame(animateBossBattle)

    bossBattleBackground.draw()

    renderedSprites.forEach((sprite) => {//this calls the renderedSprites array and calls the draw() function of the sprite objects
        sprite.draw()
    })
}

document.querySelector('#dialogueBox').addEventListener('click', (e) => {//this is so you click on the dialogue and the battle continues
    if (queue.length > 0){
        queue[0]()
        queue.shift()//deletes item from queue
    } else e.currentTarget.style.display = 'none'
})
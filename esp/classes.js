//Sprites
class Sprite {
    constructor({
        position, 
        image, 
        frames = {max: 1, hold: 10 }, 
        sprites = [], 
        animate = false,
        rotation = 0,
        scale = 1
    }){
        this.position = position 
        this.image = new Image()
        this.frames = {...frames, val: 0, elapsed: 0 }//from 0 to 3
        this.image.onload = () =>{
            this.width = (this.image.width / this.frames.max) * scale
            this.height = (this.image.height) * scale
        }
        this.image.src = image.src

        this.animate = animate 
        this.sprites = sprites
        this.opacity = 1
        this.rotation = rotation
        this.scale = scale
        this.interactionAsset
    }

    draw(){
        c.save()//this is so it doesn't affect the whole canvas
        c.translate(//this takes the centre of the image
            this.position.x + this.width / 2, 
            this.position.y + this.height / 2
        )
        c.rotate(this.rotation)
        c.translate(//this takes the centre of the image
            - this.position.x - this.width / 2, 
            - this.position.y - this.height / 2
        )//the translates and rotate are to angle the attack sprites
        c.globalAlpha = this.opacity
        
        const crop = {
            position: {
                x: this.frames.val * this.width,
                y: 0
            },
            width: this.image.width / this.frames.max,
            height: this.image.height
        }

        const image = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: this.image.width / this.frames.max,
            height: this.image.height
        }

        c.drawImage(//this draws the player
        this.image,
        crop.position.x,
        crop.position.y,
        crop.width,
        crop.height,
        image.position.x,
        image.position.y,
        image.width * this.scale,
        image.height * this.scale
        )
        c.restore()//this is so it doesn't affect the whole canvas
        
        if (!this.animate) return

        if (this.frames.max > 1){
            this.frames.elapsed++
        }

        if (this.frames.elapsed % this.frames.hold === 0){
            if (this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }
    }
}

class Actor extends Sprite{
    constructor({
        position, 
        image, 
        frames = {max: 1, hold: 10 }, 
        sprites = [], 
        animate = false,
        rotation = 0,
        isEnemy = false,
        name,
        attacks,
        scale=1
    }){
        super({
            position, 
            image, 
            frames, 
            sprites, 
            animate,
            rotation,
            scale
        })
        this.health = 100
        this.isEnemy = isEnemy
        this.name = name
        this.attacks = attacks
    }

    faint(){
        document.querySelector('#dialogueBox').innerHTML = this.name + ' derrotado!'
        gsap.to(this.position, {
            y: this.position.y + 20
        })
        gsap.to(this, {
            opacity: 0
        })
        audio.fight.stop()
        audio.victory.play()
    }

    //ATTACKS!!!
    attack ({attack, recipient, renderedSprites}){

        document.querySelector('#dialogueBox').style.display = 'block'
        document.querySelector('#dialogueBox').innerHTML = this.name + ' us&oacute; ' + attack.name //this displays the dialogue box with attack info
        
        let healthBar = '#enemyHealthBar'
        if (this.isEnemy) healthBar = '#heroHealthBar'

        let rotation = 1
        if (this.isEnemy) rotation = -2

        recipient.health -= attack.damage//this changes health when hit
        
        switch (attack.name) {
            case 'Strike':
                const tl = gsap.timeline()//this creates a timeline of animations

        
                let movementDistance = 20
                if (this.isEnemy) movementDistance = -20
        

        
                tl.to(this.position, {
                    x: this.position.x - movementDistance
                }).to(this.position, {
                    x: this.position.x + movementDistance * 2,
                    duration: .2,
                    onComplete: () => {
                        //this animates enemy hit
                        audio.strikeHit.play()
                        gsap.to(healthBar, {
                            width: recipient.health - attack.damage + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
        
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                }).to(this.position, {
                    x: this.position.x
                })
            break;

            case 'Bite':
                const timeline = gsap.timeline()//this creates a timeline of animations

        
                let mvmntDistance = 20
                if (this.isEnemy) mvmntDistance = -20
        

        
                timeline.to(this.position, {
                    x: this.position.x - mvmntDistance
                }).to(this.position, {
                    x: this.position.x + mvmntDistance * 2,
                    duration: .2,
                    onComplete: () => {
                        //this animates enemy hit
                        audio.strikeHit.play()
                        gsap.to(healthBar, {
                            width: recipient.health - attack.damage + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
        
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                }).to(this.position, {
                    x: this.position.x
                })
            break;

            case 'Firebolt':
                audio.initFirebolt.play()
                const fireboltImage = new Image()
                fireboltImage.src = './img/fireball.png'
                const firebolt = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: fireboltImage,
                    frames: {
                        max: 4,
                        hold: 2
                    },
                    animate: true,
                    rotation
                })
                //renderedSprites.push(firebolt)
                renderedSprites.splice(1, 0, firebolt)

                gsap.to(firebolt.position,{
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () => {
                         //this animates enemy hit
                         audio.fireboltHit.play()
                         gsap.to(healthBar, {
                            width: recipient.health - attack.damage + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
        
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                        renderedSprites.splice(1, 1)
                    }
                })
            break;

            case 'Witchbolt':
                audio.initFirebolt.play()
                const witchboltImage = new Image()
                witchboltImage.src = './img/witchball.png'
                const witchbolt = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: witchboltImage,
                    frames: {
                        max: 4,
                        hold: 2
                    },
                    animate: true,
                    rotation
                })
                //renderedSprites.push(witchbolt)
                renderedSprites.splice(1, 0, witchbolt)

                gsap.to(witchbolt.position,{
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () => {
                         //this animates enemy hit
                         audio.fireboltHit.play()
                         gsap.to(healthBar, {
                            width: recipient.health - attack.damage + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
        
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                        renderedSprites.splice(1, 1)
                    }
                })
            break;
            
            case 'Magebolt':
                audio.initFirebolt.play()
                const mageboltImage = new Image()
                mageboltImage.src = './img/mageball.png'
                const magebolt = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: mageboltImage,
                    frames: {
                        max: 4,
                        hold: 2
                    },
                    animate: true,
                    rotation
                })
                //renderedSprites.push(witchbolt)
                renderedSprites.splice(1, 0, magebolt)

                gsap.to(magebolt.position,{
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () => {
                         //this animates enemy hit
                         audio.fireboltHit.play()
                         gsap.to(healthBar, {
                            width: recipient.health - attack.damage + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
        
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                        renderedSprites.splice(1, 1)
                    }
                })
            break;
            
            case 'Placaje':
                const tline = gsap.timeline()//this creates a timeline of animations

        
                let mvmntDist = 20
                if (this.isEnemy) mvmntDist = -20
        

        
                tline.to(this.position, {
                    x: this.position.x - mvmntDist
                }).to(this.position, {
                    x: this.position.x + mvmntDist * 2,
                    duration: .2,
                    onComplete: () => {
                        //this animates enemy hit
                        audio.strikeHit.play()
                        gsap.to(healthBar, {
                            width: recipient.health - attack.damage + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
        
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                }).to(this.position, {
                    x: this.position.x
                })
            break;

            case 'Mordisco':
                const tln = gsap.timeline()//this creates a timeline of animations

        
                let mvmntDis = 20
                if (this.isEnemy) mvmntDis = -20
        

        
                tln.to(this.position, {
                    x: this.position.x - mvmntDis
                }).to(this.position, {
                    x: this.position.x + mvmntDis * 2,
                    duration: .2,
                    onComplete: () => {
                        //this animates enemy hit
                        audio.strikeHit.play()
                        gsap.to(healthBar, {
                            width: recipient.health - attack.damage + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
        
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                }).to(this.position, {
                    x: this.position.x
                })
            break;

            case 'Arremetida':
                const tiln = gsap.timeline()//this creates a timeline of animations

        
                let mvmentDist = 20
                if (this.isEnemy) mvmentDist = -20
        

        
                tiln.to(this.position, {
                    x: this.position.x - mvmentDist
                }).to(this.position, {
                    x: this.position.x + mvmentDist * 2,
                    duration: .2,
                    onComplete: () => {
                        //this animates enemy hit
                        audio.strikeHit.play()
                        gsap.to(healthBar, {
                            width: recipient.health - attack.damage + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
        
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                }).to(this.position, {
                    x: this.position.x
                })
            break;

            case 'Corte':
                audio.initCut.play()
                const corteImage = new Image()
                corteImage.src = './img/cut.png'
                const corte = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: corteImage,
                    frames: {
                        max: 4,
                        hold: 2
                    },
                    animate: true,
                    scale: 4,
                    rotation
                })
                //renderedSprites.push(witchbolt)
                renderedSprites.splice(1, 0, corte)

                gsap.to(corte.position,{
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () => {
                         //this animates enemy hit
                         audio.cutHit.play()
                         gsap.to(healthBar, {
                            width: recipient.health - attack.damage + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
        
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                        renderedSprites.splice(1, 1)
                    }
                })
            break;

            case 'Asalto':
                audio.initCut.play()
                const asaltoImage = new Image()
                asaltoImage.src = './img/assault.png'
                const asalto = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: asaltoImage,
                    frames: {
                        max: 4,
                        hold: 2
                    },
                    animate: true,
                    scale: 4,
                    rotation
                })
                //renderedSprites.push(witchbolt)
                renderedSprites.splice(1, 0, asalto)

                gsap.to(asalto.position,{
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () => {
                         //this animates enemy hit
                         audio.cutHit.play()
                         gsap.to(healthBar, {
                            width: recipient.health - attack.damage + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
        
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                        renderedSprites.splice(1, 1)
                    }
                })
            break;
        }

    }

}

class Boundary{
    static width = 48 
    static height = 48
    //the map is zoomed in 400% and the sprites are 12px, so 12*4
    constructor({position}){
        this.position = position
        this.width = 48 
        this.height = 48
    }

    draw(){
        c.fillStyle = 'rgba(255, 0, 0, .0)'//.0 is opacity
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}


class Character extends Sprite {
    constructor({
        position, 
        image, 
        frames = {max: 1, hold: 10 }, 
        sprites = [], 
        animate = false,
        rotation = 0,
        scale = 1,
        dialogue = ['']
    }){
        super({
            position, 
            image, 
            frames, 
            sprites, 
            animate,
            rotation,
            scale
        })

        this.dialogue = dialogue
        this.dialogueIndex = 0
    }

}
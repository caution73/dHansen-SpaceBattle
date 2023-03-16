/*
create game factory to store variables
*/

//create ship factory

class Ship {
    constructor(hullParam, firepowerParam, accuracyParam){
        this.hull = hullParam;
        this.firepower = firepowerParam;
        this.accuracy = accuracyParam;
    }
    attack(target){
        if (Math.random() < this.accuracy) {
            target.hull -= this.firepower
            console.log('Damage dealt!');
        }else{
            console.log("It's a miss!")
        }

    }
    target(){

    }
}


class UserShip extends Ship {
    constructor(hullParam, firepowerParam, accuracyParam){
        super(hullParam, firepowerParam, accuracyParam)
    
    }
}



class AlienShip extends Ship {
    constructor(){
        let hull = Math.floor(Math.random()*4) + 4;
        let firepower = Math.floor(Math.random()*3) + 2;
        let accuracy = Math.random()*.2 + .6;
        super(hull, firepower, accuracy)

    }
}



class ShipFactory {
    constructor(){
    this.alienFleet = [];
    this.userShip = this.makeUserShip(20, 5, .7);
    this.continue = true;
    }
    makeAlienShip(){
        const alienShip = new AlienShip()
        this.alienFleet.push(alienShip);
    }
    makeUserShip(hullParam, firepowerParam, accuracyParam){
        return new UserShip(hullParam, firepowerParam, accuracyParam)
    }
    makeMultAlienShip(howMany){
        for(let i = 0; i < howMany ; i++){
            this.makeAlienShip()
        }
    }
    // Combat

    fightRound(ship1, ship2){
        let first = true;
        console.log("An enemy craft approaches!")
        while(ship1.hull > 0 && ship2.hull > 0){
            console.log("Your ship's hull: " + ship1.hull, "The enemy ship's hull: " + ship2.hull)
            if (first) {
                ship1.attack(ship2)

            } else {
                ship2.attack(ship1)
            }
            first = !first;
        }
        if(ship1.hull > 0){
            console.log("You defeated the foe!")
            this.alienFleet.pop()
            this.continue = window.confirm("Do you wish to attack again? Click OK to attack again. Click Cancel to retreat")
            
        }else {
            console.log("You lost!")
            this.continue = false;
        }

    }

    fightBattle(){
        while(this.alienFleet.length > 0 && this.userShip.hull > 0){
            if(this.continue){
            this.fightRound(this.userShip, this.alienFleet[this.alienFleet.length - 1])
            }else{
                console.log("You have retreated successfully!")
                break
            }
        }
        if(this.alienFleet.length === 0){
            console.log("You have defeated the fleet! Return home for recovery!")
        }
    }
    /*
    You attack the first alien ship
If the ship survives, it attacks you
If you survive, you attack the ship again
If it survives, it attacks you again ... etc
If you destroy the ship, you have the option to attack the next ship or to retreat
    */
}


const Factory = new ShipFactory()
Factory.makeMultAlienShip(6)
console.log(Factory)
Factory.fightBattle()


//create user ship class

//create alien ship class
//create six alien ships






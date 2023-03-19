/*
create game factory to store variables
*/

//create ship factory
const alienArea = document.querySelector(".alienArea")
let hullStatus = document.querySelector(".hullStatus")

class Ship {
    constructor(hullParam, firepowerParam, accuracyParam){
        this.hull = hullParam;
        this.firepower = firepowerParam;
        this.accuracy = accuracyParam;
    }
    attack(target){
        if (Math.random() < this.accuracy) {
            target.hull -= this.firepower
            window.alert('Damage dealt!');
        }else{
            window.alert("It's a miss!")
        }
    }
}

class UserShip extends Ship {
    constructor(hullParam, firepowerParam, accuracyParam){
        super(hullParam, firepowerParam, accuracyParam)
        this.name = "Your ship"
    
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
    this.play = true;
    }
    makeAlienShip(){
        const alienShip = new AlienShip()
        this.alienFleet.push(alienShip);
    }
    makeUserShip(hullParam, firepowerParam, accuracyParam){
        const userShip = new UserShip(hullParam, firepowerParam, accuracyParam)
        return userShip
    }
    makeMultAlienShips(howMany){
        for(let i = 0; i < howMany ; i++){
            this.makeAlienShip()  
        }
    }
    updateHUD(){
        let hullStatus = document.querySelector(".hullStatus")
        hullStatus.textContent = game.userShip.hull;     
    }
    playGame(){  
        this.userShip.hull = 20;
        alienArea.innerHTML = "";
        console.log(this.alienFleet.length)
        if(this.alienFleet.length > 0){
            this.alienFleet = [];
        }
        if(this.alienFleet.length === 0){
            this.makeMultAlienShips(Math.floor(Math.random()*5) + 2)
        }
        for (let i = 0; i < game.alienFleet.length; i++) {
            let alienImg = document.createElement("div");
            alienImg.classList.add("alienImg");
            alienArea.append(alienImg);
        };
        this.updateHUD()
        console.log(this.alienFleet)
        console.log(this.userShip)
        window.alert("An enemy craft approaches!")
        window.alert("Choose your action! Attack, or retreat?")
    }
    playAgain(){
        game.play = window.confirm("Do you wish to play again? Click OK to play again. Click Cancel if not.")
            if(game.play){
                game.playGame()
            }else{
                alienArea.innerHTML = "When you're ready to play again, refresh the page!";
                alienArea.style.color = "white";
                alienArea.style.fontSize = "6vh";
                window.alert("Thanks for playing!")
            }
    }
}


const game = new ShipFactory()
let startGame = window.confirm("Welcome to Space Battle! Would you like to play?")
if(startGame){
    game.playGame()
}else{
    alienArea.innerHTML = "When you're ready to play, refresh the page!";
    alienArea.style.color = "white";
    alienArea.style.fontSize = "6vh";
}




const attackBtn = document.querySelector("div.attack")
attackBtn.addEventListener("click", (evnt) => {
    evnt.preventDefault();
    if(game.play && startGame){
        window.alert("Firing forward lasers!")
        game.userShip.attack(game.alienFleet[0])
        if(game.alienFleet[0].hull > 0 && game.userShip.hull > 0){ // If both live.
            window.alert("The enemy returns fire!")
            game.alienFleet[0].attack(game.userShip)  // Alien returns fire.
            game.updateHUD()//hullStatus.textContent = game.userShip.hull;
            if(game.userShip.hull <= 0){ // If user hull would be equal or less than 0.
                game.userShip.hull = 0; // Set hull to 0.
                game.updateHUD()  // update hull/hud
                if(game.userShip.hull <= 0){  // if you die
                    window.alert("You lost!")  //  you dead
                    game.playAgain()
                }
            } else{
                window.alert("What's your next move?")  //prompt for attack/retreat here  
                
        }     
            
        }else{
            if(game.userShip.hull > 0){
                game.alienFleet.shift() 
                window.alert("You defeated the ship!") // you defeat enemy.
                alienArea.removeChild(alienArea.firstChild) 
                if(game.alienFleet.length > 0){ // If ship in enemy fleet.
                    window.alert("Another enemy ship approaches. What do you do?")  //  prompt for attack/retreat
             
                }else{
                    window.alert("You have defeated the fleet! Return home for recovery!")
                    game.playAgain()
            // prompt for play again
                }
            } 
        }
    }
})

const retreatBtn = document.querySelector("div.retreat")
retreatBtn.addEventListener("click", (evnt) => {
    evnt.preventDefault();
    if(game.play){
        if(game.alienFleet.length > 0 && game.userShip.hull > 0){
            window.alert("You have successfully retreated!")
            game.playAgain()
        }
    }
   
})
 



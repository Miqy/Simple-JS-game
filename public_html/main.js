//count width and height of the browser window
var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
var height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
//preparing all variables at start
window.onload = function () {
    //set player field id from using DOM
    player.id = document.getElementById("player");
    //setting the start position of the ship
    player.id.style.left = (width / 2 - player.id.width / 2) + 'px';
};

//function which reads every key that user inputs
function readkey(e) {
    var keynum;
    //get keynum
    if (window.event) { // IE                    
        keynum = e.keyCode;
    } else if (e.which) { // Netscape/Firefox/Opera                   
        keynum = e.which;
    }
    
    //getting the left nad bottom css property of the player to set the postion  
    var style = window.getComputedStyle(player.id);
    var styleLeft = style.getPropertyValue("left");
    player.X = parseInt(styleLeft, 10);
    var styleBottom = style.getPropertyValue("bottom");
    player.Y = parseInt(styleBottom, 10);
    
    //move the player
    player.move(keynum);
};
//declare constructor of object rocket
function Rocket(id, Y) {
    this.id = id;
    this.Y = Y;
}

//declare object player 
//set object fields
var player = {
    id: null,
    X: 0,
    Y: 0,
};

//set object methods
player.move = function (keynum) {
    var char = String.fromCharCode(keynum);
    if (char === 'D') {
        if (this.X + 10 < width) {
            this.X = this.X + 10;
            this.id.style.left = this.X + "px";
        }
    } else if (char === 'A') {
        if (this.X - 10 > 0) {
            this.X = this.X - 10;
            this.id.style.left = this.X + "px";
        }
    } else if (keynum === 32) {
        this.fire();
    }
};
player.fire = function () {
    //create rocket bullet and set its properties
    var rocket = new Rocket(null, 0);
    rocket.id = document.createElement("img");
    rocket.id.setAttribute("src", "res/missile.png");
    rocket.id.setAttribute("id", "bullet");
    rocket.id.style.left = this.X + this.id.width / 2 - 8 + "px";
    rocket.id.style.bottom = this.Y + 120 + "px";


    var rocketYPos = rocket.id.style.bottom;
    rocket.Y = parseInt(rocketYPos, 10);
    
    //moving of the rocket to the top of the screen
    rocket.id.fly = function () {
        rocket.Y = rocket.Y + 5;
        rocket.id.style.bottom = rocket.Y.toString() + "px";
        
        //delete rocket when its outside the window
        if (rocket.Y > height) {
            var parent = window.document.getElementById("Body");
            //dangerous function which delete node in html document, its not supported by all browsers
            parent.removeChild(rocket.id);
            //stop calling function fly
            clearInterval(rocket.interv);
            //delete reference
            delete rocket;
        }
    };
    
    rocket.interv  = setInterval(rocket.id.fly, 10);
    //append bullet to html body
    var body = document.getElementById("Body");
    body.appendChild(rocket.id);
};




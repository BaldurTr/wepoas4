window.Pipes = (function() {
	'use strict';

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 20; // * 10 pixels per second
	var WIDTH = 10;
	var HEIGHT = 5;
	var GAP = 20;
	var EARTH = 10;
	var INITIAL_POSITION_X = 15;
	var INITIAL_POSITION_Y = 0;
	var GAP = 15;
	var PIPEHEIGHTS = [10, 20, 30];

	var Pipes = function(btmPipe, topPipe, game, pipe) {
		this.game = game;
		this.player = game.player;
		this.pipeID = pipe; 
		this.btmPipe = btmPipe;
		this.topPipe = topPipe;
		this.btmPipe.pos = { x: 0, y: 0 };
		this.topPipe.pos = { x: 0, y: 0 }; 
	};


	/**
	 * Resets the state of the player for a new game.
	 */
	Pipes.prototype.reset = function() {
		if (this.pipeID === 1) {
			/*this.pos.x = INITIAL_POSITION_X;
			this.pos.y = */
			this.btmPipe.pos.x = INITIAL_POSITION_X;
			this.topPipe.pos.X = INITIAL_POSITION_X;
		} else if (this.pipeID === 2){
			//this.pos.x = INITIAL_POSITION_X + WIDTH * 2 ;
			this.btmPipe.pos.x = INITIAL_POSITION_X + (this.game.WORLD_WIDTH / 2) + 7;
			this.topPipe.pos.x = INITIAL_POSITION_X + (this.game.WORLD_WIDTH / 2) + 7;
		}
		//this.pos.y = INITIAL_POSITION_Y;
		var newHeight = EARTH + PIPEHEIGHTS[randNum(0, PIPEHEIGHTS.length)];   
		this.btmPipe.css('height', newHeight + 'em');
		this.topPipe.css('height',  (this.game.WORLD_HEIGHT - 
					(newHeight + GAP)) + 'em');
	};

	Pipes.prototype.onFrame = function(delta) {
		
		//this.pos.x -= delta * SPEED;
		this.btmPipe.pos.x -= delta * SPEED;  
		this.topPipe.pos.x -= delta * SPEED;  

		if (this.btmPipe.pos.x < -this.game.WORLD_WIDTH) {  
			/*this.pos.x = INITIAL_POSITION_X;
			this.pos.y = INITIAL_POSITION_Y;*/
			this.btmPipe.pos.x = INITIAL_POSITION_X;
			this.topPipe.pos.x = INITIAL_POSITION_X;
			var newHeight = EARTH + PIPEHEIGHTS[randNum(0, PIPEHEIGHTS.length)];
			this.btmPipe.css('height', newHeight + 'em');
			this.topPipe.css('height',  (this.game.WORLD_HEIGHT - 
					(newHeight + GAP)) + 'em');
		}

		this.checkCollisionWithBird();

		// Update UI
		this.btmPipe.css('transform', 'translateZ(0) translate(' + this.btmPipe.pos.x + 'em, ' + this.btmPipe.pos.y + 'em)');
		this.topPipe.css('transform', 'translateZ(0) translate(' + this.topPipe.pos.x + 'em, ' + this.topPipe.pos.y + 'em)');
	};

	Pipes.prototype.checkCollisionWithBird = function() {
		//var btmPipePosY = this.btmPipe.style.height;
		//console.log($('.P1-btm').height());
		/*if (this.player.pos.x >= this.btmPipe.pos.x && 
				this.player.pos.x <= this.player.pos.x + WIDTH) {
			if (this.player.pos.y >= this.btmPipe.pos.x + GAP ||
					this.player.pos.y <= this.btmPipe.pos.x) {
				return this.game.gameover();
			}
		}*/ 
		var btmPipePosY = 0;
		if (this.pipe === 1) {
			btmPipePosY = parseInt($('.P1-btm').height()) / 10;
		} else {
			btmPipePosY = parseInt($('.P2-btm').height()) / 10;
		}
		//console.log(btmPipePosY); 
		if (this.player.pos.x >= this.btmPipe.pos.x   && 
				this.player.pos.x <= this.btmPipe.pos.x + 4 ) {
			/*console.log("Player is within a pipe");
			if (this.game.player.pos.y <=  this.game.WORLD_HEIGHT - (btmPipePosY + GAP) ||
					this.game.player.pos.y > this.game.WORLD_HEIGHT - btmPipePosY ) {
				//return this.game.gameover();
				console.log("Player coordinates: x: " + this.game.player.pos.x + " y: "
					+  this.game.player.pos.y);
				console.log("Bottom pipe coordinates: " + (this.game.WORLD_HEIGHT - btmPipePosY)) ;
				console.log("Top pipe coordinates: " + (this.game.WORLD_HEIGHT - (btmPipePosY + GAP))  + " ");
				return this.game.gameover();*/
				this.player.score++;
				$('.Score').html(this.player.score);
				console.log(this.player.score);
			}
			/*console.log("Im inside pipe width!");
			console.log(this.game.player.pos.x);
			console.log(this.btmPipe.pos.x);
			console.log(""); */ 
			//  return this.game.gameover()
			/*if (this.game.WORLD_HEIGHT - this.game.player.pos.y <= btmPipePosY) {
				console.log("Im below btmPipe height  !");
				console.log(this.game.WORLD_HEIGHT - this.game.player.pos.y);
				console.log(btmPipePosY);
				console.log("");  
				return this.game.gameover();
			}*/
		// }
	};

	function randNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    Pipes.prototype.scoreCount = function() {

	}

	return Pipes;

})();
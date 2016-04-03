window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	//var INITIAL_POSITION_X = this.game.WORLD_WIDTH/2 - 5;
	//var INITIAL_POSITION_Y = this.game.WORLD_HEIGHT / 2;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: (this.game.WORLD_WIDTH / 2) - 5, y: this.game.WORLD_HEIGHT / 2 };
	};
 
	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = this.game.WORLD_WIDTH/2 - 5;
		this.pos.y = this.game.WORLD_HEIGHT / 2;
	};

	Player.prototype.onFrame = function(delta) {
		if (Controls.keys.space && Controls.didJump()) {
			this.pos.y -= 15;
		} else {
			this.pos.y += delta * SPEED * (0.5);
		}

		this.checkCollisionWithBounds();  

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT - 10.5) {
			return this.game.gameover();
		}
	};

	return Player;

})();

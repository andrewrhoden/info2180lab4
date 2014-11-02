// CSE 190 M, solution to Mouse Maze lab

var loser = null;  // whether the user has hit a wall

window.onload = function() {
	$("start").onclick = startClick;
	$("end").onmouseover = overEnd;
	var boundaries = $$("div#maze div.boundary");
	for (var i = 0; i < boundaries.length; i++) {
		boundaries[i].onmouseover = overBoundary;
	}
	document.body.observe("mousemove", overBody);   // haxor exercise
};

// test for mouse being over document.body so that the player
// can't cheat by going outside the maze (haxor exercise)
function overBody(event) {
	if (loser === false && event.element() == document.body) {
		overBoundary(event);
	}
}

// called when mouse moves on top of one of the walls;
// signals the end of the game with a loss
function overBoundary(event) {
	if (loser === false) {
		loser = true;
		$("status").textContent = "You lose!";
		var boundaries = $$("div#maze div.boundary");
		for (var i = 0; i < boundaries.length; i++) {
			boundaries[i].addClassName("youlose");
		}
		event.stop();   // so the event won't reach document.body (haxor exercise)
	}
}

// called when mouse is clicked on Start (S) div;
// sets the maze back to its initial playable state
function startClick() {
	loser = false;
	$("status").textContent = "Find the end!";
	var boundaries = $$("div#maze div.boundary");
	for (var i = 0; i < boundaries.length; i++) {
		boundaries[i].removeClassName("youlose");
	}
}

// called when mouse is on top of the End (E) div.
// signals the end of the game with a win
function overEnd() {
	if (loser === false) {
		$("status").textContent = "You win! :]";
	}
}
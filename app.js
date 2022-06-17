/*
Pig game
RG Mickael
rgmickael@gmail.com
*/

var scores, roundScore, activePlayer, dice, winner, lastDice;
var diceDom=document.querySelector('.dice');
 
newGame();

document.querySelector("#btn-new").addEventListener('click',newGame);

document.querySelector('#btn-roll').addEventListener('click', function() {
	//random number for the dice
	var dice=Math.floor(Math.random()*6)+1;

	//display the dice
	var diceImg=document.querySelector('img');
	diceImg.src='images/dice_'+dice+'.png';
	diceDom.style.display='block';	

	//update round score
	if(dice !== 1){
			roundScore+=dice;
			document.querySelector('#current-'+activePlayer).textContent=roundScore;
	}else{
		nextPlayer();
	}

	lastDice=dice;
});

document.querySelector("#btn-hold").addEventListener('click',function(){
	//add current score to the global score
	scores[activePlayer]+=roundScore;
	roundScore=0;
	//update display
	document.getElementById('score-'+activePlayer).textContent=scores[activePlayer];

	ifWinner();

});

function newGame(){
	scores=[0,0];
	roundScore=0;
	activePlayer=0;
	lastDice=0;

	diceDom.style.display='none';

	document.getElementById('current-0').textContent='0';
	document.getElementById('score-0').textContent='0';
	document.getElementById('current-1').textContent='0';
	document.getElementById('score-1').textContent='0';

	document.querySelector('.player-0').classList.remove('active');
	document.querySelector('.player-1').classList.remove('active');

	document.querySelector('.player-0').classList.remove('winner');
	document.querySelector('.player-1').classList.remove('winner');

	document.querySelector('.player-'+activePlayer).classList.add('active');

	document.getElementById('buttons').style.display='block';
}

function nextPlayer(){
	activePlayer === 0 ? activePlayer=1 : activePlayer=0;
	roundScore=0;

	document.getElementById('current-0').textContent='0';
	document.getElementById('current-1').textContent='0';

	document.querySelector('.player-0').classList.toggle('active');
	document.querySelector('.player-1').classList.toggle('active');

	diceDom.style.display='none';
}

function ifWinner(){
	//check if player won

	if(scores[activePlayer]>=20){
		document.querySelector('.player-'+activePlayer).classList.remove('active');
		document.querySelector('.player-'+activePlayer).classList.add('winner');

		document.querySelector('.player-'+activePlayer+' h2').textContent='The winner';

		//disable buttons
		document.getElementById('buttons').style.display='none';

		document.getElementById('current-0').textContent='0';
	    document.getElementById('current-1').textContent='0';
	}else{
		nextPlayer();
	}
}
'use strict'

/*---------- SELECCIÓN DE MODO ----------*/
let iniciado = false; //booleano para saber si el timer está iniciado
sessionStorage.setItem('modo','pomodoro');
let min = 25, seg=0;
function modoPomodoro() {
	let timer = document.querySelector('#timer > h1');

	sessionStorage.setItem('modo','pomodoro');

	restaurar();

	min = 25;
	seg = 0;
	clearInterval(idTime);
	timer.innerText = '25:00';
}

function modoDescanso() {
	let timer = document.querySelector('#timer > h1');

	sessionStorage.setItem('modo','descanso');

	restaurar();

	min = 5;
	seg = 0;
	clearInterval(idTime);
	timer.innerText = '05:00';
}

function modoDescansoLargo() {
	let timer = document.querySelector('#timer > h1');

	sessionStorage.setItem('modo','descanso-largo');

	restaurar();

	min = 15;
	seg = 0;
	clearInterval(idTime);
	timer.innerText = '15:00';
}

/*---------- TIMER ----------*/
let idTime;
function cuentaAtras() {

	if(!iniciado) {
		document.querySelector('#start').innerText = 'Detener';
		iniciado = true;
		actualizaTimer();
		idTime = setInterval(actualizaTimer,1000);
	}else {
		clearInterval(idTime);
		restaurar();
	}

}

function actualizaTimer() {
	let timer = document.querySelector('#timer > h1'),
		auxM, auxS;

	seg--;
	if(seg<0) {min--; seg=59;}
	if(min==0 && seg==0) {paraTimer();}

	if(seg<10){auxS='0'+seg;} else{auxS=seg;}
	if(min<10){auxM='0'+min;} else{auxM=min;}

	timer.innerText = auxM+':'+auxS;
}

function reiniciaTimer() {
	let timer = document.querySelector('#timer > h1');

	clearInterval(idTime);

	restaurar();

	seg = 0;
	if(sessionStorage.getItem('modo')=='pomodoro'){
		min = 25;
		timer.innerText = '25:00';
	} else if(sessionStorage.getItem('modo')=='descanso'){
		min = 5;
		timer.innerText = '05:00';
	} else{
		min = 15;
		timer.innerText = '15:00';
	}
}

function restaurar() {
	let ini = document.querySelector('#start');
	iniciado = false;
	ini.innerText = 'Iniciar';
}

function paraTimer() {
	let alarm = new Audio('audio/alarm.wav');

	clearInterval(idTime);
	alarm.play();
}


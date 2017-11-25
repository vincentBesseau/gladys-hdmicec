#!/bin/bash

function affichage {
	echo $*
}

function debug {
	affichage [DEBUG] $*
}

function info {
	affichage [INFO] $*
}

function speak {
	affichage $*
}

function launchCommand {
	$*
}

function isAlive {
	
	etatTV=`echo pow 0 | cec-client -s -d 1`
	
	debug $etatTV
	
	onState $etatTV
	
	offState $etatTV
	
	unknowState $etatTV
}

function onState {
	if [ "$etatTV" =~ ": on" ] || [ "$etatTV" =~ ": in transition from standby" ]; then
		speak "La télévision est alumée"
	fi
}

function offState {
	if [[ "$etatTV" =~ ": standby" ]]; then
		speak "La télévision est arrêtée"
	fi
}

function unknowState {
	if [[ "$etatTV" =~ ": unknown" ]]; then
		speak "Désolé je ne connais pas l'état de la télévision"
	fi
}

function tunOffTv {
	echo standby 0 | cec-client -s -d 1 >/dev/null
	debug "La télé s'éteint"
	sleep 10
	isAlive
}

function tunOnTv {
	echo on 0 | cec-client -s -d 1 >/dev/null
	debug "J'allume la télé"
	sleep 10
	isAlive
}
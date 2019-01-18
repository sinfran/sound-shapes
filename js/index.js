// Chrome speech synthesis + speech recognition interface lives on window object
window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

const recognition = new SpeechRecognition();

const mic = document.querySelector('button.record')

let paragraph = document.createElement('p');
let container = document.querySelector('.text-box');

container.appendChild(paragraph);

const mic_sound = document.querySelector('.mic-sound');

mic.addEventListener('click', () => {
	mic_sound.play();
	dictate();
});

const dictate = () => {
	recognition.start();
	recognition.onresult = (event) => {
		const speechToText = event.results[0][0].transcript;

		paragraph.textContent = speechToText;

		if (event.results[0].isFinal) {
			var color = 0;
			var xpos = 0;
			var spin = 0;
			if (speechToText.includes('undo')) {
				undo();
				console.log("undo called");
			}
			if (speechToText.includes('clear all')) {
				clear();
				console.log("clear called");
			}
			else if (speechToText.includes('create')) {
				if (speechToText.includes('color')) {
					color = speechToText.split("color").pop().split(" ")[1];
					console.log(color);
				}
				if (speechToText.includes(' X') || speechToText.includes(' x')) {
					xpos = speechToText.toLowerCase().split('x').pop().match(/[0-9/-]+/g).join('');
					console.log("xpos = " + xpos);
				}
				if (speechToText.includes('spin')) {
					spin = 1;
					console.log("spinning = true");
				}
				if (speechToText.includes('sphere')) {
					createGeometry('SphereGeometry', color, xpos, spin);
					console.log("sphere created");
				} else if (speechToText.includes('box') || speechToText.includes('cube')) {
					createGeometry('BoxGeometry', color, xpos, spin);
					console.log("box created");
				} else if (speechToText.includes('knot') || speechToText.includes('not')) {
					createGeometry('TorusKnotGeometry', color, xpos, spin);
					console.log("knot created");
				} 

			};
		}
	}
}



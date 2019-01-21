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
			var ypos = 1;
			

			if (speechToText.includes('undo')) {
				undo();
				console.log("undo called");
			}
			if (speechToText.includes('clear all') || speechToText.includes('delete all')) {
				clear();
				console.log("clear called");
			}
			else if (speechToText.includes('create')) {
				if (speechToText.includes('color')) {
					color = speechToText.split("color").pop().split(" ")[1];
					console.log(color);
				}
				if (speechToText.includes(' X') || speechToText.includes(' x')) {
					xpos = speechToText.toLowerCase().split('x').pop().match(/[0-9]+/g)[0];
					console.log("xpos = " + xpos);
				}
				if (speechToText.includes(' Y') || speechToText.includes(' y')) {
					ypos = speechToText.toLowerCase().split('y').pop().match(/[0-9]+/g)[0];
					console.log("ypos = " + ypos);
				}
				if (speechToText.includes('sphere') || speechToText.includes('fear')) {
					createGeometry('SphereGeometry', color, xpos, ypos);
					console.log("sphere created");
				} else if (speechToText.includes('box') || speechToText.includes('cube')) {
					createGeometry('BoxGeometry', color, xpos, ypos);
					console.log("box created");
				} else if (speechToText.includes('knot') || speechToText.includes('not')) {
					createGeometry('TorusKnotGeometry', color, xpos, ypos);
					console.log("knot created");
				} 
			}

			if (speechToText.includes('spin') || speechToText.includes('rotate') || speechToText.includes('rotating')) {
				spinMesh();
				console.log("spinning mesh");
			};
		}
	}
}



// Chrome speech synthesis + speech recognition interface lives on window object
window.SpeechRecognition = window.webkitSpeechRecognition

const recognition = new SpeechRecognition();

const mic = document.querySelector('i.fas.fa-microphone')

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
			if (speechToText.includes('undo')) {
				undo();
				console.log("undo called");
			}
			else if (speechToText.includes('create')) {
				var color = 0;
				var xpos = 0;
				if (speechToText.includes('color')) {
					var last = event.results.length - 1;
					var substrings = event.results[last][0].transcript.split(" ");
					color = substrings[substrings.length - 1];
				}

				if (speechToText.includes('X') || speechToText.includes('x')) {
					xpos = speechToText.split("X")[1].split(" ")[0];
					console.log(xpos)
				}
				

				if (speechToText.includes('sphere')) {
					createGeometry('SphereGeometry', color, xpos);
					console.log("sphere created");
				} else if (speechToText.includes('box') || speechToText.includes('cube')) {
					createGeometry('BoxGeometry',color, xpos);
					console.log("box created");
				}

			}
			
			;
		}
	}
}



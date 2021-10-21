const random = require("random");

async function generate() {
	try {
		const toggle = toggleSelect();
		if (toggle === "words") generateWords();
		else if (toggle === "letters") generateLetters();
		else throw "Error in generate function";
	} catch (err) {
		document.querySelector(".tweet").value = err;
	}
}

function generateLetters() {
	const randomLetter = () => {
		const alphabet = "abcdefghijklmnopqrstuvwxyz., ";
		return alphabet.charAt(
			random.int((min = 0), (max = alphabet.length - 1))
		);
	};

	document.querySelector(".tweet").value =
		Array.from({ length: 274 }, randomLetter).join("") + " #lot";
}

async function generateWords() {
	let response = await fetch("./words/words.json");
	if (!response.ok) {
		throw new Error(`Reponse error! status: ${response.status}`);
	}
	const data = await response.json();
	const keys = Object.keys(data);
	let tweet = "";
	let randomWord = keys[Math.floor(Math.random() * keys.length)];
	while (tweet.length + randomWord.length < 174) {
		tweet += randomWord;
		tweet += " ";
		randomWord = keys[Math.floor(Math.random() * keys.length)];
	}
	tweet += "#lot";
	document.querySelector(".tweet").value = tweet;
}

function publish() {
	if (document.querySelector(".tweet").value !== "") {
		const tweetData = encodeURIComponent(
			document.querySelector(".tweet").value
		);
		window.open(
			`https://twitter.com/intent/tweet?text=${tweetData}`,
			"_blank",
			"noopener,noreferrer"
		);
	} else {
		const tweetData =
			"Library of Twitter — https://github.com/rocambille/library-of-twitter";
		window.open(
			`https://twitter.com/intent/tweet?text=${tweetData}`,
			"_blank",
			"noopener,noreferrer"
		);
	}
}

function toggleSelect() {
	return document.querySelector("input[name=select]:checked").value;
}

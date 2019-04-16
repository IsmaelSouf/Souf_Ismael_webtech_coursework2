function vigenere(Decrypt) {
	if (document.getElementById("key").value.length == 0) { // A pop up box with alert if there is no input in the key box.
		alert("Key is empty");
		return;
	}
	var key = filterKey(document.getElementById("key").value);
	if (key.length == 0) { // Checks user input is letter, if number then shows a pop up box with alert.
		alert("Key has no letters");
		return;
	}
	if (Decrypt) {
		for (var i = 0; i < key.length; i++)
			key[i] = (26 - key[i]) % 26;
	}
	var textElem = document.getElementById("message").value;
	output = crypt(textElem, key);
	document.getElementById("message").value = output;
}

function crypt(input, key) { //Returns the result the Vigenère encryption on the given text with the given key.
	var output = "";
	for (var i = 0, a = 0; i < input.length; i++) {
		var b = input.charCodeAt(i);
		if (isUppercase(b)) {
			output += String.fromCharCode((b - 65 + key[a % key.length]) % 26 + 65);
			a++;
		} else if (isLowercase(b)) {
			output += String.fromCharCode((b - 97 + key[a % key.length]) % 26 + 97);
			a++;
		} else {
			output += input.charAt(i);
		}
	}
	return output;
}

function filterKey(key) {
	var result = [];
	for (var i = 0; i < key.length; i++) {
		var a = key.charCodeAt(i);
		if (isLetter(a))
			result.push((a - 65) % 32);
	}
	return result;
}
function isLetter(a) {
	return isUppercase(a) || isLowercase(a);
}

function isUppercase(a) {
	return 65 <= a && a <= 90;  // 65 is character code for 'A'. 90 is 'Z'.
}

function isLowercase(a) {
	return 97 <= a && a <= 122;  // 97 is character code for 'a'. 122 is 'z'.
}

function eraseText() 
{ 
    document.getElementById("message").value = "";
}

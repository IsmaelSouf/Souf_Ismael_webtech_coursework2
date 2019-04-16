"use strict";

//Function to encode Morse
function encode() 
{
    
//Lowercase only, ignore unknown characters.
var plain_text = document.getElementById("message").value.toLowerCase();
    
var alphabet = 
{  
   "0":"-----",   "1":".----",
   "2":"..---",   "3":"...--",
   "4":"....-",   "5":".....",
   "6":"-....",   "7":"--...",
   "8":"---..",   "9":"----.",
   "a":".-",   "b":"-...",
   "c":"-.-.",   "d":"-..",
   "e":".",   "f":"..-.",
   "g":"--.",   "h":"....",
   "i":"..",   "j":".---",
   "k":"-.-",   "l":".-..",
   "m":"--",   "n":"-.",
   "o":"---",   "p":".--.",
   "q":"--.-",   "r":".-.",
   "s":"...",   "t":"-",
   "u":"..-",   "v":"...-",
   "w":".--",   "x":"-..-",
   "y":"-.--",   "z":"--..",
   " ":"/",   "!":"-·-·--",
   ".":"·-·-·-",   ",":"--··--"
};

var morse_text = [];

// Transform the string object into an array and replace with morse word
plain_text.split("  ").map(function (word) 
{
    // Replace each character with a morse "letter"
    word.split("").map(function (letter) 
    {
        morse_text.push(alphabet[letter]);
    });
    if(plain_text.toLowerCase == " ")
    {
    morse_text.push("/");
    }
});
    
// Convert the array back to string.
document.getElementById("message").value = morse_text.join(" ");
    
}

//Function to decode Morse
function decode()
{
    
var morse_text = document.getElementById("message").value;
var plain_text = [];
var morse_alphabet = 
{  
   "-----":"0",   ".----":"1",
   "..---":"2",   "...--":"3",
   "....-":"4",   ".....":"5",
   "-....":"6",   "--...":"7",
   "---..":"8",   "----.":"9",
   ".-":"a",   "-...":"b",
   "-.-.":"c",   "-..":"d",
   ".":"e",   "..-.":"f",
   "--.":"g",   "....":"h",
   "..":"i",   ".---":"j",
   "-.-":"k",   ".-..":"l",
   "--":"m",   "-.":"n",
   "---":"o",   ".--.":"p",
   "--.-":"q",   ".-.":"r",
   "...":"s",   "-":"t",
   "..-":"u",   "...-":"v",
   ".--":"w",   "-..-":"x",
   "-.--":"y",   "--..":"z",
   "/":" ",   "-·-·--":"!",
   "·-·-·-":".",   "--··--":","
};

morse_text.split("/").map(function (word) 
{
    word.split(" ").map(function(letter) 
    {
        plain_text.push(morse_alphabet[letter]);
    });
    plain_text.push(" ");
});
    
document.getElementById("message").value = plain_text.join("");
    
}

//Function to clear textarea
function eraseText() 
{ 
    document.getElementById("message").value = "";
}


//Base64 encode and decode

function encodeBase(element)
{
    
	var plain_text = document.getElementsByTagName("textarea")[0].value.replace(/[^a-zA-Z]/g, " "); 
    //Encode a string in base-64
	var base64_text = btoa(plain_text); 
    //Get the element with the specified ID
	document.getElementById("message").value = base64_text;	
}

function decodeBase(element)
{
	var plain_text = document.getElementsByTagName("textarea")[0].value; 
    //Decode a base-64 encoded string
    var base64_text = atob(plain_text); 
    //Get the element with the specified ID
	document.getElementById("message").value = base64_text;
}

//Function to clear textarea
function eraseText() 
{ 
    document.getElementById("message").value = "";
}

//Upload or drag a file
var fileSelect = function(evt) {
    // FileList object
    var files = evt.target.files;
    //Retrieve the first File from the FileList object
    var file = files[0];

    if (files && file) 
    {
        
        var reader = new FileReader();
        
        //Execute immediately after the page has been loaded
        reader.onload = function(readerEvt) 
        {
            var binaryString = readerEvt.target.result;
            document.getElementById("message").value = btoa(binaryString);
        };

        reader.readAsBinaryString(file);
    }
};

//Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) 
{
    document.getElementById('filePicker').addEventListener('change', fileSelect, false);
} 
else 
{
    alert('The File APIs are not fully supported in this browser.');
}

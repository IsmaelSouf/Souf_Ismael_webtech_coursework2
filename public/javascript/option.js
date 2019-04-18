function testSelect()
{
    var selectedText = document.getElementById("inbox");
    var displayInbox = selectedText.options[selectedText.selectedIndex].text;
    document.getElementById("message").value=displayInbox;
}
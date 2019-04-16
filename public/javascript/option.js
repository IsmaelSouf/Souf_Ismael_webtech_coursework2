function testSelect()
{
    var yo = document.getElementById("inbox");
    var displayInbox = yo.options[yo.selectedIndex].text;
    document.getElementById("message").value=displayInbox;
}
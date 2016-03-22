$(document).ready(function()
{

  // Select all text when you click.
  $("input.outputtext").click(function(){
    this.select();
  });

  // Submit button
  $("button").click(function()
  {
    var textVal = $("input[name=textinput]").val().trim();
    if (textVal.length > 0)
    {
      $(".outputtext").val(googler(textVal));
    }
    else
    {
      $(".outtputext").val("Enter in a value!");
    }
  });
});

// Return the text as a Google image search link
function googler(text)
{
  var replaced = text.replace(/^\d*\ */g, "").replace(/ /g, "+");

  return "https://www.google.com/search?q=" + replaced + "&source=lnms&tbm=isch";
}

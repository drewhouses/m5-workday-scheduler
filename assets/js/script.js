// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var buttonEl = $(".saveBtn");
  var today = dayjs();
  var hour = today.hour();
  var timeBlockEl = $(".time-block");

  function initializePage() {
    setTodaysDate();

    timeBlockEl.each(function (i) {
      var idToInt = parseInt(this.id);
      if (idToInt == hour) {
        $(this).addClass("present");
      } else if (idToInt < hour) {
        $(this).addClass("past");
      } else {
        $(this).addClass("future");
      }
    });

    for (var i = 9; i < 18; i++) {
      var counter = "#" + i;
      $(counter).children("textarea").val(localStorage.getItem(i));
    }
  }

  function setTodaysDate() {
    var weekDay = today.format("dddd");
    var month = today.format("MMM");
    var monthDay = today.format("DD");

    var formattedDate = "Today is " + weekDay + " " + month + ". " + monthDay;

    $("#currentDay").text(formattedDate);
  }
  initializePage();
  buttonEl.on("click", function (event) {
    event.preventDefault();
    console.log(event);

    var localItem = $(this).parent().attr("id");
    var item = $(this).siblings("textarea").val();
    localStorage.setItem(localItem, item);
  });
});

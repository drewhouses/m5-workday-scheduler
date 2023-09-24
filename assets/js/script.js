// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var buttonEl = $(".saveBtn");
  var today = dayjs();
  var timeBlockEl = $(".time-block");

  function initializePage() {
    setTodaysDate();

    $.each(timeBlockEl, function (i, timeBlock) {
      if (parseInt(timeBlock.attributes[0].value) === today.$H) {
        timeBlock.classList.add("present");
      } else if (parseInt(timeBlock.attributes[0].value) < today.$H) {
        timeBlock.classList.add("past");
      } else {
        timeBlock.classList.add("future");
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

    var localItem = $(this).parent().attr("id");
    var item = $(this).siblings("textarea").val();
    localStorage.setItem(localItem, item);
  });
});

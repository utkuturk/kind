PennController.ResetPrefix(null); // Shorten command names (keep this line here)
// DebugOff()

/*
TODOs:
- Prolific
- Scale texts
*/

let itemTimer = 1000;

SetCounter("setcounter");

Sequence(
  "setcounter",
  "intro",
  "instruction",
  randomize("practice"),
  "warn",
  rshuffle("frazier", "trial", "filler"),
  SendResults(),
  "bye"
);

//Welcome screen
newTrial(
  "intro",
  newText(
    "Welcome",
    "<center><b>Welcome!</b></center>" +
      "<p>This is the second part of the experiment, you will judge sentences that are completed by other people. Click <b>Next</b> to see the instructions and start the second part."
  ).print(),
  newButton("Agree", "I Agree")
    .center()
    .settings.css("margin", "40px")
    .print()
    .wait()
)
  .setOption("hideProgressBar", true)
  .setOption("countsForProgressBar", false);

// Instructions
newTrial(
  "instruction",
  newText(
    "instruction-text",
    "<center><b>Instructions</b></center>" +
      "In the second part of the experiment, you will see completed sentences in the following fashion and judge them using your mouse. Now, read the following sentence and rate how natural the sentence is to you.<br><br><br>"
  ).print(),
  newController("FlashSentence", { s: "Utku eve geldi." })
    .center()
    .print()
    .log(),
  newText("question", "")
    .cssContainer({ "margin-bottom": "2em" })
    .center()
    .print(),
  newScale("grade", "1", "2", "3", "4", "5", "6", "7")
    .labelsPosition("bottom")
    .before(newText("left", "Unnatural"))
    .after(newText("right", "Natural"))
    .center()
    .keys()
    .print()
    .wait()
    .log(),
  newText(
    "<br>Now, you will go through some practice items to get you used to the task."
  ).print(),
  newButton("Click here to begin practice trials!")
    .center()
    .settings.css("margin", "40px")
    .print()
    .wait()
)
  .setOption("hideProgressBar", true)
  .setOption("countsForProgressBar", false);

// Practice End
newTrial(
  "warn",
  newText(
    "<p>Practice done! Now, you are ready to start the experiment!" +
      "<ol><li>Read the completed sentences and rate them.</li>" +
      "<li>Some sentences may require more context, which is fine.</li></ol>" +
      "<br><br> If you are ready, click the button below to start the experiment. " +
      "You will be expected to judge sentences in less than 10 seconds."
  ).print(),
  newButton("Click here to begin the experiment.")
    .center()
    .settings.css("margin", "40px")
    .print()
    .wait()
)
  .setOption("hideProgressBar", true)
  .setOption("countsForProgressBar", false);

// Practice
Template("practice.csv", (row) =>
  newTrial(
    "practice",
    newText("sep", "*").css("font-size", "24pt").center().print(),
    newTimer("wait", 500).start().wait(),
    getText("sep").remove(),
    newController("FlashSentence", { s: row.sentence }).center().print().log(),
    newTimer("hurry", itemTimer).start(),
    newText("question", " ")
      .cssContainer({ "margin-bottom": "2em" })
      .center()
      .print(),
    newTimer("dummy", 1)
      .callback(
        newScale("grade", "1", "2", "3", "4", "5", "6", "7")
          .labelsPosition("bottom")
          .before(newText("left", "Unnatural"))
          .after(newText("right", "Natural"))
          .radio()
          .center()
          .keys()
          .once()
          .print()
          .wait()
          .log(),
        getTimer("hurry").stop()
      )
      .start(),
    getTimer("hurry").wait()
  )
    .log("itemnum", row.itemnum)
    .log("type", row.type)
    .log("sentence", row.sentence)
);
// Exp
Template("from-comp-exp.csv", (row) =>
  newTrial(
    "trial",
    newText("sep", "*").css("font-size", "18pt").center().print(),
    newTimer("wait", 500).start().wait(),
    getText("sep").remove(),
    newController("FlashSentence", { s: row.sentence }).center().print().log(),
    newTimer("hurry", itemTimer).start(),
    newText("question", " ")
      .cssContainer({ "margin-bottom": "2em" })
      .center()
      .print(),
    newTimer("dummy", 1)
      .callback(
        newScale("grade", "1", "2", "3", "4", "5", "6", "7")
          .labelsPosition("bottom")
          .before(newText("left", "Unnatural"))
          .after(newText("right", "Natural"))
          .radio()
          .center()
          .keys()
          .once()
          .print()
          .wait()
          .log(),
        getTimer("hurry").stop()
      )
      .start(),
    getTimer("hurry").wait()
  )
    .log("sentence", row.sentence) // add these three columns to the results lines of these Template-based trials
    .log("itemnum", row.itemnum)
    .log("condition", row.condition)
    .log("Is_definite", row.the)
    .log("Is_modified", row.adj)
    .log("Is_coordinated", row.and)
);
// Frazier
Template("frazier.csv", (row) =>
  newTrial(
    "trial",
    newText("sep", "*").css("font-size", "18pt").center().print(),
    newTimer("wait", 500).start().wait(),
    getText("sep").remove(),
    newController("FlashSentence", { s: row.sentence }).center().print().log(),
    newTimer("hurry", itemTimer).start(),
    newText("question", " ")
      .cssContainer({ "margin-bottom": "2em" })
      .center()
      .print(),
    newTimer("dummy", 1)
      .callback(
        newScale("grade", "1", "2", "3", "4", "5", "6", "7")
          .labelsPosition("bottom")
          .before(newText("left", "Unnatural"))
          .after(newText("right", "Natural"))
          .radio()
          .center()
          .keys()
          .once()
          .print()
          .wait()
          .log(),
        getTimer("hurry").stop()
      )
      .start(),
    getTimer("hurry").wait()
  )
    .log("sentence", row.sentence) // add these three columns to the results lines of these Template-based trials
    .log("itemnum", row.itemnum)
    .log("condition", row.condition)
);

// Filler
Template("from-comp-filler.csv", (row) =>
  newTrial(
    "filler",
    newText("sep", "*").css("font-size", "24pt").center().print(),
    newTimer("wait", 500).start().wait(),
    getText("sep").remove(),
    newController("FlashSentence", { s: row.sentence }).center().print().log(),
    newTimer("hurry", itemTimer).start(),
    newText("question", " ")
      .cssContainer({ "margin-bottom": "2em" })
      .center()
      .print(),
    newTimer("dummy", 1)
      .callback(
        newScale("grade", "1", "2", "3", "4", "5", "6", "7")
          .labelsPosition("bottom")
          .before(newText("left", "Unnatural"))
          .after(newText("right", "Natural"))
          .radio()
          .center()
          .keys()
          .once()
          .print()
          .wait()
          .log(),
        getTimer("hurry").stop()
      )
      .start(),
    getTimer("hurry").wait()
  )
    .log("sentence", row.sentence) // add these three columns to the results lines of these Template-based trials
    .log("type", row.type)
    .log("condition", row.condition)
    .log("itemnum", row.itemnum)
);
// bye
newTrial(
  "bye",
  newText(
    "Thank you for your participation! You completed both parts of the experiment. Please go to the following link to verify your participation: " +
      "<a href='https://app.prolific.co/submissions/complete?cc=2C35D14F'>https://app.prolific.co/submissions/complete?cc=2C35D14F</a>"
  ).print(),
  newButton().wait()
).setOption("countsForProgressBar", false);
// Make sure the progress bar is full upon reaching this last (non-)trial

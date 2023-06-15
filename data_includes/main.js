PennController.ResetPrefix(null); // shorten command names (keep this line here)
PennController.DebugOff();
var showProgressBar = false;

// Set the order of the whole experiment //
Sequence("intro", "PracticeStart", "practice", "PracticeEnd", rshuffle("filler","completion"), "send", "bye","counter");

// // Welcome page //
// PennController("intro",
//   newHtml("intro", "Introduction.html")
//     .log()
//     .print(),
//   newText("startText", "<p><h2>Press the button to start the test</h2></p>")
//     .center()
//     .print(),
//   newButton("start", "<big><b>Start</b></big>")
//     .size(200, 50)
//     .center()
//     .cssContainer("vertical-align", "middle")
//     .print()
//     .wait(getHtml("intro")
//       .test.complete()
//       .failure(getHtml("intro")
//         .warn()))
// );

// The experiment itself //
newTrial("PracticeStart",
  newButton("button", "<big><b>Do a little practice before starting the test.</b></big>")
    .size(300, 60)
    .print()
    .wait()
);

newTrial("PracticeEnd",
  newButton("button", "<big><b>Practice completed. If you have any questions, you can ask the examiner. Press the button to continue.</b></big>")
    .size(400, 60)
    .print()
    .wait()
);

Template("ExpSentences.csv", row =>
  newTrial("completion",
    newTimer(250)
      .start()
      .wait(),
    newText("Sentence", row.Sentence)
      .center()
      .cssContainer({ "margin-right": "2em" })
      .settings.css("font-size", "2em")
      .print(),
    newTextInput("answer")
      .settings.before(getText("Sentence"))
      .log("validate")
      .lines(1)
      .settings.css("font-size", "2em")
      .cssContainer("display", "inline")
      .print()
      .wait(getTextInput("answer").testNot.text(""))
  )
    .log("Sentence", row.Sentence) // add these three columns to the results lines of these Template-based trials
    .log("Condition", row.Condition)
    .log("Item Number", row.ItemNumber)
);

Template("FillerSentences.csv", row =>
  newTrial("filler",
    newTimer(250)
      .start()
      .wait(),
    newText("Sentence", row.Sentence)
      .center()
      .cssContainer({ "margin-right": "2em" })
      .settings.css("font-size", "2em")
      .print(),
    newTextInput("answer")
      .settings.before(getText("Sentence"))
      .log("validate")
      .lines(1)
      .settings.css("font-size", "2em")
      .cssContainer("display", "inline")
      .print()
      .wait(getTextInput("answer").testNot.text(""))
  )
    .log("Sentence", row.Sentence) // add these three columns to the results lines of these Template-based trials
    //.log("Condition", row.Condition)
    .log("Item Number", row.ItemNumber)
);

Template("PracticeItems.csv", row =>
  newTrial("practice",
    newTimer(250)
      .start()
      .wait(),
    newText("Sentence", row.Sentence)
      .center()
      .cssContainer({ "margin-right": "2em" })
      .settings.css("font-size", "2em")
      .print(),
    newTextInput("answer")
      .settings.before(getText("Sentence"))
      .log("validate")
      .lines(1)
      .settings.css("font-size", "2em")
      .cssContainer("display", "inline")
      .print()
      .wait(getTextInput("answer").testNot.text(""))
  )
    .log("Sentence", row.Sentence) // add these three columns to the results lines of these Template-based trials
    //.log("Condition", row.Condition)
    .log("Item Number", row.ItemNumber)
);

SendResults("send");

// Last screen (after the experiment is done) //
newTrial("bye",
  newText("<big><b>Thank you for participating in the test.</big></b>")
    .print(),
  newButton()
    .wait() // Wait for a click on a non-displayed button = wait here forever
)
.setOption("countsForProgressBar", false);

// Make sure the progress bar is full upon reaching this last (non-)trial

PennController.ResetPrefix(null); // Shorten command names (keep this line here)
// DebugOff()

/*
TODOs:
- Time limit
- Item prep
- Logging
- Prolific
- Scale texts
*/

SetCounter("setcounter");

Sequence(
  "setcounter",
  "intro",
  "instruction",
  randomize("practice"),
  "warn",
  rshuffle("trial", "filler"),
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
  newController("FlashSentence", {s: "Utku eve geldi."})
    .center()
    .print()
    .log(),
  newText("question", "")
    .cssContainer({ "margin-bottom": "2em" })
    .center()
    .print(),
  newScale("grade", "1", "2", "3", "4", "5", "6", "7")
    .labelsPosition("bottom")
    .before(newText("left", "Totally unnatural"))
    .after(newText("right", "Totally natural"))
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
Template("practice.csv", (filler) =>
  newTrial(
    "practice",
    newText("sep", "*").css("font-size", "24pt").center().print(),
    newTimer("wait", 500).start().wait(),
    getText("sep").remove(),
    newController("FlashSentence", { s: filler.Sentence })
      .center()
      .print()
      .log(),
    newText("question", " ")
      .cssContainer({ "margin-bottom": "2em" })
      .center()
      .print(),
    newScale("grade", "1", "2", "3", "4", "5", "6", "7")
      .labelsPosition("bottom")
      .before(newText("left", "Totalmente inaceptable"))
      .after(newText("right", "Totalmente aceptable"))
      .radio()
      .center()
      .keys()
      .once()
      .print()
      .wait()
      .log()
  )
    .log("item", filler.itemnum)
    .log("condA", filler.cond_A)
    .log("condB", filler.cond_B)
    .log("EXP", filler.Expt_type)
);
// Exp
Template("experimental.csv", (exp) =>
  newTrial(
    "trial",
    newText("sep", "*").css("font-size", "18pt").center().print(),
    newTimer("wait", 500).start().wait(),
    getText("sep").remove(),
    newController("FlashSentence", { s: exp.Sentence })
      .center()
      .print()
      .log(),
    newText("question", "")
      .cssContainer({ "margin-bottom": "2em" })
      .center()
      .print(),
    newScale("grade", "1", "2", "3", "4", "5", "6", "7")
      .labelsPosition("bottom")
      .before(newText("left", "Totalmente inaceptable"))
      .after(newText("right", "Totalmente aceptable"))
      .center()
      .keys()
      .print()
      .wait()
      .log()
  )
    .log("group", exp.group)
    .log("item", exp.itemnum)
    .log("condA", exp.cond_A)
    .log("condB", exp.cond_B)
    .log("EXP", exp.Expt_type)
);
// Filler
Template("fillers.csv", (filler) =>
  newTrial(
    "filler",
    newText("sep", "*").css("font-size", "24pt").center().print(),
    newTimer("wait", 500).start().wait(),
    getText("sep").remove(),
    newController("FlashSentence", { s: filler.Sentence })
      .center()
      .print()
      .log(),
    newText("question", " ")
      .cssContainer({ "margin-bottom": "2em" })
      .center()
      .print(),
    newScale("grade", "1", "2", "3", "4", "5", "6", "7")
      .labelsPosition("bottom")
      .before(newText("left", "Totalmente inaceptable"))
      .after(newText("right", "Totalmente aceptable"))
      .radio()
      .center()
      .keys()
      .once()
      .print()
      .wait()
      .log()
  )
    .log("item", filler.itemnum)
    .log("condA", filler.cond_A)
    .log("condB", filler.cond_B)
    .log("EXP", filler.Expt_type)
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

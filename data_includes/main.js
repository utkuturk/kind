PennController.ResetPrefix(null); // Shorten command names (keep this line here)
// DebugOff()

SetCounter("setcounter");

Sequence(
  //"setcounter",
  //"intro",
  //"consent",
  //"instruction1",
  //"instruction2",
  randomize("practice"),
  "warn",
  rshuffle("trial", "filler"),
  "feedback",
  SendResults(),
  "bye"
);
// Should we specify monolingual speakers of English?
newTrial(
  "intro",

  newText(
    "Welcome",
    "Welcome! This experiment has two halves. In the first half, you will be asked to complete sentence fragments. It is important for us that you try to be vivid with your examples, and do not repeat the same sentence fragments. Following the first half, you will see a link to the second half, in which you will judge sentences from other participants. <p>To participate in this experiment, you must meet the following requirements.<p>(1) You must be a native speaker of English.<p>(2) You must be older than 18 years old.<p>(3) You must use your computer, and not your phone or tablet.<p>(4) You must have a working mouse and keyboard.<p>If you meet these requirements, please enter your Prolific ID, language, and age below and click Next:"
  )
    .settings.css("font-size", "1em")
    .print(),
  newTextInput("ProlificID")
    .before(newText("ID", "Your Prolific ID:").settings.css("font-size", "1em"))
    .settings.css("font-size", "1em")
    .settings.css("width", "50%")
    .settings.css("margin", "auto")
    .print()
    .log(),
  newTextInput("Age")
    .before(newText("AGE", "Your age:").settings.css("font-size", "1em"))
    .settings.css("font-size", "1em")
    .settings.css("width", "50%")
    .settings.css("margin", "auto")
    .print()
    .log(),
  newTextInput("Language")
    .before(
      newText("LANG", "Your native language:").settings.css("font-size", "1em")
    )
    .settings.css("font-size", "1em")
    .settings.css("width", "50%")
    .settings.css("margin", "auto")
    .print()
    .log(),
  newButton("Next", "Next")
    .center()
    .settings.css("font-size", "1em")
    .settings.css("margin", "40px")
    .settings.size(500, 48)
    .print()
    .wait(
      getTextInput("Age")
        .test.text(/^\d+$/)
        .failure(
          newText("Age should be a numberic value")
            .settings.color("red")
            .print()
        )
        .and(
          getTextInput("Language")
            .testNot.text("")
            .failure(
              newText("Please enter your languages you speak fluently")
                .settings.color("red")
                .print()
            )
        )
        .and(
          getTextInput("ProlificID")
            .testNot.text("")
            .failure(
              newText(
                "Please Enter your ProlificID, if you do not have one write 0"
              )
                .settings.color("red")
                .print()
            )
        )
    )
);

newTrial(
  "consent",
  newText(
    "Please click <a href='https://google.com' target='_blank'>here</a> to download the consent form for this study. If you read it and agree to participate in this study, click 'I Agree' below. If you do not agree to participate in this study, you can leave this study by closing the tab. You can leave the experiment at any time by closing the tab during the experiment."
  )
    .settings.css("font-size", "1em")
    .print(),
  newButton("Agree", "I Agree")
    .center()
    .settings.css("font-size", "1em")
    .settings.css("margin", "40px")
    .settings.size(500, 48)
    .print()
    .wait()
);

newTrial(
  "instruction1",
  newText(
    "Please read this instruction carefully! If you fail to understand the task, your data will NOT be usable.<p>" +
      "In each trial in this experiment, you will see a fragment of a sentence. Your task is to <b>read them and " +
      "complete the sentence fragment by typing the rest. You are given 20 seconds to read the fragment and complete it.</b><p>" +
      "It would help us tremendously if you do not complete the sentences in the same manner.<p>" +
      "We understand this is not an easy task. So no need to " +
      "be concerned if you are not perfect.</b>"
  )
    .settings.css("font-size", "1em")
    .print(),
  newButton("Next")
    .center()
    .settings.css("font-size", "1em")
    .settings.css("margin", "40px")
    .settings.size(500, 48)
    .print()
    .wait()
);

newTrial(
  "instruction2",
  newText("In the experiment you will see sentence fragments as the following")
    .settings.css("font-size", "1em")
    .print(),
  newText("example_premable", "Mehmet Efendi<br>")
    .center()
    .cssContainer({ "margin-right": "1em" })
    .settings.css("font-size", "1em")
    .print(),
  newTextInput("answer")
    .settings.before(getText("example_premable"))
    .log("validate")
    .lines(1)
    .settings.css("font-size", "1em")
    .cssContainer("display", "inline")
    .print()
    .wait(getTextInput("answer").testNot.text("")),
  newText(
    "<p>You can complete this fragment as follows: <ol>" +
      "<li>is a Turkish coffee brand.</li>" +
      "<li>is sold in the US.</li>" +
      "<li>made me miss my hometown.</li></ol>"
  )
    .settings.css("font-size", "1em")
    .print(),
  newButton("Click here to begin practice trials!")
    .center()
    .settings.css("font-size", "1em")
    .settings.css("margin", "40px")
    .settings.size(500, 48)
    .print()
    .wait()
);

newTrial(
  "warn",
  newText(
    "<p>Practice done! Now, you are ready to start the experiment! Remember, your task is to:<ol>" +
      "<li>Read the sentence fragments and complete them.</li>" +
      "<li>Complete them with a vivid continuation." +
      "Recall they will be judged by other participants</li></ol>"
  )
    .settings.css("font-size", "1em")
    .print(),
  newButton("Click here to begin the experiment.")
    .center()
    .settings.css("font-size", "1em")
    .settings.css("margin", "40px")
    .settings.size(500, 48)
    .print()
    .wait()
);

// Experimental Trials
Template("ExpPreambles.csv", (row) =>
  newTrial(
    "trial",
    newTimer(500).start().wait(),
    newText("Preamble", row.preamble)
      .center()
      .cssContainer({ "margin-right": "1em" })
      .print(),
      newTimer("hurry", 10000).start(),
      newTimer("dummy", 1)
        .callback(
          newTextInput("answer")
            .settings.before(getText("Preamble"))
            .log("validate")
            .lines(1)
            .cssContainer("display", "flex")
            .print()
            .wait(
              getTextInput("answer")
                .test.text(/^(.{10,500})$/)
                .failure(
                  newText("<b>Please write more.</b>")
                    .settings.color("red")
                    .print()
                )
            ),
          getTimer("hurry").stop()
        )
        .start(),
      getTimer("hurry").wait()
  )
    .log("Preamble", row.preamble) // add these three columns to the results lines of these Template-based trials
    .log("Condition", row.condition)
    .log("ItemNumber", row.itemnum)
    .log("Is_definite", row.the)
    .log("Is_modified", row.adj)
    .log("Is_coordinated", row.and)
);

// Filler Trials
Template("FillerPreambles.csv", (row) =>
  newTrial(
    "filler",
    newTimer(500).start().wait(),
    newText("Preamble", row.preamble)
      .center()
      .cssContainer({ "margin-right": "1em" })
      .print(),
      newTimer("hurry", 10000).start(),
      newTimer("dummy", 1)
        .callback(
          newTextInput("answer")
            .settings.before(getText("Preamble"))
            .log("validate")
            .lines(1)
            .cssContainer("display", "flex")
            .print()
            .wait(
              getTextInput("answer")
                .test.text(/^(.{10,500})$/)
                .failure(
                  newText("<b>Please write more.</b>")
                    .settings.color("red")
                    .print()
                )
            ),
          getTimer("hurry").stop()
        )
        .start(),
      getTimer("hurry").wait()
  )
    .log("Preamble", row.preamble) // add these three columns to the results lines of these Template-based trials
    .log("Condition", row.condition)
    .log("FillerType", row.type)
    .log("ItemNumber", row.itemnum)
);

// Practice Trials
Template("PracticePreambles.csv", (row) =>
  newTrial(
    "practice",
    newTimer(300).start().wait(), //white screen before the trial
    newText("Preamble", row.preamble)
      .center()
      .cssContainer({ "margin-right": "1em" })
      .print(),
    newTimer("hurry", 10000).start(),
    newTimer("dummy", 1)
      .callback(
        newTextInput("answer")
          .settings.before(getText("Preamble"))
          .log("validate")
          .lines(1)
          .cssContainer("display", "flex")
          .print()
          .wait(
            getTextInput("answer")
              .test.text(/^(.{10,500})$/)
              .failure(
                newText("<b>Please write more.</b>")
                  .settings.color("red")
                  .print()
              )
          ),
        getTimer("hurry").stop()
      )
      .start(),
    getTimer("hurry").wait()
    // add timelimit
  )
    .log("Preamble", row.preamble) // add these three columns to the results lines of these Template-based trials
    .log("Condition", row.condition)
    .log("ItemNumber", row.itemnum)
);

PennController(
  "feedback",
  newText(
    "feedback_instruction",
    "If you have any feedback on the first half of the experiment, please leave it here.<p>"
  )
    .settings.css("font-size", "1em")
    .center()
    .print(),
  newTextInput("feedback", "").center().log().lines(0).size(420, 200).print(),
  newButton("send", "Send")
    .center()
    .settings.size(500, 48)
    .settings.css("font-size", "1em")
    .settings.css("margin", "40px")
    .print()
    .wait()
);

newTrial(
  "bye",
  newText(
    "Thank you for your participation! Please go to the following web page to continue to the second half of the experiment: <a href='https://google.com'>The Link for the second half of he experiment.</a>."
  )
    .settings.css("font-size", "1em")
    .print(),

  newButton().wait() // Wait for a click on a non-displayed button = wait here forever
).setOption("countsForProgressBar", false);
// Make sure the progress bar is full upon reaching this last (non-)trial

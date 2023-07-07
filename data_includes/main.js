PennController.ResetPrefix(null); // Shorten command names (keep this line here)
// DebugOff()

SetCounter("setcounter");

var underline_blank = {
  outline: "none",
  resize: "none",
  border: "0",
  padding: "0",
  margin: "0",
  "margin-left": "1ex",
  "margin-right": "1ex",
  "vertical-align": "-.33em",
  "background-color": "white",
  "border-bottom": "2px solid black",
  display: "inline",
};

Sequence(
  "setcounter",
  "intro",
  "consent",
  "instruction1",
  "instruction2",
  randomize("practice"),
  "warn",
  rshuffle("trial", "filler"),
  // "feedback",
  SendResults(),
  "bye"
);
// Should we specify monolingual speakers of English?
newTrial(
  "intro",
  newText(
    "Welcome",
    "Welcome! This experiment has two halves. In the first half (20 mins), you will be asked to complete sentence fragments. It is important for us that you try to be vivid with your examples, and do not repeat the same sentence fragments. Following the first half, you will see a link to the second half (10 mins), in which you will judge sentences from other participants. <p>To participate in this experiment, you must meet the following requirements: <b>(1)</b> You must be a native speaker of English, <b>(2)</b> You must be older than 18 years old, <b>(3)</b> You must use your computer, and not your phone or tablet, <b>(4)</b> You must have a working mouse and keyboard.<p>If you meet these requirements, please enter the information below and click <b>Next</b>"
  ).print(),
  newTextInput("ProlificID")
    .before(newText("ID", "Prolific ID: ").size("8em", "1.5em"))
    .size("6em", "1.5em")
    .lines(1)
    .css(underline_blank)
    .print()
    .log(),
  newTextInput("Age")
    .before(newText("AGE", "Age:").size("8em", "1.5em"))
    .size("6em", "1.5em")
    .lines(1)
    .css(underline_blank)
    .print()
    .log(),
  newTextInput("Language")
    .before(newText("LANG", "Native language:").size("8em", "1.5em"))
    .size("6em", "1.5em")
    .lines(1)
    .css(underline_blank)
    .print()
    .log(),
  newButton("Next", "Next")
    .center()
    .settings.css("margin", "40px")
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
    "Please click <a href='https://utkuturk.com/files/web_consent.pdf' target='_blank'>here</a> to download the consent form for this study. If you read it and agree to participate in this study, click 'I Agree' below. If you do not agree to participate in this study, you can leave this study by closing the tab. You can leave the experiment at any time by closing the tab during the experiment.<br><br><br><b> Researchers:</b> <br>Utku Turk, PhD Student <i> (utkuturk@umd.edu)</i>,<br>Assoc. Prof. Ellen Lau <i>(ellenlau@umd.edu)</i><br>University of Maryland, Department of Linguistics"
  ).print(),
  newButton("Agree", "I Agree")
    .center()
    .settings.css("margin", "40px")
    .print()
    .wait()
);

newTrial(
  "instruction1",
  newText(
    "Please read this instruction carefully! If you fail to understand the task, your data will NOT be usable.<p>" +
      "In each trial in this experiment, you will see a fragment of a sentence. Your task is to <b>read them and " +
      "complete the sentence fragment by typing the rest. You are given 10 seconds to read the fragment and complete it.</b><p>" +
      "You will write the rest of the sentence in the blank provided next to the fragment. " +
      "To complete a trial, you have to write at least 15 characters." +
      "After the completion, you can press the <b>ENTER</b> key to submit your answer." +
      "It would help us tremendously if you do not complete the sentences in the same manner.<p>" +
      "We understand this is not an easy task. So no need to " +
      "be concerned if you are not perfect.</b>" +
      "<p> In the next section, we will go through an example trial."
  ).print(),
  newButton("Next").center().settings.css("margin", "40px").print().wait()
);

newTrial(
  "instruction2",
  newText(
    "In the experiment you will see sentence fragments in the following fashion. Now, try to complete the following sentence and hit <b>ENTER</b>.<br><br><br>"
  ).print(),
  newText("example_premable", "Coffee beans")
    .center()
    .cssContainer({ "margin-right": "1em" })
    .print(),
  newTextInput("answer")
    .settings.before(getText("example_premable"))
    .log("validate")
    .lines(1)
    .css(underline_blank)
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
  newText(
    "<p>You can complete this fragment as follows:<ol>" +
      "<li>are produced only in certain parts of the world.<br><br></li>" +
      "<li>that I bought from Whole Foods were really fresh.<br><br></li>" +
      "<li>make me miss my hometown.</li></ol>" +
      "<br><br>Now, you will go through some practice items to get you used to the task." 
  ).print(),
  newButton("Click here to begin practice trials!")
    .center()
    .settings.css("margin", "40px")
    .print()
    .wait()
);

newTrial(
  "warn",
  newText(
    "<p>Practice done! Now, you are ready to start the experiment! Remember, your task is to:<ol>" +
      "<li>Read the sentence fragments and complete them.</li>" +
      "<li>Complete them with a vivid continuation. " +
      "Recall that they will be judged by other participants</li></ol>" +
      "<br><br> If you are ready, click the button below to start the experiment. " + 
      "You will be expected to complete sentences in less than 10 seconds " + 
      "and are expected to write more than 15 characters."
  ).print(),
  newButton("Click here to begin the experiment.")
    .center()
    .settings.css("margin", "40px")
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
              .test.text(/^(.{15,500})$/)
              // .failure(
              //   newText("<b>Please write more.</b>")
              //     .settings.color("red")
              //     .print()
              // )
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
              .test.text(/^(.{15,500})$/)
              // .failure(
              //   newText("<b>Please write more.</b>")
              //     .settings.color("red")
              //     .print()
              // )
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
              .test.text(/^(.{15,500})$/)
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

// PennController(
//   "feedback",
//   newText(
//     "feedback_instruction",
//     "If you have any feedback on the first half of the experiment, please leave it here.<p>"
//   )
//     .center()
//     .print(),
//   newTextInput("feedback", "").center().log().lines(0).size(420, 200).print(),
//   newButton("send", "Send")
//     .center()
//     .settings.size(500, 48)
//     .settings.css("margin", "40px")
//     .print()
//     .wait()
// );

newTrial(
  "bye",
  newText(
    "Thank you for your participation! Please go to the following web page to continue to the second half of the experiment: <a href='https://google.com'>The Link for the second half of he experiment.</a>."
  ).print(),

  newButton().wait() // Wait for a click on a non-displayed button = wait here forever
).setOption("countsForProgressBar", false);
// Make sure the progress bar is full upon reaching this last (non-)trial

PennController.ResetPrefix(null); // Shorten command names (keep this line here)
//DebugOff();
// TODO: Count for progressbar does not work.
// TODO: Some texts go to the second line, ugly.
// TODO: Too much space between the text and the textinput
// TODO: Spacing in the second instruction example.
// TODO: right now it is 40 seconds, think about it.
// TODO: Edit the question
// TODO: Add Zach's things.

SetCounter("setcounter");

let pilot = 0;
let prolific = 1;
let itemTimer = 40000;
let jitemTimer = 5000;

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
  "how-works",
  "consent",
  "instruction1",
  "instruction2",
  "instruction3",
  randomize("practice"),
  "warn",
  rshuffle("trial", "filler"),
  "bye",
  "jintro",
  "jinstruction",
  randomize("jpractice"),
  "jwarn",
  rshuffle("jfrazier", "jtrial", "jfiller"),
  SendResults(),
  "jbye"
);

Header(
  newVar("text").global(), //Header(newVar("Preamble").global());
  newVar("condition").global(), //Header(newVar("Condition").global());
  newVar("type").global(), //Header(newVar("FillerType").global());
  newVar("itemnum").global(), //Header(newVar("ItemNumber").global());
  newVar("Is_definite").global(),
  newVar("Is_modified").global(),
  newVar("Is_coordinated").global(),
  newVar("RT").global()
)
  .log("PROLIFIC_ID", GetURLParameter("id"))
  .log("text", getVar("text"))
  .log("condition", getVar("condition"))
  .log("type", getVar("type"))
  .log("itemnum", getVar("itemnum"))
  .log("Is_definite", getVar("Is_definite"))
  .log("Is_modified", getVar("Is_modified"))
  .log("Is_coordinated", getVar("Is_coordinated"))
  .log("RT", getVar("RT"));

newTrial(
  "intro",
  newText(
    "Welcome",
    "<center><b>Welcome!</b></center>" +
      "<p>To participate in this experiment, you must meet the following requirements: <b>(1)</b> You must be a native speaker of English, <b>(2)</b> You must be older than 18 years old, <b>(3)</b> You must use your computer, and not your phone or tablet, <b>(4)</b> You must have a working mouse and keyboard.<p>If you meet these requirements, please enter the information below and click <b>Next</b>"
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
)
  .setOption("hideProgressBar", true)
  .setOption("countsForProgressBar", false);

newTrial(
  "how-works",
  newText(
    "<center><b>How this experiment works</b></center>" +
      "<p>This experiment has two halves. In the first half (20 mins), you will be asked to complete sentence fragments. It is important for us that you try to be vivid with your examples, and do not repeat the same sentence fragments." +
      "<p>Following the first half, you will see a link to the second half (10 mins), in which you will judge sentences from other participants. " +
      "<p> What are you supposed to do in the first part of this study?"
  ).print(),
  newScale(
    "instruction",
    "A) Edit each sentence to make it better",
    "B) Complete sentences",
    "C) Decide which sentence is better",
    "D) Point out the mistakes in the sentence"
  )
    .vertical()
    .radio()
    .labelsPosition("right")
    .print()
    .log(),
  newButton("Next", "Next")
    .center()
    .settings.css("margin", "40px")
    .print()
    .wait(
      getScale("instruction")
        .test.selected()
        .failure(
          newText("Please select one of the options")
            .settings.color("red")
            .print()
        )
    )
)
  .setOption("hideProgressBar", true)
  .setOption("countsForProgressBar", false);

newTrial(
  "consent",
  newText(
    "<center><b>Consent Form</b></center>" +
      "<p>Please click <a href='https://utkuturk.com/files/web_consent.pdf' target='_blank'>here</a> to download the consent form for this study. If you read it and agree to participate in this study, click 'I Agree' below. If you do not agree to participate in this study, you can leave this study by closing the tab. You can leave the experiment at any time by closing the tab during the experiment. If you leave the experiment before completion of both parts, you will not be compensated for your time. If you encounter any problems, do not hesitate to reach us either via Prolific or e-mail.<br><br><b> Researchers:</b> <br>Utku Turk, PhD Student <i> (utkuturk@umd.edu)</i>,<br>Assoc. Prof. Ellen Lau<br>University of Maryland, Department of Linguistics"
  ).print(),
  newButton("Agree", "I Agree")
    .center()
    .settings.css("margin", "40px")
    .print()
    .wait()
)
  .setOption("hideProgressBar", true)
  .setOption("countsForProgressBar", false);

newTrial(
  "instruction1",
  newText(
    "<center><b>Instructions</b></center>" +
      "<p>Please read this instruction carefully! If you fail to understand the task, your data will NOT be usable.<p>" +
      "Your task is to read the fragment and then complete it by typing in what you think should come next. " +
      "You will be given 40 seconds to read the fragment and complete it.<p>" +
      "It would help us tremendously if you can please complete the sentences in varied ways, appropriate to each fragment. " +
      "To complete a trial, you have to write at least 10 characters.<p>" +
      "We understand this is not an easy task. So no need to " +
      "be concerned if you are not perfect.</b> " +
      "In the next section, we will go through an example trial."
  ).print(),
  newButton("Next").center().settings.css("margin", "40px").print().wait()
)
  .setOption("hideProgressBar", true)
  .setOption("countsForProgressBar", false);

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
          newText("<b>Please write more.</b>").settings.color("red").print()
        )
    ),
  newText(
    "<p>Here are three examples of how someone might complete this fragment:<ol>" +
      "<li>are produced only in certain parts of the world.<br></li>" +
      "<li>that I bought from the luxury coffee shop were always stale.<br></li>" +
      "<li>make me miss my hometown.</li></ol>"
  ).print(),
  newButton("Next").center().settings.css("margin", "40px").print().wait()
)
  .setOption("hideProgressBar", true)
  .setOption("countsForProgressBar", false);

newTrial(
  "instruction3",
  newText(
    "In the experiment you will see sentence fragments in the following fashion. Now, try to complete following sentences and hit <b>ENTER</b>.<br><br><br>"
  ).print(),
  newText(
    "Some fragment may include elements that you are not familiar with. " +
      "In this case, you can write whatever comes to your mind; you do not have to be correct or accurate.<br>"
  ).print(),
  newText("example_premable2", "Patterns in the mind")
    .center()
    .cssContainer({ "margin-right": "1em" })
    .print(),
  newTextInput("answer")
    .settings.before(getText("example_premable2"))
    .log("validate")
    .lines(1)
    .css(underline_blank)
    .print()
    .wait(
      getTextInput("answer")
        .test.text(/^(.{10,500})$/)
        .failure(
          newText("<b>Please write more.</b>").settings.color("red").print()
        )
    ),
  newText(
    "<p>Here are three examples of how someone might complete this fragment:<ol>" +
      "<li>is the title of a very important book written by Jackendoff.<br></li>" +
      "<li>arise when I stare at art.<br></li>" +
      "<li>always interested many scientists throughout the ages.</li></ol>" +
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

newTrial(
  "warn",
  newText(
    "<p>Practice done! Now, you are ready to start the experiment! Remember, your task is to:<ol>" +
      "<li>Read the sentence fragments and complete them.</li>" +
      "<li>Complete them with a vivid continuation. " +
      "Recall that they will be judged by other participants</li></ol>" +
      "<br><br> If you are ready, click the button below to start the experiment. " +
      "You will be expected to complete sentences in less than 40 seconds " +
      "and are expected to write more than 10 characters."
  ).print(),
  newButton("Click here to begin the experiment.")
    .center()
    .settings.css("margin", "40px")
    .print()
    .wait()
)
  .setOption("hideProgressBar", true)
  .setOption("countsForProgressBar", false);

// Experimental Trials
Template("ExpPreambles.csv", (row) =>
  newTrial(
    "trial",
    newTimer(500).start().wait(),
    newText("Preamble", row.preamble)
      .center()
      .cssContainer({ "margin-right": "1em" })
      .print(),
    newTimer("hurry", itemTimer).start(),
    newVar("RT")
      .global()
      .set(() => Date.now()),
    newTimer("dummy", 1)
      .callback(
        newTextInput("answer")
          .settings.before(getText("Preamble"))
          .log("validate")
          .lines(1)
          .css(underline_blank)
          .print()
          .wait(
            getTextInput("answer").test.text(/^(.{10,500})$/)
            // .failure(
            //   newText("<b>Please write more.</b>")
            //     .settings.color("red")
            //     .print()
            // )
          ),
        getTimer("hurry").stop()
      )
      .start(),
    getTimer("hurry").wait(),
    getVar("RT").set((v) => Date.now() - v),
    getVar("text").set(row.preamble),
    getVar("condition").set(row.condition),
    getVar("type").set("trial"),
    getVar("itemnum").set(row.itemnum),
    getVar("Is_definite").set(row.the),
    getVar("Is_modified").set(row.adj),
    getVar("Is_coordinated").set(row.and)
  )
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
    newTimer("hurry", itemTimer).start(),
    newVar("RT")
      .global()
      .set(() => Date.now()),
    newTimer("dummy", 1)
      .callback(
        newTextInput("answer")
          .settings.before(getText("Preamble"))
          .log("validate")
          .lines(1)
          .css(underline_blank)
          .print()
          .wait(
            getTextInput("answer").test.text(/^(.{10,500})$/)
            // .failure(
            //   newText("<b>Please write more.</b>")
            //     .settings.color("red")
            //     .print()
            // )
          ),
        getTimer("hurry").stop()
      )
      .start(),
    getTimer("hurry").wait(),
    getVar("RT").set((v) => Date.now() - v),
    getVar("text").set(row.preamble),
    getVar("condition").set(row.condition),
    getVar("type").set(row.type),
    getVar("itemnum").set(row.itemnum),
    getVar("Is_definite").set("filler"),
    getVar("Is_modified").set("filler"),
    getVar("Is_coordinated").set("filler")
  )
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
    newTimer("hurry", itemTimer).start(),
    newVar("RT")
      .global()
      .set(() => Date.now()),
    newTimer("dummy", 1)
      .callback(
        newTextInput("answer")
          .settings.before(getText("Preamble"))
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
        getTimer("hurry").stop()
      )
      .start(),
    getTimer("hurry").wait(),
    getVar("RT").set((v) => Date.now() - v),
    getVar("text").set(row.preamble),
    getVar("condition").set(row.condition),
    getVar("type").set("practice"),
    getVar("itemnum").set(row.itemnum),
    getVar("Is_definite").set("practice"),
    getVar("Is_modified").set("practice"),
    getVar("Is_coordinated").set("practice")
    // add timelimit
  )
);

newTrial(
  "bye",
  newText(
    "First part of the experiment is completed.<br><br>" +
      "Please continue to the second half of the experiment by clicking the button below"
  ).print(),

  newButton("Click here to start the second part of the experiment!")
    .center()
    .settings.css("margin", "40px")
    .print()
    .wait()
).setOption("countsForProgressBar", false);

//Welcome screen
newTrial(
  "jintro",
  newText(
    "Welcome",
    "<center><b>Welcome!</b></center>" +
      "<p>This is the second part of the experiment, you will judge how natural some sentences sound to you. These sentences are completed by other people in the first part of the experiment. Click <b>Next</b> to see the instructions and start the second part."
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
  "jinstruction",
  newText(
    "instruction-text",
    "<center><b>Instructions</b></center>" +
      "In the second part of the experiment, you will see completed sentences in the following fashion and judge them using your mouse or keyboard. Now, read the following sentence and rate how natural the sentence is to you by clicking the nubmer from 1 to 7. You can also use your keyboard by pressing a number between 1 and 7.<br><br><br>"
  ).print(),
  newController("FlashSentence", {
    s: "Gluttonous kings watched their kingdoms go hungry.",
  })
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
    "<br>Now, you will go through some practice items to get you used to the task. For every item, you will have 5 seconds to judge the sentence. If you do not judge the sentence in 5 seconds, the experiment will continue to the next item."
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
  "jwarn",
  newText(
    "<p>Practice done! Now, you are ready to start the experiment!" +
      "<ol><li>Read the completed sentences and rate them.</li>" +
      "<li>Some sentences may require more context. Rate sentences .</li></ol>" +
      "<br><br> If you are ready, click the button below to start the experiment. " +
      "You will be expected to judge sentences in less than 5 seconds."
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
    "jpractice",
    newText("sep", "*").css("font-size", "24pt").center().print(),
    newTimer("wait", 500).start().wait(),
    getText("sep").remove(),
    newController("FlashSentence", { s: row.sentence }).center().print().log(),
    newVar("RT")
      .global()
      .set(() => Date.now()),
    newTimer("hurry", jitemTimer).start(),
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
    getTimer("hurry").wait(),
    getVar("RT").set((v) => Date.now() - v),
    getVar("text").set(row.sentence),
    getVar("condition").set(row.condition),
    getVar("type").set(row.type),
    getVar("itemnum").set(row.itemnum),
    getVar("Is_definite").set(row.the),
    getVar("Is_modified").set(row.adj),
    getVar("Is_coordinated").set(row.and)
  )
);
// Exp
Template("from-comp-exp.csv", (row) =>
  newTrial(
    "jtrial",
    newText("sep", "*").css("font-size", "24pt").center().print(),
    newTimer("wait", 500).start().wait(),
    getText("sep").remove(),
    newController("FlashSentence", { s: row.sentence }).center().print().log(),
    newVar("RT")
      .global()
      .set(() => Date.now()),
    newTimer("hurry", jitemTimer).start(),
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
    getTimer("hurry").wait(),
    getVar("RT").set((v) => Date.now() - v),
    getVar("text").set(row.sentence),
    getVar("condition").set(row.condition),
    getVar("type").set(row.type),
    getVar("itemnum").set(row.itemnum),
    getVar("Is_definite").set(row.the),
    getVar("Is_modified").set(row.adj),
    getVar("Is_coordinated").set(row.and)
  )
);
// Frazier
Template("frazier.csv", (row) =>
  newTrial(
    "jfrazier",
    newText("sep", "*").css("font-size", "24pt").center().print(),
    newTimer("wait", 500).start().wait(),
    getText("sep").remove(),
    newController("FlashSentence", { s: row.sentence }).center().print().log(),
    newVar("RT")
      .global()
      .set(() => Date.now()),
    newTimer("hurry", jitemTimer).start(),
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
    getTimer("hurry").wait(),
    getVar("RT").set((v) => Date.now() - v),
    getVar("text").set(row.sentence),
    getVar("condition").set(row.condition),
    getVar("type").set(row.type),
    getVar("itemnum").set(row.itemnum),
    getVar("Is_definite").set(row.the),
    getVar("Is_modified").set(row.adj),
    getVar("Is_coordinated").set(row.and)
  )
);
// Filler
Template("from-comp-filler.csv", (row) =>
  newTrial(
    "jfiller",
    newText("sep", "*").css("font-size", "24pt").center().print(),
    newTimer("wait", 500).start().wait(),
    getText("sep").remove(),
    newController("FlashSentence", { s: row.sentence }).center().print().log(),
    newVar("RT")
      .global()
      .set(() => Date.now()),
    newTimer("hurry", jitemTimer).start(),
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
    getTimer("hurry").wait(),
    getVar("RT").set((v) => Date.now() - v),
    getVar("text").set(row.sentence),
    getVar("condition").set(row.condition),
    getVar("type").set(row.type),
    getVar("itemnum").set(row.itemnum),
    getVar("Is_definite").set(row.the),
    getVar("Is_modified").set(row.adj),
    getVar("Is_coordinated").set(row.and)
  )
);
// bye

newTrial(
  "jbye",
  newText("<p>Thank you for your participation!</p>")
                .center()
           .print()
    ,
    newText(
        "<p><a href='https://app.prolific.co/submissions/complete?cc=CGL623ZP'>Click here to confirm your participation on Prolific.</a></p>" +
        "<p>This is a necessary step in order for you to receive participation credit!</p>")
    .center()
    .print()
    ,
    newButton("void")
    .wait()
    )
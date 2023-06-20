# Packages ------
library(readr)
library(magrittr)
library(tidyverse)
library(dplyr)

# Read -----
fname_input <- "./generate_items/engItemList_LauLiao.csv"
fname_latin <- "./generate_items/balanced_latin.py"
fname_output_exp <- "./chunk_includes/ExpPreambles.csv"
fname_output_fil <- "./chunk_includes/FillerPreambles.csv"
fname_output_prac <- "./chunk_includes/PracticePreambles.csv"
lau <- read_csv(fname_input)
item_per_condition <- 32

# Functions ----
interleave_vectors <- function(vec1, vec2) {
  # given that two vectors have the same length
  c(rbind(vec1[1:length(vec1)], vec2[1:length(vec1)]))
}

make_cond_df <- function(vector, condition_name, the = TRUE, and = TRUE, adj = TRUE) {
  if (length(vector) > item_per_condition) {
    item_number <- rep(1:item_per_condition, each = 2)
  } else {
    item_number <- 1:item_per_condition
  }
  df <- data.frame(
    preamble = vector, itemnum = item_number, condition = condition_name,
    the, and, adj
  )
  df
}

add_the <- function(data) {
  if (grepl(" and ", data$preamble)[1]) {
    data %<>%
      separate(preamble, into = c("part1", "part2"), sep = " and ") %>%
      mutate(
        part1 = paste("the", part1),
        part2 = paste("the", part2),
        condition = paste0("the", condition),
        the = TRUE
      ) %>%
      unite(preamble, part1, part2, sep = " and ")

    data
  } else {
    data %<>%
      mutate(
        preamble = paste0("the ", preamble),
        condition = paste0("the", condition),
        the = TRUE
      )

    data
  }
}

# initial random selection -----
lau <- lau[sample(nrow(lau), item_per_condition, replace = FALSE, set.seed(8858)), ]

# make items -----
a <- interleave_vectors(lau$n1, lau$n2) %>% make_cond_df(., "BP", FALSE, FALSE, FALSE)

# randomly select one noun out of the two.
set.seed(8858)
a <- a %>%
  group_by(itemnum) %>%
  slice_sample(n = 1, replace = FALSE) %>%
  ungroup()

b <- paste0(lau$n1, " and ", lau$n2) %>% make_cond_df(., "BPand", FALSE, TRUE, FALSE)
c <- interleave_vectors(
  paste0(lau$adj1, " ", lau$n1),
  paste0(lau$adj2, " ", lau$n2)
) %>% make_cond_df(., "AdjBP", FALSE, FALSE, TRUE)

set.seed(8858)
c <- c %>%
  group_by(itemnum) %>%
  slice_sample(n = 1, replace = FALSE) %>%
  ungroup()
d <- paste0(
  paste0(lau$adj1, " ", lau$n1),
  " and ",
  paste0(lau$adj2, " ", lau$n2)
) %>% make_cond_df(., "AdjBPand", FALSE, TRUE, TRUE)

e <- add_the(a)
f <- add_the(b)
g <- add_the(c)
h <- add_the(d)

items <- bind_rows(a, b, c, d, e, f, g, h) %>%
  arrange(itemnum)
# View(items)

# balanced latin square ------
reticulate::source_python(fname_latin)
items$group <- rep(balanced_latin(8), (item_per_condition / 8))
# items$group <- latin[sort(c(seq_along(latin), seq(1, length(latin), 2)))]

# write to file ------
write_csv(items, fname_output_exp)


# Fillers------------------
rc_fillers <- data.frame(
  preamble = c(
  "The car that raced through the streets", 
  "The book that kept me up all night",
  "The dog that barked incessantly",
  "The tree that shaded the picnic area",
  "The city that never slept",
  "The city that buzzed with vibrant energy day and night",
  "The computer that crashed in a spectacular display of sparks",
  "The movie that mesmerized audiences with its breathtaking visuals",
  "The restaurant that delighted taste buds with tantalizing flavors",
  "The flower that bloomed like a radiant burst of sunshine"),
  condition = "filler",
  type = "rc"
  , check.rows = TRUE, check.names = TRUE)

name_fillers <- data.frame(
  preamble = c(
  "Sarah and John,",
  "Emily, Michael, and Samantha",
  "The Smith family",
  "David and Rebecca",
  "Mr. Johnson and his loyal assistant, Ms. Rodriguez",
  "The dynamic duo of Lucy and Max ",
  "Professor Thompson and his brilliant student, Alice",
  "The Johnson siblings, Ethan and Olivia ",
  "Jake, Lisa, and Alex ",
  "The Jones twins, Emma and Ethan"),
  condition = "filler",
  type = "name"
  , check.rows = TRUE, check.names = TRUE)

adjuncts <- data.frame(
  preamble = c(
  "On the golden sandy beach",
  "Amidst the vibrant city lights",
  "Within the serene garden oasis",
  "During a starry summer night",
  "Along the road",
  "In the misty mountain valley",
  "At the bustling market square",
  "Within the tranquil coastal village",
  "Underneath the trees",
  "Atop the rugged cliffside lookout"),
  condition = "filler",
  type = "adjunct"
  , check.rows = TRUE, check.names = TRUE)

whs <- data.frame(
  preamble = c(
  "Who holds the key",
  "Why the stars shine",
  "When the clock strikes",
  "Which path to choose",
  "Who is behind the mask",
  "Whom",
  "Whose coffee",
  "What to do after",
  "How can we mend",
  "What if you dare"),
  condition = "filler",
  type = "wh"
  , check.rows = TRUE, check.names = TRUE)

quantifiers <- data.frame(
  preamble = c(
  "All stars",
  "Some dreams",
  "Few opportunities",
  "Many voices",
  "Most challenges",
  "All eager eyes, filled with anticipation,",
  "Many passionate voices, echoing through the room,",
  "Several blissful moments, spent in each other's arms,",
  "Few precious chances, which had eluded them for so long,",
  "Most vivid dreams, which transported them to fantastical realms,"),
  condition = "filler",
  type = "quantifier"
  , check.rows = TRUE, check.names = TRUE)

ifs <- data.frame(
  preamble = c(
  "If time and money were no obstacles,",
  "If sentient robots roamed the Earth,",
  "If a portal to the Dune universe would open today,",
  "If artists from different eras collaborated with Billie Eilish,",
  "If the world was ruled by cats,",
  "If I could travel back in time, it would be the time when",
  "Were I to be the mayor of College Park,",
  "Were I to open a bakery shop,",
  "Were I to save someone from the past,",
  "Were I to relive yesterday,"),
  condition = "filler",
  type = "if"
  , check.rows = TRUE, check.names = TRUE)

corrs <- data.frame(
  preamble = c(
  "Whatever happened",
  "Wherever the party was",
  "Whoever was responsible",
  "Whichever path they chose"),
  condition = "filler",
  type = "correlative"
  , check.rows = TRUE, check.names = TRUE)

fillers <- bind_rows(
  rc_fillers, name_fillers, adjuncts, whs, quantifiers, ifs, corrs
) %>%
  mutate(itemnum = 1:nrow(.))


# write to file ------
write_csv(fillers, fname_output_fil)


# Practice Items ------------------

prac <- data.frame(
  preamble = c(
    "Blind artists",
    "If I drink more water,",
    "I am happy that I went to the doctor because",
    "That the kid cried constantly",
    "Lord of the rings is one of the"
  ),
  condition = "practice",
  itemnum = 1:5, check.rows = TRUE, check.names = TRUE
)

# write to file ------
write_csv(prac, fname_output_prac)

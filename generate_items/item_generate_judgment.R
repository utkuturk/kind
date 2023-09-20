library(tidyverse)
library(magrittr)
library(feather)
library(janitor)
library(stringr)
source("./analysis/0_scripts.R")

path_pilot = "./generate_items/results_pilot.csv"
path_pilot_results = "./generate_items/results_pilot_sum.csv"
path_fillers = "./judgment/chunk_includes/from-comp-filler.csv"
path_trials = "./judgment/chunk_includes/from-comp-exp.csv"
fname_latin <- "./generate_items/balanced_latin.py"

df <- read.pcibex(path_pilot)


# colnames
df$subject <- with(df, paste(Results.reception.time, MD5.hash.of.participant.s.IP.address)) %>%
  as.factor() %>%
  as.integer() %>%
  sprintf("S[%s]", .) %>%
  as.factor()

df %<>% dplyr::select(-Results.reception.time, -MD5.hash.of.participant.s.IP.address)

df %<>% filter(Label == "filler" | Label == "trial")
df %<>% filter( PennElementName == "answer")


df$Preamble %<>% as.factor()

df %<>% select(subject, Label, Preamble, Value, Condition, ItemNumber, Is_definite, Is_modified, Is_coordinated)

write_csv(df , path_pilot_results)

df_fillers = df %>%
  filter(Label == "filler") %>%
  select(subject, Condition, Type=ItemNumber, Preamble, Value)
#View(df_fillers)

df_trials = df %>%
  filter(Label == "trial") %>%
  select(-Label, -ItemNumber)
#View(df_trials)


###=====
# chose 32 trials
# chose 22 fillers
    # .log("type", row.type)
    # .log("condition", row.condition)
    # .log("itemnum", row.itemnum)
    # .log("Is_definite", row.the)
    # .log("Is_modified", row.adj)
    # .log("Is_coordinated", row.and)
    # .log("RT", getVar("RT"))
set.seed(123)
s_fillers = bind_rows(df_fillers %>%
  group_by(subject, Type, Preamble) %>%
  sample_n(1) %>%
  ungroup() %>%
  group_by(Preamble) %>%
  sample_n(1) %>% group_by(Type) %>% sample_n(3), df_fillers %>% sample_n(1))
s_fillers$Preamble %<>% gsub("%2C", ",", .)
s_fillers$Preamble[c(1,2,3)] %<>% paste0(., ",")

s_fillers$Value %<>% gsub("%2C", ",", .)
s_fillers$Value %<>% str_to_lower()
s_fillers$Value %<>% gsub("i ", "I ", .)
s_fillers$Value %<>% paste0(., ".")
s_fillers$Value %<>% gsub(" \\.", ".", .)
s_fillers$Value %<>% gsub("\\.\\.", ".", .)
s_fillers$Value %<>% gsub("\\?\\.", "?", .)
s_fillers$Value[c(19, 20, 21)] %<>% paste0(., "?")
s_fillers$Value %<>% gsub("\\?\\?", "?", .)
s_fillers$Value %<>% gsub("\\.\\?", "?", .)
s_fillers$Value %<>% str_replace(., "mr. bob's grocery store", "Mr. Bob's Grocery Store")
s_fillers$Value %<>% str_replace(., "queen", "Queen")
s_fillers$Value %<>% str_replace(., "mexico", "Mexico")

s_fillers %<>% ungroup() %>%
mutate(
  sentence = paste(Preamble, Value), itemnum = 1:n(),
  the = "filler", and = "filler", adj = "filler"
) %>%
select(sentence, type=Type, condition=Condition, itemnum, the, and, adj)

s_fillers %>% write_csv(path_fillers)


set.seed(123)
s_trials = df_trials %>%
group_by(subject, Condition) %>%
sample_n(1) %>%
ungroup() %>%
group_by(Condition) %>%
sample_n(4)

s_trials$Value %<>% gsub("%2C", ",", .) %<>% str_to_lower()
s_trials$Value %<>% paste0(., ".") %<>% gsub(" \\.", ".", .) %<>% gsub("\\.\\.", ".", .)
s_trials$Value %<>% str_replace(., "b y", "by")

s_trials %<>% ungroup() %>%
mutate(sentence = paste(Preamble, Value), itemnum = 1:n(), type = "trial") %>%
select(sentence, itemnum, condition=Condition,the=Is_definite,and=Is_coordinated, adj=Is_modified, type)
s_trials$sentence %<>% str_replace(., "Mosquitos ,", "Mosquitos,")


## balanced latin square ------
reticulate::source_python(fname_latin)
s_trials$group <- balanced_latin(8)[1:32]

s_trials %>% write_csv(path_trials)

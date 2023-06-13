# Packages ------
library(readr)
library(magrittr)
library(tidyverse)
library(dplyr)

# Read -----
fname_input <- "Downloads/engItemList_LauLiao.csv"
fname_latin <- "Downloads/balanced_latin.py"
lau <- read_csv(fname_input)


# Functions ----
interleave_vectors <- function(vec1, vec2) {
  # given that two vectors have the same length
  c(rbind(vec1[1:length(vec1)], vec2[1:length(vec1)]))
}

make_cond_df <- function(vector, condition_name, the=T, and=T, adj=T) {
  if (length(vector)>100) {
    item_number <- rep(1:100, each = 2)
  } else {
    item_number <- 1:100
  }
  df <- data.frame(
    preamble = vector, itemnum=item_number, condition=condition_name,
    the, and, adj
  )
  df
}

add_the <- function(data) {
  if (grepl(" and ", data$preamble)[1]) {
    data %<>%
      separate(preamble, into = c("part1", "part2"), sep = " and ") %>%
      mutate(part1 = paste("the", part1),
             part2 = paste("the", part2),
             condition = paste0("the", condition),
             the = T) %>%
      unite(preamble, part1, part2, sep = " and ")
    
    data
  } else {
    data %<>%
      mutate(preamble = paste0("the ", preamble),
             condition = paste0("the", condition),
             the = T)
    
    data
  }
}

# make items -----
a <- interleave_vectors(lau$n1, lau$n2) %>% make_cond_df(., "BP", F, F, F)
b <- paste0(lau$n1, " and ", lau$n2) %>% make_cond_df(., "BPand", F, T, F)
c <- interleave_vectors(
  paste0(lau$adj1, " ", lau$n1),
  paste0(lau$adj2, " ", lau$n2)
) %>% make_cond_df(., "AdjBP", F, F, T)
d <- paste0(
  paste0(lau$adj1, " ", lau$n1),
  " and ",
  paste0(lau$adj2, " ", lau$n2)
) %>% make_cond_df(., "AdjBPand", F, T, T)

e <- add_the(a)
f <- add_the(b)
g <- add_the(c)
h <- add_the(d)

items <- bind_rows(a,b,c,d,e,f,g,h) %>% 
  arrange(itemnum)

# balanced latin square ------

library(reticulate)
py_latin <- py_run_file(fname_latin)
latin <- py_latin$results
items$group <- latin[sort(c(seq_along(latin), seq(1, length(latin), 2)))]

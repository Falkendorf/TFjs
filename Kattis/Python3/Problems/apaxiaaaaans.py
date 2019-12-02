#! /usr/bin/python3

import sys

inpt = sys.stdin.readlines()
text = inpt[0]
output = text[0]
for i in range(len(text)-1):
    if text[i+1]!=output[len(output)-1]:
        output+=text[i+1]
print(output)

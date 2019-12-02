#! /usr/bin/python3

import sys

inpt = sys.stdin.readlines()
text = inpt[0]
days = 0
for c in range(len(text)//3):
    if text[c*3]!= 'P':
        days += 1
    if text[c*3+1]!= 'E':
        days += 1
    if text[c*3+2]!= 'R':
        days += 1
print(days)

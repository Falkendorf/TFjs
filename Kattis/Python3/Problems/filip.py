#! /usr/bin/python3

import sys

inpt = sys.stdin.readlines()
tmp = inpt[0].split()
a = int(tmp[0])
b = int(tmp[1])
rA = 0
rB = 0
while(a > 0):
    Reminder = a %10
    rA = (rA *10) + Reminder
    a = a //10
while(b > 0):
    Reminder = b %10
    rB = (rB *10) + Reminder
    b = b //10
if rA>rB:
    print(rA)
else:
    print(rB)

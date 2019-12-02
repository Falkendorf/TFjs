#! /usr/bin/python3

import sys

inpt = sys.stdin.readlines()
n = int(inpt[0])

for i in range(n):
    a = inpt[(i*2)+1]
    b = inpt[(i*2)+2]
    output = ''
    d = ''
    for c in range(len(a)-1):
        if a[c] == b[c]:
            output+='.'
        else:
            output+='*'
        d+=b[c]
    print(a+d)
    print(output)
    print('')

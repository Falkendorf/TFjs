#! /usr/bin/python3

import sys

for i in sys.stdin:
    abc = i.split()
    a = int(abc[0])
    h = a/2
    b = int(abc[1])
    c = int(abc[2])
    if (b>h):
        if(c>h):
            print(b*c*4)
        else:
            print(b*(a-c)*4)
    else:
        if(c>h):
            print((a-b)*c*4)
        else:
            print((a-b)*(a-c)*4)

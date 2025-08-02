#!/usr/bin/env python3
import sys

print(f"Arguments received: {' '.join(sys.argv[1:])}")
print(f"Number of args: {len(sys.argv) - 1}")
print(f"All args as list: {sys.argv[1:]}")
for i, arg in enumerate(sys.argv[1:], 1):
    print(f"Arg {i}: {arg}")
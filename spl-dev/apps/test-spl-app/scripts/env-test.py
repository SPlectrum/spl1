#!/usr/bin/env python3
import os
import sys

print(f"Current working directory: {os.getcwd()}")
print(f"Script location: {os.path.dirname(os.path.abspath(__file__))}")
print(f"Python version: {sys.version}")
print(f"Python executable: {sys.executable}")
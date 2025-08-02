#!/bin/bash
echo "Arguments received: $*"
echo "Number of args: $#"
echo "All args as array: $@"
for i in $(seq 1 $#); do
    echo "Arg $i: ${!i}"
done
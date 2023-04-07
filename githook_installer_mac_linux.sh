#!/bin/bash

# Define the location of the hooks directory
HOOKS_DIR=".git/hooks"

# Copy the hooks to the user's local hooks directory
cp -R hooks/* $HOOKS_DIR || { echo "Error: Failed to copy hooks to $HOOKS_DIR"; exit 1; }

# Make the hooks executable
chmod +x $HOOKS_DIR/* || { echo "Error: Failed to make hooks executable"; exit 1; }

echo "Hooks have been installed successfully!"

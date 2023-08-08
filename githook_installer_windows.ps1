# Powershell script to install git hooks

# Install Git hooks for the current repository

# Change to the repository root directory
cd $(git rev-parse --show-toplevel)

# Define the path to the hooks directory
HOOKS_DIR=$(git rev-parse --git-dir)/hooks

# Define the path to the pre-push script
PRE_PUSH_SCRIPT=$HOOKS_DIR/pre-push

# Create the hooks directory if it doesn't exist
if (!(Test-Path $HOOKS_DIR)) {
    mkdir $HOOKS_DIR
    if ($?) {
        echo "Hooks directory created successfully!"
    } else {
        echo "Error: Failed to create hooks directory."
        exit 1
    }
}

# Write the pre-push script
echo "#!/usr/bin/env powershell" > $PRE_PUSH_SCRIPT
echo "Write-Host 'Running pre-push hook!'" >> $PRE_PUSH_SCRIPT
echo "exit 0" >> $PRE_PUSH_SCRIPT

# Make the script executable
chmod +x $PRE_PUSH_SCRIPT
if ($?) {
    echo "Pre-push script made executable successfully!"
} else {
    echo "Error: Failed to make pre-push script executable."
    exit 1
}

echo "Git hooks installed successfully!"

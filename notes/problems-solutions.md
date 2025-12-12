# Problems & Solutions

## Problem: JSON file not opening due to syntax error
### Context
While creating users.json, VS Code showed red error markers.

### What I Tried
- Checked brackets
- Checked missing commas

### Final Fix
Added missing comma after "id" field and replaced single quotes with double quotes.

### Why It Worked
JSON requires strict syntax and does not allow single quotes or missing commas.

# Merge Conflicts — Understanding & Resolution

### What Causes Merge Conflicts?
- When two branches edit the same line of a file.
- When one branch deletes a file that another branch edits.
- When Git cannot automatically decide which version to keep.

### How Git Marks Conflicts
Git adds markers like this:

<<<<<< HEAD  
Your version  
======  
Incoming version  
>>>>>> branch-name

### How to Resolve Conflicts
1. Open the file with conflict markers.
2. Decide which changes to keep, or combine both versions.
3. Remove all the conflict markers.
4. Stage the resolved file:
   - `git add <file>`
5. Finish the merge:
   - `git commit`

### Tips to Avoid Conflicts
- Pull from main before starting work.
- Keep branches small and short-lived.
- Communicate with teammates during big changes.

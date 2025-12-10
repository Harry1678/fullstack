# Git & GitHub — Module Notes

### 1. Git Setup
- Configured Git globally with username and email.
- Initialized repository in the `fullstack` root directory.
- Created clean folder structure following bootcamp requirements.

### 2. GitHub Setup
- Generated SSH key (ed25519) and added public key to GitHub.
- Verified SSH connection using `ssh -T git@github.com`.
- Connected local repo to GitHub using SSH remote.

### 3. Git Basics Practiced
- Tracking changes with `git status`.
- Staging with `git add`.
- Creating commits with clear messages.
- Pushing to remote using `git push`.

### 4. Branching & Merging
- Created a feature branch for workflow updates.
- Made updates and merged back into `main`.
- Confirmed push and merge operations successfully.

### 5. .gitignore
- Added useful ignore patterns such as:
  - `node_modules/`
  - `.env`
  - `.DS_Store`
  - `*.log`
- This keeps the repository clean and prevents unwanted or sensitive files from being committed.

### 6. Releases
- Created a version tag `v0.1.0` to mark the first stable checkpoint of the repository.
- Pushed the tag to GitHub.
- This establishes a standard release workflow using semantic versioning.

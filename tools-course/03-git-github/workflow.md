# My Git Workflow

### 1. Daily Workflow
1. Make or update files in the working directory.
2. Run `git status` to check what changed.
3. Stage changes using:
   - `git add <file>` or  
   - `git add .` for small commits.
4. Commit the changes with a meaningful message:
   - `git commit -m "message"`
5. Push updates to GitHub using:
   - `git push`

### 2. Branching Workflow
1. Create a new branch for a feature:
   - `git checkout -b feature/<name>`
2. Work on changes inside the feature branch.
3. Stage and commit updates.
4. Push the branch to GitHub:
   - `git push -u origin feature/<name>`
5. Merge into main:
   - `git checkout main`
   - `git merge feature/<name>`
6. Push merged changes:
   - `git push`

### 3. Best Practices
- Keep commits small and clear.
- Always write meaningful commit messages.
- Pull changes frequently to avoid conflicts.
- Use branches for new features.
My daily Git workflow: edit → git status → git add → git commit → git push

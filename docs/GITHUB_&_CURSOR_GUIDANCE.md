# GitHub

## Setup Ruleset to Protect Main Branch

- Create a CODEOWNERS file in a .github folder in your repository listing your GitHub name as follows:

  <span style="color: red;">\# Jeremy must review changes before they are merged into master.</span>

  \* @JmmonJeremy

  <span style="color: red;">\# Only Jeremy can approve a change to this ownership policy.</span>
 
  \/.github/CODEOWNERS @JmmonJeremy

- While in the repository click on Settings

  ![Setting image](image.png)
- Click on the Rules drop-down arrow & select Rulesets

  ![Rules & Rulesets image](image-1.png)
- Enter a Ruleset Name & change Enforcement status to Active

  ![Ruleset Name & Enforcement status image](image-2.png)
- Add Repository admin Role to Bypass list

<img src="image-3.png" style="margin-left: 40px; margin-bottom: -6px;" alt="Bypass List Image" /> ![Add bypass image](image-7.png)
<img src="image-6.png" style="margin-left: 128px; margin-top: -11px;" alt="Repository admin role image" />
- Set Target branches to main branch name or Default

  ![Branch targeting image](image-8.png)
- Select the following rules

  ![Restrict deletions image](image-9.png)
  ![Require pull request image](image-10.png)
  ![Require CODE OWNERS review image](image-11.png)
  ![Block force push image](image-12.png)
- Save the ruleset

  ![Save changes image](image-13.png)

## Reviewing and approving pull requests

- Click the PR you want to review
- 

Show all local and remote branches: git branch -a
Switch to the remote branch for testing: 
git switch name-of-new-branch
or
git checkout name-of-new-branch

??? --track origin/cursor/customer-view-wireframe-884c
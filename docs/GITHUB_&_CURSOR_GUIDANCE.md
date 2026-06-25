# GitHub

## Setup Ruleset to Protect Main Branch

- Create a CODEOWNERS file in a .github folder in your repository listing your GitHub name as follows:  

  <span style="color: red;">\# Jeremy must review changes before they are merged into master.</span>  
  \* @JmmonJeremy

  <span style="color: red;">\# Only Jeremy can approve a change to this ownership policy.</span>   
  \/.github/CODEOWNERS @JmmonJeremy

- While in the repository click on Settings  
  ![Setting image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Ruleset/image.png)  
- Click on the Rules drop-down arrow & select Rulesets  
  ![Rules & Rulesets image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Ruleset/image-1.png)
- Enter a Ruleset Name & change Enforcement status to Active  
  ![Ruleset Name & Enforcement status image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Ruleset/image-2.png)
- Add Repository admin Role to Bypass list  
<img src="GITHUB_&_CURSOR_GUIDANCE_IMAGES/Ruleset/image-3.png" style="margin-bottom: -6px;" alt="Bypass List Image" /> ![Add bypass image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Ruleset/image-7.png)  
<img src="GITHUB_&_CURSOR_GUIDANCE_IMAGES/Ruleset/image-6.png" style="margin-left: 88px; margin-top: -11px;" alt="Repository admin role image" />
- Set Target branches to main branch name or Default  
  ![Branch targeting image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Ruleset/image-8.png)
- Select the following rules  
  ![Restrict deletions image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Ruleset/image-9.png)  
  ![Require pull request image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Ruleset/image-10.png)  
  ![Require CODE OWNERS review image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Ruleset/image-11.png)  
  ![Block force push image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Ruleset/image-12.png)  
- Save the ruleset  
  ![Save changes image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Ruleset/image-13.png)  

## Reviewing and approving pull requests

- Click on Pull requests link  
  ![Pull requests image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/PR/image-14.png)
- Click the PR you want to review  
  ![PR to review image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/PR/image-15.png)
- Click on the Files changed link  
  ![Files changed image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/PR/image-16.png)  
- Look at each file and check the Viewed box  
  ![Viewed box image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/PR/image-17.png)
  ![Checked Viewed box image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/PR/image-19.png)  
- Test the features locally using VS Code & its terminal
  - Show all local and remote branches: 
    - <span style="color: #cd70f2;">git branch -a</span>
  - Switch to the remote branch for testing: 
    - <span style="color: #cd70f2;">git switch name-of-new-branch</span>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;or  
    - <span style="color: #cd70f2;">git checkout name-of-new-branch</span>    
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;with this tag after to <br>&nbsp;&nbsp;create a new local branch  
    - <span style="color: #cd70f2;">--track origin/name-of-new-branch</span>
- Click on the Submit review drop-down arrow  
  ![Submit review image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/PR/image-20.png)  
- Make a comment,select Approve, and Submit review if good  
  ![Comment image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/PR/image-21.png)  
  ![Approve image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/PR/image-22.png)  
  ![alt text](GITHUB_&_CURSOR_GUIDANCE_IMAGES/PR/image-23.png)

# Cursor
## Separate Cursor Identity Overview
### Goal:  
- <span style="color: #57dd70;">My account</span> = Owner/Admin, can approve/merge
- <span style="color: #f3cf61;">Cursor account/token</span> = Write access, can push branches, cannot bypass main  
### Workflow:
- <span style="color: #f3cf61;">Cursor pushes branch</span> → <span style="color: #f3cf61;">Pull Request</span> → <span style="color: #57dd70;">I approve</span> → <span style="color: #57dd70;">I merge into main</span>

## Create a separate GitHub account for a separate identity for Cursor to use  
- Use Incognito tab, go to github.com, & click on the Sign up button  
  ![GitHub Sign up image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Cursor_Account/image.png)  
- Use a separate email & password and give it a name like jeremy-ai-work  
  ![email, password, & username image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Cursor_Account/image-1.png)  
- Deselect GitHub Copilot & click on the Create account button  
  ![create account image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Cursor_Account/image-2.png)  
- Do not create a new repository in the new for account Cursor

## Add the GitHub account for Curso to the repo as a collaborator with Write access
- In your regular GitHub account, in the repository you want Cursor working on, go to Settings  
  ![Settings image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Collaborator/image.png)
- Under the Access section click on the Collaborators link  
  ![Collaborators image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Collaborator/image-1.png)  
- Across from the 'Manage access' title click on the 'Add people' button  
  ![Manage access image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Collaborator/image-38.png)
  ![Add people image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Collaborator/image-2.png)  
- Add the username that was setup for Cursor's GitHub account & click on the Invite collaborator pop-up   
  ![Added username image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Collaborator/image-9.png)
  ![Invite image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Collaborator/image-12.png)
- Click the Add button after the match is found  
  ![Add button image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Collaborator/image-13.png)
- In the new Cursor GitHub account click on the new notification icon  
  ![Notification image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Collaborator/image-14.png)  
- Open the invitation and accept it  
  ![Invitation image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Collaborator/image-15.png)  
  ![Accept image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Collaborator/image-16.png) 
- Click the profile picture in the top right & click Settings  
  ![Profile picture image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Collaborator/image-17.png)  
  ![Settings image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Collaborator/image-18.png)  
- Scroll to the bottom of the left sidebar and click Developer settings  
  ![Developer settings image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Collaborator/image-19.png)
- Click the Personal access tokens drop-down button and select Tokens (classic)  
  ![Personal access tokens image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Collaborator/image-20.png)  
- Click on the Generate new token drop-down and select Generate new token (classic)  
  ![Generate drop-down image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Collaborator/image-21.png)  
  ![Generate image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Collaborator/image-22.png)
- Give it a name like Cursor Home-Gig Git access, set the Expiration as desired, and under Select scopes, check repo  
  ![Token form image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Collaborator/image-23.png)  
- Click the Generate token button & copy and record the token for use (keep the token private)  
  ![Generate button image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Collaborator/image-24.png)

## Have Cursor Desktop Use its Separate GitHub Account with a Clone of the Repository
- Open the downloaded version of Cursor and Clone the repository by clicking on the clone button  
  ![clone image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Clone/image.png)  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;or 
- In Powershell go to the folder where you want to keep projects and run the following command to clone the repository
  - <span style="color: #cd70f2;">git clone https://github.com/JmmonJeremy/Home-Gig.git name-for-Cursor-clone-of-repository</span>  
  ![Powershell image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Clone/image-2.png)  
- In Cursor open the cloned project by clicking on the Open project button and selecting the cloned project file  
  ![Open image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Clone/image-1.png)
- Open the Terminal in Cursor by clicking on the Terminal heading and selecting New Terminal   
  ![Terminal image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Clone/image-3.png)  
- Set the repository’s remote URL to use jeremy-ai-work as the optional username portion before @ with the following command
  - <span style="color: #cd70f2;">git remote set-url origin https://jeremy-ai-work@github.com/JmmonJeremy/Home-Gig.git</span> 
- To have Git Credential Manager include the repository path when looking up credentials with the following command
  - <span style="color: #cd70f2;">git config --local credential.useHttpPath true</span> 
- In the terminal configure git to be using Cursors GitHub account by running the following commands in the terminal
  - <span style="color: #cd70f2;">git config --local user.name "jeremy-ai-work"</span>
  - <span style="color: #cd70f2;">git config --local user.email "jeremy-ai-work email for GITHUB ACCOUNT"</span> 
- Create a new branch and switch to that branch with the following command
  - <span style="color: #cd70f2;">git checkout -b cursor/next-feature-1</span> 
- Verify you are on the new branch with the following command
  - <span style="color: #cd70f2;">git branch</span> 
- Create a simple file in the Home-Gig-Cursor folder like cursor-auth-test.txt and add the following into the file
  - <span style="color: #7088f2;">Testing GitHub authentication for the Cursor account.</span> 
- Add, commit, and push the test file to attempt to have Git Credential Manager ask for credentials with the following commands  
  - <span style="color: #cd70f2;">git add cursor-auth-test.txt</span>  
  - <span style="color: #cd70f2;">git commit -m "Test Cursor GitHub authentication"</span>
  - <span style="color: #cd70f2;">git push -u origin cursor/next-feature-1</span>
- When Git Credential Manager asks for credentials reply with the following
  - <span style="color: #7088f2;">Username: jeremy-ai-work</span>
  - <span style="color: #7088f2;">Password: Cursor classic token</span> 
- If Git Credential Manager does not ask for credentials then Open Windows Credential Manager using the following path
  - <span style="color: #f2b170;">Control Panel → Credential Manager → Windows Credentials → Generic Credentials</span>
- Remove only the GitHub credential that Git is currently using for github.com / this repository.
- Make a small change to the test file and commit, and push the test file to have GitHub ask for credentials with the following commands 
  - <span style="color: #cd70f2;">git commit -m "Test Cursor GitHub authentication 2nd attempt"</span>
  - <span style="color: #cd70f2;">git push -u origin cursor/next-feature-1</span>
- When Git Credential Manager asks for credentials reply with the following
  - <span style="color: #7088f2;">Username: jeremy-ai-work</span>
  - <span style="color: #7088f2;">Password: Cursor classic token</span> 
- After Cursor is setup with its own credentials then delete the file, commit the change, and push the deletion to clean things up with the following commands  
  - <span style="color: #cd70f2;">git rm cursor-auth-test.txt</span>  
  - <span style="color: #cd70f2;">git commit -m "Remove authentication test file"</span>
  - <span style="color: #cd70f2;">git push</span>

## Giving Cursor Directions

- Tell Cursor to do or follow the following:
  - only to work on what you want it to change
  - confirm it is working on the Git feature branch you want
  - the clear goal for the assignment
  - commit with a clear commit message
  - push the changes to the Cursor feature branch
  - create a pull request into the master branch 
  - not merge the pull request or bypass repository rules
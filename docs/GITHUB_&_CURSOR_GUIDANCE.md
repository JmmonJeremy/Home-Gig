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
      - Local branches appear without remotes/origin/.
      - GitHub branches appear with remotes/origin/.
  - If branch already exists locally, switch to the branch & get changes for testing with the following commands: 
    - <span style="color: #cd70f2;">git switch</span> <span style="color: #70bcf2;">name-of-new-branch</span>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;or 
    - <span style="color: #cd70f2;">git checkout</span> <span style="color: #70bcf2;">name-of-new-branch</span>    
    - <span style="color: #cd70f2;">git pull</span>  
  - If branch is only in GitHub, switch to the remote branch for testing with the following commands:  
    - <span style="color: #cd70f2;">git switch --track origin/</span><span style="color: #70bcf2;">name-of-new-branch</span>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;or  
    - <span style="color: #cd70f2;">git checkout --track origin/</span><span style="color: #70bcf2;">name-of-new-branch</span>   
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
- Click the Generate token button 
  ![Generate button image](GITHUB_&_CURSOR_GUIDANCE_IMAGES/Collaborator/image-24.png)  
- Immediately <span style="color: #70f293;">copy and record the token</span> for use (keep the token private <span style="color: #ff7070;">in</span> the backend's <span style="color: #ff7070;">.env file</span>)
  - NOTE - after you leave the page you will not be shown the token again!!! 

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
  - <span style="color: #cd70f2;">git config --local credential.username jeremy-ai-work</span>
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
- Set Cursor up to have the cloned Home-Gig-Cursor repository file have its own GitHub CLI login for pull requests
 - Open a terminal in the cloned repository folder - for example the terminal path ends with ...\Home-Gig-Cursor
 - At the root of cloned repository folder, ie. Home-Gig-Cursor, create a file named while in the master branch <span style="color: #70f293;">start-cursor-gh.ps1</span>
 - In the <span style="color: #70f293;">start-cursor-gh.ps1 file</span>, add the following content:  
   - <span style="color: #fcfcc4;">$env:GH_CONFIG_DIR = "$PSScriptRoot\.gh-config"</span>
   - <span style="color: #fcfcc4;">gh auth status</span> 
 - In your original local repository, ie. the Home-Gig folder <span style="color: #70f293;">.gitignore file</span>, add the following content:
   - <span style="color: red;">\# Local GitHub CLI configs for AI tool clones</span>  
   - <span style="color: #fcfcc4;">.gh-config/</span>
   - <span style="color: #fcfcc4;">start-cursor-gh.ps1</span>
- In the cloned repository folder, ie. Home-Gig-Cursor, pull the change to the .gitignore file while in the master branch
- To setup a separate GitHub CLI config folder for Cursor's repository, in its terminal, ie. showing Home-Gig-Cursor run the following command
  - <span style="color: #cd70f2;">.\start-cursor-gh.ps1</span>  
    - The first time, it will say "You are not logged into any GitHub hosts"
    - To do a one-time log in with approved GitHub CLI authorization enter the command
      - <span style="color: #cd70f2;">gh auth login</span> 
      - Choose:
        - <span style="color: #7088f2;">GitHub.com</span>
        - <span style="color: #7088f2;">HTTPS</span>
        - <span style="color: #7088f2;">Authenticate with a web browser</span>
      - When the browser opens, sign in as:
        - GitHub username for Cursor, ie. <span style="color: #7088f2;">jeremy-ai-work
      - <span style="color: #7088f2;">Approve</span> the GitHub CLI authorization
- Verify the Cursor login with the following command
  - <span style="color: #cd70f2;">gh auth status</span>    
  - If done correctly the results should indicate:
    - Logged in to github.com account jeremy-ai-work
    - Active account: true    
- In the cloned repository folder, ie. Home-Gig-Cursor, switch back to a feature branch, to ensure no other work is done on the master branch.

## Giving Cursor Directions

- Tell Cursor to do or follow the following:  
  - start from master and pull the latest changes from origin/master  
  - create and work on a new branch with the name you want   
  - confirm it is working on the Git feature branch you want  
  - only to work on what you want it to change on that branch  
  - the clear goal for the assignment  
  - commit with a clear commit message  
  - push the changes to the Cursor feature branch  
  - before using any gh command, run .\start-cursor-gh.ps1  
  - confirm that jeremy-ai-work is the active account before creating or updating a pull request  
  - create a pull request into the master branch  
  - do not merge the pull request or bypass repository rules  
- Upload any images or PDFs that will help or reference them in the repository  

## <span style="color: #ffff00;">Cursor Directions</span> &nbsp; &nbsp; <span style="color: red;">⟹</span> &nbsp; &nbsp; <span style="color: #ffff00;">Template Guide to Follow</span> :

Create and work on a new branch named <span style="color: #7088f2;">cursor/</span><span style="color: #fcfcc4;">ThingBeingDone</span><span style="color: #7088f2;">-feature</span>. Like: <span style="color: #70bcf2;">cursor/searchbar-feature</span>

<p style="margin-bottom: 0;">Before changing anything:  </p>

1. Start from master.</span>  
2. Pull the latest changes from origin/master.  
3. Create or switch to the branch <span style="color: #70bcf2;">cursor/searchbar-feature</span> from the updated master.  
4. Confirm the current Git branch is <span style="color: #70bcf2;">cursor/searchbar-feature</span>.
5. Inspect the <span style="color: #fcfcc4;">documents you specify to give guidance</span>. 
6. Tell me which files you plan to change before editing & don't proceed until I tell you to continue. 

Goal:  
<span style="color: #fcfcc4;">Give the clear purpose of the work</span>. Like:  
Make the existing top-header search bar functional across the app.

<p style="margin-bottom: 0;">Important Guidelines:  </p>

- Do not perform refactoring, formatting-only changes, dependency updates, or cleanup outside the files required for this task. 
- If the wireframe or requirements are ambiguous, stop and ask for clarification instead of making assumptions. 
- Before committing, explain the reasoning behind each significant code change so I can understand what was modified and why.

<p style="margin-bottom: 0;">Functional requirements:  </p>
<p style="margin-bottom: 0;"><span style="color: #fcfcc4;">List the functional requirements desired</span>. Like:  </p>
   
* Product & Inventory Management page: search/filter by Product, Inventory, or Price fields if available.  
* Customer Management page: search/filter by Customer, Phone Number, Email, or Notes fields if available.  
* Orders & Payment Management page: search/filter by Order #, Customer, Order Date, Order Summary, Payment Status, or Payment Date fields if available.  

<p style="margin-bottom: 0;"><span style="color: #fcfcc4;">List for Special Behaviors</span>. Like:  </p>
<p style="margin-bottom: 0;">Dashboard & Spreadsheet Export & Reporting pages search behavior:   </p>

* When the user clicks inside the Dashboard search bar, show a dropdown list of searchable categories/pages, such as Products, Customers, Orders, and Reports.
* When the user selects a category/page, navigate to that page.
* After navigation, place the cursor/focus in the search bar.
* Carry the search text to that destination page if text was already typed, and perform the search there.
* If no text was typed yet, just navigate and focus the search bar on the selected page.

<p style="margin-bottom: 0;">Design requirements: </p>
<p style="margin-bottom: 0;"><span style="color: #fcfcc4;">List the design requirements desired</span>. Like:  </p>

* Keep the existing header layout and visual style.
* Do not redesign the header.
* Use Bootstrap as much as possible.
* Make the search behavior usable on desktop and mobile.

<p style="margin-bottom: 0;">Code requirements:  </p>
<p style="margin-bottom: 0;"><span style="color: #fcfcc4;">List the code requirements desired</span>. Like:  </p>

* Use the existing Angular project conventions.
* Do not change authentication logic.
* Do not change backend code unless absolutely necessary.
* Do not change unrelated files.
* Avoid over-engineering; prefer simple frontend filtering if it fits the current app.

<p style="margin-bottom: 0;">After implementation:  </p>

1. Run the relevant build/test command.
2. Summarize the changed files.
3. Summarize how search works on each page.
4. Commit the completed changes with a clear commit message.
5. Push the changes to <span style="color: #70bcf2;">cursor/searchbar-feature</span>.

<p style="margin-bottom: 0;">Before using any gh command:  </p>

1. Run: .\start-cursor-gh.ps1  
2. Then run: gh auth status  
3. Confirm that jeremy-ai-work is the active account before creating or updating a pull request.  

<p style="margin-bottom: 0;">Then:  </p>

1. Create a pull request from <span style="color: #70bcf2;">cursor/searchbar-feature</span> into master.
2. Do not merge the pull request or bypass repository rules.
3. Return the pull request URL when finished.

## <span style="color: #ffff00;">Copy & Paste Styling Directions</span> &nbsp; &nbsp; <span style="color: red;">⟹</span> &nbsp; &nbsp; <span style="color: #ffff00;">Template</span> for <span style="color: #70bcf2;">Cursor or Codex</span> :
Home Gig - Mobile Reports View
Important Guidelines
1. Do not perform refactoring, formatting-only changes, dependency updates, or cleanup outside the files required for this task.
2. If the wireframe or requirements are ambiguous, stop and ask for clarification instead of making assumptions.
3. Before committing, explain the reasoning behind each significant code change so I can understand what was modified and why. 

Git Setup
1. Start from the local master branch.
2. Pull the latest changes from origin/master.
3. Create and switch to a new branch named: codex/mobileReports-view
4. Confirm the current Git branch is: codex/mobileReports-view

Before Making Any Changes
1. Inspect the following files before editing anything:
docs/wireframes/6.1_Spreadsheet_Export_&_Reporting_Mobile_Wireframe.png
docs/Home_Gig_Requirements_Specification.docx
2. If docs/Home_Gig_Requirements_Specification.docx is too large or difficult to parse, use the wireframe as the primary visual source and report what parts of the requirements file could not be read.
3. Then inspect the current Reports implementation and identify every file that would need to change.
4. If any file other than reports.css and reports.html needs to be modified:
    Stop.
    1. List every file you believe needs to change.
    2. Explain why each file needs to change.
    3. Wait for my approval before making any edits.
    4. Do not begin editing until I explicitly tell you to continue.

Goal
Update only the mobile view of the Reports page so that it matches the supplied mobile wireframe as closely as practical. The desktop Reports view must remain visually and functionally unchanged.

Design Requirements
1. Follow the supplied wireframe.
2. Preserve the existing visual style.
3. Do not redesign the application.
4. Reuse the existing colors, typography, spacing, icons, and components whenever possible.
5. Use Bootstrap utility classes and responsive classes whenever practical instead of custom CSS.
6. Prefer responsive Bootstrap classes over media-query-heavy custom CSS.
7. Only add custom CSS when Bootstrap cannot accomplish the layout.
8. Do not introduce new UI libraries.

Functional Requirements
1. The page should function exactly as it currently does.
2. Do not: change routing, change navigation behavior, change authentication, change business logic, change API calls, change backend code
3. Only adjust the responsive presentation of the Reports page.

Code Requirements
1. Follow the existing Angular project conventions.
2. Keep the code consistent with the rest of the project.
3. Make the smallest changes necessary.
4. Do not: rename files, move files, modify unrelated files.
5. Do not create new components unless absolutely necessary.
6. Remove any unused code you introduce.
7. Do not leave commented-out code.

Validation
After implementation:
1. Run the appropriate Angular build.
2. Verify there are no build errors.
3. Verify the desktop Reports page still appears unchanged.
4. Verify the mobile Reports page matches the supplied wireframe as closely as practical.

Deliverables
Provide:
1. a summary of every changed file
2. a summary of the changes made
3. any assumptions or compromises that were necessary
4. confirmation that the desktop layout was preserved
5. confirmation that the application builds successfully 

Git
1. Commit the completed work using a descriptive commit message.
2. Push the branch: codex/mobileReports-view

GitHub Authentication
1. Before using any gh command, run: .\start-codex-gh.ps1
2. Then verify that the active GitHub account is: jeremy-ai-work
3. If it is not, stop and report the problem.

Pull Request
1. Create a pull request from: codex/mobileReports-view into: master
2. Do not merge the pull request.
3. Do not bypass any repository rules.
4. Return the pull request URL when finished.

# Start Commands
## Angular
- <span style="color: #cd70f2;">ng serve</span>
## Node.js
- <span style="color: #cd70f2;">nodemon server.js</span>
## Go
- <span style="color: #cd70f2;">go run main.go</span>

# Checkup Commands
## GitHub
- To find out what he remote URL is:
  - <span style="color: #cd70f2;">git remote -v</span>
- To find out the preferred credential username
  - <span style="color: #cd70f2;">git config --local --get credential.username</span>
- To find out the commit author name
  - <span style="color: #cd70f2;">git config --local --get user.name</span>
- To find out the commit author email
  - <span style="color: #cd70f2;">git config --local --get user.email</span>
- To find out what branch you are on and its status
  - <span style="color: #cd70f2;">git status</span>
- To check out a branch locally & test the features using VS Code & its terminal
  - Show all local and remote branches: 
    - <span style="color: #cd70f2;">git branch -a</span>
  - Switch to the remote branch for testing: 
    - <span style="color: #cd70f2;">git switch name-of-new-branch</span>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;or  
    - <span style="color: #cd70f2;">git checkout name-of-new-branch</span>    
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;with this tag after to <br>&nbsp;&nbsp;create a new local branch  
    - <span style="color: #cd70f2;">--track origin/name-of-new-branch</span>
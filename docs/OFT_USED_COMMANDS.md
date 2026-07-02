# Start Commands
## Angular
### Development Environment
- <span style="color: #cd70f2;">ng serve</span>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;or
- <span style="color: #cd70f2;">npm start</span>
### Production Environment
- <span style="color: #cd70f2;">npm run build</span>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;or
- <span style="color: #cd70f2;">ng build</span>
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

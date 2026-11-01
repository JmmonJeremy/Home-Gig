# Start Commands
## Angular
### Development Environment— Port 4200
Run from the frontend directory:
- <span style="color: #cd70f2;">ng serve</span>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;or
- <span style="color: #cd70f2;">npm start</span>
### PWA Local Testing — Port 8085 . . . Add
Run from the frontend directory:
- <span style="color: #cd70f2;">ng build --configuration "production,pwa-local-testing"</span><br> 
( Uses Production for Service Workers to be Enabled. )<br> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&
<p style="margin-bottom:-.25rem; margin-left:3rem; margin-top:-.75rem">Then start the local testing server from the frontend directory:</p>

- <span style="color: #cd70f2;">npx http-server -p 8085 -c-1 dist/Home-Gig/browser</span>

#### <u>To have Chrome simulate a disconnected network for the application:</u>
Set the Network tab to Offline in ChromeDeveloper Tools:
1. <span style="color: #70c7f2;">Open your local Home Gig PWA.</span>
2. <span style="color: #70c7f2;">Open Chrome Developer Tools</span>
   - <span style="color: #cd70f2;">F12</span><br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;or
   - <p style="color: #cd70f2; margin-bottom:-.75rem">Ctrl + Shift + I</p>
3. <span style="color: #70c7f2;">Change Network to Offline</span>   
   - <span style="color: #cd70f2;">Select <b>Network tab</b></span>
   - <span style="color: #cd70f2;">Select <b>dropdown list</b> labeled <b>No throttling</b>.</span>
   - <span style="color: #cd70f2;">Select <b>Offline</b></span>
#### <u>To have the PWA reflect any local changes made do the following:</u>
Rerun from the frontend directory:
- <span style="color: #cd70f2;">ng build --configuration production,pwa-local-testing</span>
1. <span style="color: #70c7f2;">Open your local Home Gig PWA.</span>
2. <span style="color: #70c7f2;">Go to Developer Tools → Application → Service workers.</span>
3. <span style="color: #70c7f2;">Click Update.</span>
4. <span style="color: #70c7f2;">Close all open windows of the local PWA.</span>
5. <span style="color: #70c7f2;">Reopen Home Gig local version of the PWA.</span>
#### <u>Additional Caution</u>
<span style="color: #c84040;">Avoid rebuilding while http-server is actively serving requests, if possible, because Angular may temporarily remove and recreate the build files.</span>

If you encounter intermittent missing-file errors during a rebuild:
1. <span style="color: #70c7f2;">To stop the server, in the frontend directory:</span>
   - <span style="color: #cd70f2;">Ctrl + C</span>
2. <span style="color: #70c7f2;">To rebuild, in the frontend directory:</span>
   - <span style="color: #cd70f2;">ng build --configuration production,pwa-local-testing</span><br> 
3. <span style="color: #70c7f2;"> To restart the http-server local testing server again:</span>
   - <span style="color: #cd70f2;">npx http-server -p 8085 -c-1 dist/Home-Gig/browser</span>
### Production Environment
- <span style="color: #cd70f2;">npm run build</span>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;or
- <span style="color: #cd70f2;">ng build</span>
## Node.js
### Development Environment — Port 3000
- <span style="color: #cd70f2;">nodemon server.js</span>
#### <u>To reflect any local changes made to Node.js code do the following:</u>
    When running Node.js with nodemon, the server normally restarts automatically whenever you save changes to monitored backend files.

<span style="color: #c84040; margin-left:1.75rem;">If nodemon does not restart automatically:</span>
1. <span style="color: #70c7f2;">In the backend-node terminal running nodemon, to restart enter the following:</span>
   - <span style="color: #cd70f2;">rs</span> <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;or<br>
<!-- Separate the two lists -->
1. <span style="color: #70c7f2;">Stop the server, in the backend-node directory:</span>
   - <span style="color: #cd70f2;">Ctrl + C</span>
2. <span style="color: #70c7f2;">Restart the server, in the backend-node directory:</span>
   - <span style="color: #cd70f2;">nodemon server.js</span>

<span style="color: #c84040; margin-left:1rem;"><b><u>Note</u>:</b></span>
<p style="margin-left:1rem; margin-top:-1.5rem"><i>If you change environment variables in your .env file, manually restart the server with one of the options above to ensure the updated values are loaded.</i></p>

## Go
### Development Environment — Port 8080
Run from the go-service directory:
- <span style="color: #cd70f2;">go run main.go</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;or . . . to run the complete Go package in the go-service directory:
- <span style="color: #cd70f2;">go run .</span><br> 
<span style="color: #70f2a2; margin-left:1.5rem;"><b>Recommended Command</b></span><br><span style="color: #70f2a2; margin-left:1.5rem;">- Because it includes all applicable Go source files in the package.</span>
#### <u>To reflect any local changes made to Go code do the following:</u>
1. <span style="color: #70c7f2;">Stop the server, in the go-service directory:</span>
   - <span style="color: #cd70f2;">Ctrl + C</span>
2. <span style="color: #70c7f2;">Restart the server, in the go-service directory:</span>
   - <span style="color: #cd70f2;">nodemon server.js</span>
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

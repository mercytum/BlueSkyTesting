## Github Actions CI/CD Pipeline Setup

### How it works?
#### Whenever a pull request (PR) or a commit to the 'main' branch is initiated, the Github Actions CI/CD pipeline runs the Playwright Tests.yml which house all of the job configurations.
#### Once triggered the pipeline:
###### 1. Starts by setting a maximum time limit for which the entire pipeline should be completed (i.e. 1hr). After that 1hr limit, the pipeline is programmed to stop the job(s) running if not yet completed
###### 2. Setup it's virtual env runner to use the latest version of ubuntu
###### 3. Checks out the git repo
###### 4. Setup Node.js using version 20 (compatible version to enable yarn to run)
###### 5. Installs the yarn dependencies (globally) and runs the yarn package manager
###### 6. Installs the Playwright Browsers (chromium, webkit, firefox) with associated dependencies
###### 7. Runs the playwright tests listed within the __test__/lib directory
###### 8. Uploads the playwright test results as an artifact (i.e. zip file) to the job summary, if the job was not cancelled. Keeps the artifact for 30 days
###### 9. Load test report history
###### 10. Build Allure Test Report using Github Pages
###### 11. Deploys Allure Test Report on Github Pages using 'gh-pages' branch, placing the reports within a dedicated directory called 'allure-history'

***

### How to run CI/CD Pipeline?
##### [Option 1] Commit a change to the 'main' branch 
##### [Option 2] Create a 'pull request' to the 'main' branch
##### [Option 3] Click the manual 'Run workflow' button for the 'Playwright Test' named workflow

***

## How to run Locally (without CI/CD Pipeline)?
#### Prerequisites:
###### 1. Ensure VS Code (v1.97.1 or later) is installed on your local machine (https://code.visualstudio.com/download)
###### 2. Ensure Node (v20 or later) is installed on your local machine (https://nodejs.org/en/download)
###### -- run node -v (verify installation success)
###### 3. Ensure yarn (v1.22.22) is installed on your local machine (https://classic.yarnpkg.com/lang/en/docs/install/)
###### -- run npm install --global yarn
###### -- run yarn --version (verify installation success)
###### 4. Ensure npm Dotenv is installed (https://www.npmjs.com/package/dotenv)

#### Setup Project:
###### 1. Git clone this repo
###### 2. Open the clone repo project within VS Code
###### 3. Within the root of cloned project, navigate to the .env file and add your bluesky account password to the BS_PASSWORD variable and bluesky username to the BS_USERNAME variable and save the file

###### 4. Navigate to each test file within the __tests_/lib/Playwright directory and change the following: 
###### 'const BSKY_EMAIL = process.env.SECRET_USR;' to 'const BSKY_EMAIL = process.env.BS_USERNAME;'
######'const BSKY_PASS = process.env.SECRET_PWD;' to 'const BSKY_PASS = process.env.BS_PASSWORD;'

###### and add 'import dotenv from 'dotenv';' to the top of the .ts files (all of them).

###### 5. Save the files

#### Run the Tests:
###### 1. Open terminal within VSCode and run "yarn" to install dependencies
###### 2. Run "yarn web" to start local server instance and note the localhost url plus port being used to run the application
###### 3. Open the playwright.config.ts file and set the webserver url attribute to equal the url indicated in Step 7 (in most cases it will run on http://127.0.0.1:19006)
###### 4. Save changes within the playwright.config.ts file
###### 5. Open another terminal instance, and run the following cmd: npx playwright test
###### 6. [Optional] you can run the tests with parallelization by adding '--workers=3' 

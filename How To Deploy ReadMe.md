## Github Actions CI/CD Pipeline

### How it works?
#### Whenever a pull request (PR) or a commit to the 'main' branch is initiated, the Github Actions CI/CD pipeline runs the Playwright Tests.yml which house all of the job configurations.
#### Once triggered the pipeline:
##### 1. Starts by setting a maximum time limit for which the entire pipeline should be completed (i.e. 1hr). After that 1hr limit, the pipeline is programmed to stop the job(s) running if not yet completed
##### 2. Setup it's virtual env runner to use the latest version of ubuntu
##### 3. Checks out the git repo
##### 4. Setup Node.js using version 20 (compatible version to enable yarn to run)
##### 5. Installs the yarn dependencies (globally) and runs the yarn package manager
##### 6. Installs the Playwright Browsers (chromium, webkit, firefox) with associated dependencies
##### 7. Runs the playwright tests listed within the __test__/lib directory
##### 8. Uploads the playwright test results as an artifact (i.e. zip file) to the job summary, if the job was not cancelled. Keeps the artifact for 30 days
##### 9. Load test report history
##### 10. Build Allure Test Report using Github Pages
##### 11. Deploys Allure Test Report on Github Pages using 'gh-pages' branch, placing the reports within a dedicated directory called 'allure-history'

***

### How to run CI/CD Pipeline?
#### 1. Commit a change to the 'main' branch or create a 'pull request'

***

### How to run Locally (without CI/CD Pipeline)?
#### Prerequisites:
##### 1. Ensure VS Code (v1.97.1 or later) is installed on your local machine 
##### 2. Git clone this repo
##### 3. Open the clone repo project within VS Code
##### 4. Within VS Code Extensions, install the 'Playwright Test for VSCode by Microsoft" (v1.1.13 or later)
##### 5. Enable the plugin once installed
##### 6. 

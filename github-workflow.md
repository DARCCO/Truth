#GIT Workflow

###SETUP

*** DO DOT --FORCE ANYTHING ***

1) FORK and CLONE from the master repo on our organization's profile.

2) A dev branch should be available. If it doesn't show up, it's actually there - you jut can't see it. Switch to it with `git checkout dev`. Use `git branch` to see all the branches.

###WORKFLOW

0) Make sure you set upstream: `git remote add upstream 'upstream html'`

1) before working on any branches, type `git pull --rebase upstream dev` to make sure you are working with the most recent, up to date, version. This requires you to already have the upstream set.

2) visit the branch of the feature you want to work on, or create a new branch `git checkout -b *branchname*`

3) BUILD, TEST, BUILD, TEST

4) `git add .` , `git commit -m ""` 

5) ONLY WHEN YOU HAVE A FINISHED PRODUCT, AND SOMEONE ELSE HAS TESTED, Push to the feature branch: `git push origin *branchname*`

6) Get back to the dev branch `git checkout dev`

7) Rebase again: `git pull --rebase upstream dev`

8) Merge the branch: `git merge *branchname*`

9) Deal with the merge conflicts, if there are any, and `git push origin dev`

**Message Scrum Master on Slack before moving on!**

10) AFTER ALL THIS, and ONLY after, submit pull request to the dev branch on the Github website... REMEMBER TO CHANGE BRANCH FROM MASTER TO DEV BRANCH!!!


###Keywords used on all commits!!!

  [Progress] - means an ongoing update

  [Add] - added something small that is complete

  [Delete] - deleted something

  [Feature] - an entire feature with ample value is complete

  [Update] - updated something to make it better

  [Refactor] - code does the same thing but it is better code

  [Docs] - changed the readme/gitignore



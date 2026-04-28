@echo off
echo Starting Git setup...

cd /d "E:\Project Code\wedcard-pro"

echo Initializing Git...
git init

echo Adding files...
git add .

echo Committing...
git commit -m "Initial commit: Full WedCard Pro application"

echo Adding remote repository...
git remote add origin https://github.com/ta474314/wedcard-pro.git

echo Pushing to GitHub...
git push -u origin master

echo Done!
pause
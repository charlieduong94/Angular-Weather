# this "script" automates the deployment process and does what I need to 
# prepare a zip for the Chrome Web Store 
import shutil, os, sys

# check to see if current version is greater than 2.7 (means it supports the right shutil functions)
currentVersion = sys.version_info
requiredVersion = (2,7)
if(currentVersion >= requiredVersion):
	# remove old target if needed
	if(os.path.exists(os.getcwd() + "/angular-weather.zip")):
		print("Removing old target zip")
		os.remove(os.getcwd() + "/angular-weather.zip")
	targetDir = os.getcwd() + "/target"
	print("Creating new target")
	shutil.copytree(os.getcwd(), "target")
	os.chdir(targetDir)
	# remove all junk that isn't needed
	print("Cleaning target or useless junk")
	shutil.rmtree(os.getcwd() + "/node_modules")
	shutil.rmtree(os.getcwd() + "/test")
	os.remove(os.getcwd() + "/karma.conf.js")
	os.remove(os.getcwd() + "/deploy.py")
	os.chdir(os.pardir)
	# archive target into a zip for publishing
	print("Archiving Target into angular-weather.zip")
	shutil.make_archive("angular-weather", "zip", targetDir)
	# remove temporary target dir
	print("Cleaning Directory")
	shutil.rmtree(targetDir)
	print("Done!")
else:
	print("You need to run this using python version 2.7 or higher")
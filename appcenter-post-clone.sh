#!/usr/bin/env bash
set -ex
brew uninstall node@6
NODE_VERSION="8.9.4"
curl "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}.pkg" > "$HOME/Downloads/node-installer.pkg"
sudo installer -store -pkg "$HOME/Downloads/node-installer.pkg" -target "/"

#!/usr/bin/env bash
CUR_COCOAPODS_VER=`sed -n -e 's/^COCOAPODS: \([0-9.]*\)/\1/p' ios/Podfile.lock`
ENV_COCOAPODS_VER=`pod --version`

# check if not the same version, reinstall cocoapods version to current project's
if [ $CUR_COCOAPODS_VER != $ENV_COCOAPODS_VER ];
then
    echo "Uninstalling all CocoaPods versions"
    sudo gem uninstall cocoapods --all --executables
    echo "Installing CocoaPods version $CUR_COCOAPODS_VER"
    sudo gem install cocoapods -v $CUR_COCOAPODS_VER
else 
    echo "CocoaPods version is suitable for the project"
fi;


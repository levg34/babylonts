PROJECT_NAME=my-babylonts-project # project name
PACKAGE_MANAGER=pnpm # npm yarn pnpm
BABYLONTS_VERSION=v1.1.1

git clone --depth 1 --branch $BABYLONTS_VERSION https://github.com/levg34/babylonts.git $PROJECT_NAME
cd $PROJECT_NAME
rm -rf .git
$PACKAGE_MANAGER install

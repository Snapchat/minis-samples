# minis-samples

[Snap Minis](https://minis.snapchat.com/) are bite-size utilities made for friends. They’re built with HTML5, so they’re easy to develop. 
Plus, they work for all Snapchatters, on any kind of device, with no installation required.

This repo contains sample Snap Minis built using [Create React App](https://create-react-app.dev/docs/getting-started) and Typescript.
Snap Minis do not need to be built with Create React App or Typescript. Any web framework that bundles the entire application into a single HTML5 bundle can be used.

These samples serve as a guide for developers to quickly get started building their Snap Mini. Please consult or our [docs](https://docs.snap.com/minis/getting-started/home/) if you have any questions not answered in this readme.

## Setup
```
git clone git@github.sc-corp.net:Cognac/minis-samples.git ~/Dev/minis-samples

cd ~/Dev/minis-samples
npm install --ws
```

These common commands will work from any mini under `minis`. For sample, you can `cd minis/sample` and run `npm start` to run the sample mini on your localhost:3000.
```
npm start                      # run on localhost:3000
npm run minis:create
npm run minis:release -- -b <build id>
npm run minis:target -- -r <release> -u <Snapchat usernames>
```

The build version and release name is by default the current unix time. The build notes are the git hash with the current git user. These can be overridden by passing additional args to snapdev.
```
npm run minis:create -- -v <version> -n <notes>
npm run minis:release -- -b <build id> -n <name>
```

Minis npm scripts (e.g. minis:create) require snapdev CLI. It can be installed [here](https://docs.snap.com/minis/downloads).

### Troubleshooting

If node version is old or is not installed, then use nvm to install the latest long term support version.
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install --lts
```

Make sure that your npm is pointing to the version from node installed above.
```
which npm
~/.nvm/versions/node/v16.14.2/bin/npm
```

## Create a new mini
1. Create a new project in the [Snap Developer Portal](https://kit.snapchat.com/manage/)
2. Run the following
```
./new_mini.sh -n <mini name> -p <project ID from portal>
cd minis/<mini name>
npm i
```

All common commands (e.g. `npm run start`, `npm run minis:create...`) will work for your new mini.

### Rapid Development
Rapid development allows changes to a Snap Mini to be instantly reloaded into Snapchat. 

1. Run `npm run start:rapid`. You should see the following
```
You can now view sample-mini in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.2:3000
```
2. Create a rapid development build with that port and URL. The build can sometimes fail if "/" is not added after the port.
```
npm run cms:create-rapid
```
That script will add the URL from `npm run rapid:host --silent`. If that URL is wrong from `npm run rapid:host --silent`, then run
```
npm run cms:create-rapid -- -u <URL from above>\
```

The build will be named the \<git username\>.\<unix time\>. It will have the URL as the notes.

3. Target yourself to that build
```
npm run minis:release -- -b <build from before>
npm run minis:target -- -r <release from before> -u <user name>
```

Open up Snapchat while you are on that same WiFi network.

If you have an android device, it is possible to [remote debug the webview](https://developer.chrome.com/docs/devtools/remote-debugging/webviews/#open_a_webview_in_devtools) that the Snap Mini is running in.

## Additional Resources
- [Typescript](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
- [React](https://reactjs.org/docs/hello-world.html)
- [Create React App](https://create-react-app.dev/docs/getting-started)
- [React Typescript](https://github.com/typescript-cheatsheets/react#reacttypescript-cheatsheets)

For manging network calls, we recommend [SWR](https://swr.vercel.app/) or [React Query](https://react-query.tanstack.com/overview) with fetch or [axios](https://axios-http.com/docs/api_intro).

We recommend using Chrome with the [Chrome debug tools](https://developer.chrome.com/docs/devtools/device-mode/) for local debugging.

We recommend using [React Router](https://reactrouter.com/docs/en/v6/getting-started/tutorial#add-some-routes) to create a multipage mini. 

Important notes:
- [HashRouter](https://v5.reactrouter.com/web/api/HashRouter) is required, as the [BrowserRouter](https://v5.reactrouter.com/web/api/BrowserRouter) history API is not supported in Minis
- The default URL path for Minis when opened is not "/", so use a match all for the Minis' main page (e.g. ```<Route path="*" element={<MainPage />} />```. 
- Swipe actions can be implemented with [react-swipeable](https://github.com/FormidableLabs/react-swipeable). 

## Repo Development
To run any mini, cd into their directory (e.g. `cd minis/sample` ). Alternatively, all the commands can be run from the root using `--workspace=<path to mini>, -w`
```
npm -w minis/sample start
```

[Husky](https://typicode.github.io/husky/#/) is set up to lint staged files.

From the top level,
```
npm run lint                 # run lint
npm run lint:fix             # fix lint
```

Please read [doc](create_react_app.md) to learn more about the Create React App commands.

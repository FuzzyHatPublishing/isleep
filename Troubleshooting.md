# Troubleshooting

### We know for sure
* Run test locally first. Update the snapshot:
npm test -- -u


* in app.json, **include** for Travis:
````
"packagerOpts": {
      "nonPersistent": true
    }
````

* in package.json, **remove** --watch for Travis:
````
"test": "node ./node_modules/jest/bin/jest.js --watch"
so
"test": "node ./node_modules/jest/bin/jest.js"
````

* Travis fail because of npm install with message related to EINTEGRITY and integrity checksum failed:
````
[Forum/solution](https://github.com/npm/npm/issues/17146)
````

#### For additional ideas:
[RallyCoding with Stephen](https://rallycoding.com/blog/troubleshooting-react-native-startup/)

# dockgen

Autogenerate Dockerfile from package.json

## Usage

Commandline-Mode:

```$ dockgen # Looks for package.json in current directory```

Lib-Mode:

```
var dockgen = require('dockgen'),
    dockerfile = dockgen(path_to_package.json);

console.log(dockerfile);
```
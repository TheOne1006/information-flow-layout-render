const { cd, exec, echo, touch } = require("shelljs")
const { readFileSync } = require("fs")
const url = require("url")

let repoUrl
let pkg = JSON.parse(readFileSync("package.json") as any)
if (typeof pkg.repository === "object") {
  if (!pkg.repository.hasOwnProperty("url")) {
    throw new Error("URL does not exist in repository section")
  }
  repoUrl = pkg.repository.url
} else {
  repoUrl = pkg.repository
}

let parsedUrl = url.parse(repoUrl)
let repository = (parsedUrl.host || "") + (parsedUrl.path || "")
let ghToken = process.env.GH_TOKEN || "TheOne1006"

echo("Deploying demo!!!")
cd("demo")
touch(".nojekyll")
exec("git init")
exec("git add .")
exec("git config user.name \"theone1006\"")
exec("git config user.email \"297190869@qq.com\"")
exec("git commit -m \"demo(demo): update demo\"")
exec(
  `git push --force --quiet "https://${ghToken}@${repository}" master:demo`
)
echo("DEMO deployed!!")

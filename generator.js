const fs = require("fs");
const path = require("path");

const isBinary = require("isbinaryfile");

async function generate(dir, files, base = "", rootOptions = {}) {
  const glob = require("glob");

  glob
    .sync("**/*", {
      cwd: dir,
      nodir: true,
    })
    .forEach((rawPath) => {
      const sourcePath = path.resolve(dir, rawPath);
      const filename = path.join(base, rawPath);

      if (isBinary.sync(sourcePath)) {
        files[filename] = fs.readFileSync(sourcePath); // return buffer
      } else {
        let content = fs.readFileSync(sourcePath, "utf-8");
        if (path.basename(filename) === "manifest.json") {
          content = content.replace("{{name}}", rootOptions.projectName || "");
        }
        if (filename.charAt(0) === "_" && filename.charAt(1) !== "_") {
          files[`.${filename.slice(1)}`] = content;
        } else if (filename.charAt(0) === "_" && filename.charAt(1) === "_") {
          files[`${filename.slice(1)}`] = content;
        } else {
          files[filename] = content;
        }
      }
    });
}

module.exports = (api, options, rootOptions) => {
  api.extendPackage((pkg) => {
    return {
      dependencies: {
        "regenerator-runtime": "^0.12.1", // 锁定版本，避免高版本在小程序中出错
        "@dcloudio/uni-helper-json": "*",
      },
      devDependencies: {
        "postcss-comment": "^2.0.0",
        "@dcloudio/types": "*",
        "miniprogram-api-typings": "*",
        "mini-types": "*",
        "node-sass": "^4.0.0",
        "sass-loader": "^8.0.0",
        "@chinapnr/matrix-uni": "^3.0.0",
      },
    };
  });

  api.render(async function (files) {
    Object.keys(files).forEach((name) => {
      delete files[name];
    });

    const template = "default"; //options.repo || options.template;

    const base = "src";
    await generate(path.resolve(__dirname, "./template/common"), files);
    if (template !== "custom") {
      await generate(path.resolve(__dirname, "./template/" + template), files, base, rootOptions);
    } else {
      const ora = require("ora");
      const home = require("user-home");
      const download = require("download-git-repo");

      const spinner = ora("模板下载中...");
      spinner.start();

      const tmp = path.join(home, ".uni-app/templates", template.replace(/[/:]/g, "-"), "src");

      if (fs.existsSync(tmp)) {
        try {
          require("rimraf").sync(tmp);
        } catch (e) {
          console.error(e);
        }
      }

      await new Promise((resolve, reject) => {
        download(template, tmp, (err) => {
          spinner.stop();
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });

      await generate(tmp, files, base);
    }
  });
};

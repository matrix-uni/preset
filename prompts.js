module.exports = [
  {
    type: "list",
    name: "template",
    message: "请选择模板",
    choices: [
      {
        name: "Matrix",
        value: "matrix",
      },
      {
        name: "Default",
        value: "default",
      },
      {
        name: "自定义模板",
        value: "custom",
      },
    ],
    default: "None",
  },
  {
    when: (answers) => answers.template === "custom",
    type: "input",
    name: "repo",
    message: "请输入自定义模板地址",
    filter(input) {
      return new Promise(function (resolve, reject) {
        if (input) {
          resolve(input);
        } else {
          reject(new Error("模板地址不能为空"));
        }
      });
    },
  },
];

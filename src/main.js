import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import Listr from "listr";
import figlet from 'figlet';
import execa from 'execa';
import { projectInstall } from "pkg-install";

const access = promisify(fs.access); // 判断文件目录是否存在
const copy = promisify(ncp); // 复制文件

/* 创建模板*/
export async function createTemplate(options) {
  const _options = { ...options }

  // 1. 根据用户输入的名称创建目录
  const targetDirectory = `${process.cwd()}/${_options.name}`;
  fs.mkdirSync(targetDirectory);
  _options.targetDirectory = targetDirectory;

  // 2. 根据询问后的结果（v4/v5）拷贝模板的文件地址
  const templateDir = path.resolve(__dirname, '../templates', _options.webpackVersion.toLowerCase(), 'first-webpack');
  _options.templateDirectory = templateDir;

  // 3. 验证文件地址
  try {
    // 判断文件目录是否存在
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error(`%s ${err}`, chalk.red.bold('ERROR'))
    process.exit(1);
  }

  // 4.创建任务列表
  const tasks = new Listr([
    {
      title: '加载 webpack 脚手架', task: () => copyTemplateFile(_options)
    },
    {
      title: 'git 初始化', task: () => initGit(targetDirectory), enabled: () => _options.git,
    },
    {
      title: '包依赖安装', task: () => projectInstall({
        prefer: 'npm', cwd: targetDirectory,
      }), skip: () => !_options.install ? '默认跳过依赖安装' : undefined,
    }
  ])

  // 执行任务列表
  await tasks.run();

  // 成功后，字符画输出
  console.log(chalk.rgb(13, 161, 223)(figlet.textSync(_options.name, {
    font: "Standard", horizontalLayout: "default", verticalLayout: "default"
  })));

  console.log(`%s ${_options.name}`, chalk.green('cd'));
  if (!_options.install) {
    console.log(`%s install`, chalk.green('npm'));
  }
  console.log(`%s dev`, chalk.green('npm run'));
}

/*git 初始化*/
async function initGit(cwd) {
  const result = await execa('git', ['init'], {
    cwd,
  });
  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize git'));
  }
}


/*复制文件*/
async function copyTemplateFile(options) {
  // 替换文件入口的名称为用户输入的名称
  // 读取模板文件内容
  let data = fs.readFileSync(options.templateDirectory + '/src/App.js', 'utf8');
  const regex = /FIRST-WEBPACK/g;
  data = data.replace(regex, options.name.toUpperCase());
  await copy(options.templateDirectory, options.targetDirectory, {
    clobber: false, // 同名文件不覆盖
  });
  // 写入文件
  fs.writeFileSync(`${options.targetDirectory}/src/App.js`, data);
}

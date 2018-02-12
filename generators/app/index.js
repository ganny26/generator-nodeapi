'use strict';
const Generator = require('yeoman-generator');
const commandExists = require('command-exists').sync;
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

  constructor(args, opts){
    super(args, opts);
  }
  
  initializing() {
    
  }

  prompting() {
    const prompts = [{
      type: 'input',
      name: 'app_name',
      message: 'Name of your app',
      default: 'node-api'
    },{
      type: 'input',
      name: 'app_description',
      message: 'Description of your app',
      default: 'Simple node REST API'
    },{
      type: 'input',
      name: 'app_author',
      message: 'Author name',
      default: 'Your name'
    }];
   
    return this.prompt(prompts).then(answers => {
      this.props = answers;
      const appName = answers.app_name;
      const appDescription = answers.app_description;
      const appAuthor = answers.app_author;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),{
        name: this.props.app_name,
        description : this.props.app_description,
        author : this.props.app_author
      }
    );
    this.fs.copyTpl(
      this.templatePath('_configs'),
      this.destinationPath('configs')
    );
    this.fs.copyTpl(
      this.templatePath('_controllers'),
      this.destinationPath('controllers')
    );
    this.fs.copyTpl(
      this.templatePath('_models'),
      this.destinationPath('models')
    );
    this.fs.copyTpl(
      this.templatePath('_routes'),
      this.destinationPath('routes')
    );
    this.fs.copyTpl(
      this.templatePath('_server.js'),
      this.destinationPath('server.js')
    );
    this.fs.copyTpl(
      this.templatePath('.env'),
      this.destinationPath('.env')
    );

    this._writingGit();
  }

  _writingGit(){
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore'));

    this.fs.copy(
      this.templatePath('Dockerfile'),
      this.destinationPath('Dockerfile'));
  }

  install() {
    const hasYarn = commandExists('yarn');
    const hasBower = commandExists('bower');
    this.installDependencies({
      npm: !hasYarn,
      yarn: hasYarn,
      bower: false
    });
  }

  end(){
    const message = "Generated Node API to current folder !";
    this.log(message);
  }
};

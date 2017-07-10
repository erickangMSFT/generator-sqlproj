'use strict';

// Require dependencies
const Generator = require('yeoman-generator');
const yosay = require('yosay');
const chalk = require('chalk');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('skip-folders', {
      desc: 'Skip t-sql source folder structure generation.',
      type: Boolean,
      default: false
    });
  }

  prompting() {
    this.log(yosay('\'Yo! I will create a simple mssql database project to easily develop, build and publish your database to mssql using msbuild and dacfx.'));
    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Enter your database project name',
      default: this.appname
    }];

    return this.prompt(prompts).then(answers => {
      this.log(chalk.yellow('- database project configuration'));
      this.log(chalk.yellow('   database name:'), answers.name);
      this.log(chalk.yellow('   project path: '), this.destinationPath());
      this.log(chalk.yellow('- initiating ...'));
      this.props = answers;
    });
  }

  writing() {
    this._writingReadmefile();
    this._writingProjectfiles();
    this._writingPublishProfile();
    this._writingGitfile();
    this._writingTsqlFolders();
    this._writingUtilfiles();
  }

  _writingReadmefile() {
    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'),
      {
        name: this.props.name
      }
    );
  }

  _writingProjectfiles() {
    this.fs.copy(
      this.templatePath('_database.sqlproj'),
      this.destinationPath(this.props.name + '.sqlproj')
    );

    this.fs.copy(
      this.templatePath('_database.sqlproj.user'),
      this.destinationPath(this.props.name + '.sqlproj.user')
    );
  }

  _writingPublishProfile() {
    this.fs.copyTpl(
      this.templatePath('publish_profiles/_localdev.publish.xml'),
      this.destinationPath('publish_profiles/localdev.publish.xml'), {
        name: this.props.name
      }
    );
  }

  _writingGitfile() {
    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );
  }
  _writingTsqlFolders() {

    if (!this.options['skip-folders']) {
      mkdirp('src');
      mkdirp('src/tables');
      mkdirp('src/views');
      mkdirp('src/procedures');
      mkdirp('src/functions');
      mkdirp('src/types');
      mkdirp('src/security');
      mkdirp('src/misc');
      mkdirp('deployment_scripts')
    }
  }

  _writingUtilfiles() {
    this.fs.copy(
      this.templatePath('utils/_importdb.ps1'),
      this.destinationPath('utils/importdb.ps1')
    );
    this.fs.copyTpl(
      this.templatePath('utils/_build.ps1'),
      this.destinationPath('utils/build.ps1'),
      {
        name: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('utils/_publish.ps1'),
      this.destinationPath('utils/publish.ps1'),
      {
        name: this.props.name
      }
    );

  }
}





/**
 * Dependencies
 */
var svnclient = require('./svn'),
    gitclient = require('./git')
    getcreds  = require('./getcreds'),
    fs        = require('fs'),
    rimraf    = require('rimraf');

/**
 * Synchronizes a remove svn repo
 * @constructor
 */

var SVNSync = function (obj, cb) {

  if (!obj.dest) {
    throw new Error("Destination (dest) folder is required.");
  }

  if (!obj.branch) {
    throw new Error("Repo branch is required.");
  }

  if (!obj.repo) {
    throw new Error("Remote repository (repo) is required.");
  }

  // Make sure there is a callback
  cb = cb || function () {
      console.log("Git Sync finished.");
    };

  // Decide where this goes
  var fullqualifiedplace  = obj.dest,
      semiqualified       = obj.dest;

  if (obj.localfolder.indexOf('/') > -1) {
    semiqualified = obj.dest + '/' + obj.localfolder.substr(0, obj.localfolder.lastIndexOf('/'));
  }

  /**
   * Runs the actual sync
   * @param username
   * @param password
   */
  function runsync() {
    var client = new gitclient();
    if (fs.existsSync(fullqualifiedplace)) {
      console.log('folder already exists, exiting');
    } else {
      // Make the tag folder if it doesn't exist
      if (!fs.existsSync(fullqualifiedplace)) {
        fs.mkdir(fullqualifiedplace);
      }
      var ctx = this;

      console.info("Wait a moment, pulling repo " + obj.repo + "...");

      client.clone(obj.repo, obj.branch);
    }
  }

  // Check to see if we already have it
  if (fs.existsSync(fullqualifiedplace)) {
    console.log('folder already exists, exiting');
  } else {
    runsync();
  }

};

/**
 * Expose the class to the world
 * @type {Function}
 */

module.exports = SVNSync;

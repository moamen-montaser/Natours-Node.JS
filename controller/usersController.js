const express = require('express');
const app = express();

//hena ana h3mel el handler fn w a3mlaha export w askhdemha f file tany

//hena h3ml el handler fn w a3ml el post w el get f file tany
//1* way to make route handeler fn>
exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    mess: 'this route not yet defined',
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    mess: 'this route not yet defined',
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    mess: 'this route not yet defined',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    mess: 'this route not yet defined',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    mess: 'this route not yet defined',
  });
};

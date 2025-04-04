const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  page2: {
    components: [{
      type: String,
      enum: ['aboutMe', 'address', 'birthdate']
    }]
  },
  page3: {
    components: [{
      type: String,
      enum: ['aboutMe', 'address', 'birthdate']
    }]
  }
});

// 设置默认配置
configSchema.statics.getDefaultConfig = function() {
  return {
    page2: {
      components: ['aboutMe', 'birthdate']
    },
    page3: {
      components: ['address']
    }
  };
};

module.exports = mongoose.model('Config', configSchema); 
module.exports = {
  apps : [{
    script: 'index.js',
    watch: '.'
  },],
  deploy : {
    production : {
      user : 'sergio',
      host:'192.168.1.152',
      ref  : 'origin/main',
      repo : 'git@github.com:FIntLyncix/fint-tchat-api.git',
      path : '/home/sergio/Documents/testpm2',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};

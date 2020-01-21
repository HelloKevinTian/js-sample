module.exports = {
    apps : [{
      name: 'bi-console-server',
      script: 'server.js',
  
      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      args: '',
      instances: 2,
      exec_mode  : 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '2G',
      interpreter_args: '--max-old-space-size=2048',
      env: {
        NODE_ENV: 'dev'
      },
      env_debug: {
        NODE_ENV: 'debug'
      },
      env_stage: {
        NODE_ENV: 'stage'
      },
      env_prod: {
        NODE_ENV: 'prod'
      }
    }],
  
  //   deploy : {
  //     production : {
  //       user : 'node',
  //       host : '212.83.163.1',
  //       ref  : 'origin/master',
  //       repo : 'git@github.com:repo.git',
  //       path : '/var/www/production',
  //       'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
  //     }
  //   }
  };
  
/**
 * git 基础操作类
 * @see https://github.com/steveukx/git-js
 */

const simpleGit = require('simple-git');
const fs = require('fs');

/**
 * @useage
    
    setTimeout(async () => {
        try {
            //init
            let user = 'jenkins';
            let pass = 'utMLD_Nh9uJnXpeY';
            let repo = 'gitlab.ftsview.com/Kernel-Service/Test/gitop.git';
            let localPath = process.cwd() + '/gitop';
            
            //create dir
            GitService.mkdirSync('./gitop');

            //new gitServicee
            let gitService = new GitService(localPath);

            //git clone
            await gitService.clone(gitService.makeRepo(user, pass, repo));
            console.log('git clone finished');

            //git pull
            let r2 = await gitService.pull();
            console.log('git pull finished');

            //git status
            let r3 = await gitService.status()
            console.log('git status finished');

            //cp file
            await GitService.execCmd(`cp -r ./tmp/image ${localPath}`);
            await GitService.execCmd(`cp -r ./tmp/js ${localPath}`);

            //git add + commit + push
            await gitService.add('./*');
            await gitService.commit('add some files');
            gitService.addRemote(`https://${repo}`);
            gitService.push('master');
            console.log('git push finished');

        } catch (err) {
            console.error('---err--->', err);
        }
    }, 10);

 */
class GitService {

    /**
     * 本地git目录绝对路径
     * @param {String} localPath 
     */
    constructor(localPath) {
        const options = {
            baseDir: localPath,
            binary: 'git',
            maxConcurrentProcesses: 6,
        };
        this.localPath = localPath;
        this.git = simpleGit(options);
    }

    /**
     * makeRepo
     * @param {String} user 
     * @param {String} pass 
     * @param {String} repo 
     */
    makeRepo(user, pass, repo) {
        return `https://${user}:${pass}@${repo}`;
    }

    /**
     * git clone
     * @use this.makeRepo(user, pass, repo)
     * @param {String} repoPath
     */
    clone(repoPath) {
        console.log('----- clone', !fs.existsSync(`${this.localPath}/.git`))
        if (!fs.existsSync(`${this.localPath}/.git`)) {
            return this.git.clone(repoPath, this.localPath);
        }
    }

    /**
     * git pull
     */
    pull() {
        return this.git.pull();
    }

    /**
     * git add
     * @param {String} path 提交内容路径
     */
    add(path) {
        return this.git.add(path);
    }

    /**
     * git commit
     * @param {String} message 
     */
    commit(message) {
        return this.git.commit(message);
    }

    /**
     * @before push
     * @after commit
     * @param {String} remoteRepo 
     * @param {String} remoteName 
     */
    addRemote(remoteRepo, remoteName = 'origin') {
        return this.git.addRemote(remoteName, remoteRepo);
    }

    /**
     * git push
     * @param {String} branch 
     */
    push(branch = 'master') {
        return this.git.push('origin', branch);
    }

    /**
     * git status
     */
    status() {
        return this.git.status();
    }

    /**
     * git checkout
     */
    checkout(what, options) {
        return this.git.checkout(what, options);
    }

    /**
     * 
     * @param {String} cmd cp -r srcDir/ dstDir/
     */
    static execCmd(cmd) {
        return new Promise((resolve, reject) => {
            require('child_process').exec(cmd, (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * @see lib cargo/helper.js
     * @param {String} dir 
     * @param {String} mode 
     */
    static mkdirSync(dir, mode) {
        const arr = dir.split('/');
        mode = mode || '0755';

        if (arr[0] === '.') { //处理 ./aaa
            arr.shift();
        }
        if (arr[0] == '..') { //处理 ../ddd/d
            arr.splice(0, 2, arr[0] + '/' + arr[1]);
        }

        function inner(cur) {
            if (cur && !fs.existsSync(cur)) { //不存在就创建一个
                fs.mkdirSync(cur, mode)
            }
            if (arr.length) {
                inner(cur + '/' + arr.shift());
            }
        }
        arr.length && inner(arr.shift());
    };

}

//---------以下为测试代码------------


setTimeout(async () => {
    try {

        await GitService.execCmd('sed -i "s%^{account_token}$% 123456%g" /Users/tianwen/Downloads/template/index.html')

        return;


        //init
        let user = 'jenkins';
        let pass = 'xxxx';
        let repo = 'gitlab.ftsview.com/Kernel-Service/Test/gitop.git';
        let localPath = process.cwd() + '/gitop';
        
        //create dir
        GitService.mkdirSync('./gitop');

        //new gitServicee
        let gitService = new GitService(localPath);

        //git clone
        await gitService.clone(gitService.makeRepo(user, pass, repo));
        console.log('git clone finished');

        //git pull
        let r2 = await gitService.pull();
        console.log('git pull finished');

        //git status
        let r3 = await gitService.status()
        console.log('git status finished');

        //cp file
        await GitService.execCmd(`cp -r ./new-townest-h5/test ${localPath}`);

        //git add + commit + push
        await gitService.add('./*');
        await gitService.commit('add some files');
        gitService.addRemote(`https://${repo}`);
        gitService.push('master');
        console.log('git push finished');

    } catch (err) {
        console.error('---err--->', err);
    }
}, 10);
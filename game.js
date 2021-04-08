var opState = {
    preload: function() {
    },
    create: function() {
        game.world.setBounds(0, 0, 650, 700);
        game.stage.backgroundColor = '#000';

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.text(300, 50, 'Option', {font: '36px misaki', fill: '#fff', align: 'center'});
        this.SE = game.add.text(300, 100, 'Volume_SE: '+volume_SE, {font: '36px misaki', fill: '#ff0', align: 'center'});
        this.BGM = game.add.text(300, 150, 'Volume_BGM: '+volume_BGM, {font: '36px misaki', fill: '#fff', align: 'center'});
        this.Gamelevel = game.add.text(300, 200, 'LEVEL: '+level, {font: '36px misaki', fill: '#fff', align: 'center'});
        this.EXIT = game.add.text(300, 600, 'Exit', {font: '36px misaki', fill: '#fff', align: 'center'});
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;

        this.cursor = game.input.keyboard.createCursorKeys();
        this.mouse = game.input.mousePointer;
        this.now = 0;
        this.down = false;
    },
    update: function() {
        if(this.mouse.x>=300 && this.mouse.x<=400 && this.mouse.y>=600 && this.mouse.y<=625){
            this.EXIT.fill = '#ff0';
            if(game.input.activePointer.isDown){
                sound.stop();
                game.state.start('menu');
            }
        }else this.EXIT.fill = '#fff';
        if(this.now==0){
            if (this.cursor.left.isDown && !this.down){
                this.down = true;
                if(volume_SE>0) volume_SE=volume_SE-1;
                this.SE.text = 'Volume_SE: '+volume_SE;
            }
            else if (this.cursor.right.isDown && !this.down){
                this.down = true;
                if(volume_SE<10) volume_SE=volume_SE+1;
                this.SE.text = 'Volume_SE: '+volume_SE;
            }
            else if (this.cursor.up.isDown && !this.down) { 
                this.down = true;
                this.now = 2;
                this.SE.fill = '#fff';
                this.BGM.fill = '#fff';
                this.Gamelevel.fill = '#ff0';
            }
            else if (this.cursor.down.isDown && !this.down) { 
                this.down = true;
                this.now++;
                this.SE.fill = '#fff';
                this.BGM.fill = '#ff0';
                this.Gamelevel.fill = '#fff';
            }
        }
        else if( this.now==1){
            if (this.cursor.left.isDown && !this.down){
                this.down = true;
                if(volume_BGM>0) volume_BGM=volume_BGM-1;
                this.BGM.text = 'Volume_BGM: '+volume_BGM;
            }
            else if (this.cursor.right.isDown && !this.down){
                this.down = true;
                if(volume_BGM<10) volume_BGM=volume_BGM+1;
                this.BGM.text = 'Volume_BGM: '+volume_BGM;
            }
            else if (this.cursor.up.isDown && !this.down) { 
                this.down = true;
                this.now--;
                this.SE.fill = '#ff0';
                this.BGM.fill = '#fff';
                this.Gamelevel.fill = '#fff';
            }
            else if (this.cursor.down.isDown && !this.down) { 
                this.down = true;
                this.now++;
                this.SE.fill = '#fff';
                this.BGM.fill = '#fff';
                this.Gamelevel.fill = '#ff0';
            }
        }else if (this.now==2){
            if (this.cursor.left.isDown && !this.down){
                this.down = true;
                if(level=='easy') level='hard';
                else level = 'easy';
                this.Gamelevel.text = 'LEVEL: '+level;
            }
            else if (this.cursor.right.isDown && !this.down){
                this.down = true;
                if(level=='easy') level='hard';
                else level = 'easy';
                this.Gamelevel.text = 'LEVEL: '+level;
            }
            else if (this.cursor.up.isDown && !this.down) { 
                this.down = true;
                this.now--;
                this.SE.fill = '#fff';
                this.BGM.fill = '#ff0';
                this.Gamelevel.fill = '#fff';
            }
            else if (this.cursor.down.isDown && !this.down) { 
                this.down = true;
                this.now = 0;
                this.SE.fill = '#ff0';
                this.BGM.fill = '#fff';
                this.Gamelevel.fill = '#fff';
            }
        }
        if(!this.cursor.down.isDown & !this.cursor.up.isDown
            & !this.cursor.left.isDown & !this.cursor.right.isDown) this.down = false;
    }
};
var over = {
    preload: function() {
        game.load.audio('cheer', 'music/cheer.wav');
    },
    create: function() {
        game.world.setBounds(0, 0, 650, 700);
        game.stage.backgroundColor = '#000';

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.text(950/2-100, 150, 'YOUR SCORE:'+score, {font: '26px misaki', fill: '#fff', align: 'center'});
        this.EXIT = game.add.text(300, 600, 'Exit', {font: '36px misaki', fill: '#fff', align: 'center'});
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;

        this.cursor = game.input.keyboard.createCursorKeys();
        this.mouse = game.input.mousePointer;
        sound = game.add.audio('cheer', volume_SE/10, false);
        sound.play();
    },
    update: function() {
        if(this.mouse.x>=300 && this.mouse.x<=400 && this.mouse.y>=600 && this.mouse.y<=625){
            this.EXIT.fill = '#ff0';
            if(game.input.activePointer.isDown){
                game.state.start('menu');
            }
        }else this.EXIT.fill = '#fff';
    }
};
var menuState = {
    preload: function() {
        game.load.image('background', 'pic/menu_back.png');
        game.load.image('title', 'pic/title.png');
        game.load.image('title2', 'pic/title2.png');
        game.load.audio('bgm', 'music/Nightfall.wav');
    },
    create: function() {
        game.world.setBounds(0, 0, 650, 700);
        game.stage.backgroundColor = '#000';
        game.add.image(0, 0, 'background'); 

        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.title = game.add.sprite(950/2, -162, 'title'); 
        this.title.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.title);

        this.title2 = game.add.image(950/2, 700-200, 'title2'); 
        this.title2.anchor.setTo(0.5, 0.5);
        game.add.text(950/2-35, 700-235, 'Start', {font: '26px misaki', fill: '#fff', align: 'center'});
        game.add.text(950/2-40, 700-195, 'Option', {font: '26px misaki', fill: '#fff', align: 'center'});
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;

        this.cursor = game.input.keyboard.createCursorKeys();
        this.mouse = game.input.mousePointer;
        sound = game.add.audio('bgm', volume_BGM/10, true);
        sound.play();
    },
    update: function() {
        if(this.title.y<250) this.title.body.velocity.y = 250-this.title.y;
        if(this.mouse.y>=700-235 && this.mouse.y<=700-210 && this.mouse.x>=950/2-35 && this.mouse.x<=950/2+15){
                game.add.text(950/2-35, 700-235, 'Start', {font: '26px misaki', fill: '#ff0', align: 'center'});
                if(game.input.activePointer.isDown){
                    sound.stop();
                    game.state.start('main');
                }
        }
        else if(this.mouse.y>=700-195 && this.mouse.y<=700-170 && this.mouse.x>=950/2-35 && this.mouse.x<=950/2+15){
                game.add.text(950/2-40, 700-195, 'Option', {font: '26px misaki', fill: '#ff0', align: 'center'});
                if(game.input.activePointer.isDown){
                    sound.stop();
                    game.state.start('option');
                }
        }else{
            game.add.text(950/2-35, 700-235, 'Start', {font: '26px misaki', fill: '#fff', align: 'center'});
            game.add.text(950/2-40, 700-195, 'Option', {font: '26px misaki', fill: '#fff', align: 'center'});
        }
    }
};
var mainState = {
    preload: function() {
        game.load.image('background', 'pic/background.png');
        game.load.image('menu_black', 'pic/menu.png');
        game.load.image('demon_bullet', 'pic/demon_bullet.png');
        game.load.image('goat_bullet', 'pic/goat_bullet.png');
        game.load.image('pixel', 'pic/pixel.png');
        game.load.image('bullet', 'pic/bullet.png');
        game.load.image('bullet1', 'pic/bullet1.png');
        game.load.image('BOSS2', 'pic/BOSS2.png');
        game.load.spritesheet('BOSS1', 'pic/BOSS1.png', 46, 94);
        game.load.spritesheet('player', 'pic/player.png', 70, 80);
        game.load.spritesheet('demon', 'pic/demon.png', 78, 60);    
        game.load.spritesheet('goat', 'pic/goat.png', 78, 68);    
        game.load.spritesheet('blood', 'pic/blood.png', 40, 40);
        game.load.audio('bgm_', 'music/Friction.wav');
        game.load.audio('bomb', 'music/bomb.mp3');
    },
    create: function() {
        game.world.setBounds(0, 0, 650, 700);
        game.stage.backgroundColor = '#000';
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.renderer.renderSession.roundPixels = true;

        this.cursor = game.input.keyboard.createCursorKeys();
        this.mouse = game.input.mousePointer;

        this.back1 = game.add.sprite(0, 0, 'background'); 
        this.back2 = game.add.sprite(0, -700, 'background'); 
        game.physics.arcade.enable(this.back1);
        game.physics.arcade.enable(this.back2);
        this.back1.body.velocity.y = 10;
        this.back2.body.velocity.y = 10;
        //player
        this.player = game.add.sprite(650/2, game.height-100, 'player');
        this.player.animations.add('fly', [0, 1, 2, 3], 8, true);
        this.player.anchor.setTo(0.5, 0.5);
        this.player.animations.play('fly');
        game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.body.setSize(28, 48, 24, 24);
        this.Heart = 10;
        this.score = 0;
        this.fireButton = Phaser.Keyboard.Z;
        //bullet
        this.bulletPool = game.add.group();
        this.bulletPool.enableBody = true;
        this.bulletPool.createMultiple(100, 'bullet');
        this.bulletPool.setAll('anchor.x', 0.5);
        this.bulletPool.setAll('anchor.y', 0.5);
        
        this.nextShotAt = 0;
        this.shotDelay = 25;
        //demon
        this.enemyPool = game.add.group();
        this.enemyPool.enableBody = true;
        //goat
        this.goatPool = game.add.group();
        this.goatPool.enableBody = true;
        //boss
        this.BOSSPool = game.add.group();
        this.BOSSPool.enableBody = true;

        this.nextEnemyAt = 0;
        this.enemyDelay = 1000;
        this.bullet = game.add.group();
        this.bullet.enableBody = true;
        this.resetMenu();
        this.nextBOSSAt = 0;
        this.BOSSDelay = 750;
        this.nextEnemy = 0;
        this.counter = 0;
        if(level=='easy'){
            this.enemyStcak = '00010001000100010000100000100100200020020000200002002002000003000010020000200010012010100010000200001000001000120201112120400010002000100020001000100000E';
            this.num = 5;
            this.BOSSblood = 100;
        }
        else {
            this.enemyStcak = '00010100010011011000111000110100202022102000211100102002010103101010220000202010012010101010000201001001001200120201112120400010002000100020001000100000E';
            this.num = 10;
            this.BOSSblood = 1000;
        }
        sound = game.add.audio('bgm_', volume_BGM/10, true);
        sound.play();
        this.bomb = game.add.audio('bomb', volume_SE/10, false);
        
        this.emitterPool = game.add.group();
        this.emitter = game.add.emitter(0, 0, 15);
        this.emitter.makeParticles('pixel');
        this.emitter.setYSpeed(-200, 200);
        this.emitter.setXSpeed(-200, 200);
        this.emitter.setScale(2, 0, 2, 0, 400);
        this.emitter.gravity = 0;

        this.start_y = game.add.text(700, 550, 'RESTART', {font: '20px misaki', fill: '#ff0', align: 'left'});
        this.menu_y = game.add.text(700, 600, 'MENU', {font: '20px misaki', fill: '#ff0', align: 'left'});
        this.start_y.visible = false;
        this.menu_y.visible = false;
    },
    update: function() {
        if(this.back1.y>700) this.back1.y=-700;
        if(this.back2.y>700) this.back2.y=-700;
        game.physics.arcade.overlap(this.player, this.bullet,
            this.playerHit, null, this);
        game.physics.arcade.overlap(this.bulletPool, this.enemyPool,
            this.enemyHit, null, this);
        game.physics.arcade.overlap(this.player, this.enemyPool,
            this.playerHit, null, this);
        game.physics.arcade.overlap(this.bulletPool, this.goatPool,
            this.goatHit, null, this);
        game.physics.arcade.overlap(this.player, this.goatPool,
            this.playerHit, null, this);
        game.physics.arcade.overlap(this.bulletPool, this.BOSSPool,
            this.BOSSHit, null, this);
        game.physics.arcade.overlap(this.player, this.BOSSPool,
            this.playerHit, null, this);
        
        this.createEnemy();
        this.moveBullet();
        this.movePlayer();
        if(!this.player.alive) this.playerDie();
    }, 
    boom: function(enemy){
        var emitter = game.add.emitter(0, 0, 15);
        emitter.makeParticles('pixel');
        emitter.setYSpeed(-200, 200);
        emitter.setXSpeed(-200, 200);
        emitter.setScale(2, 0, 2, 0, 400);
        emitter.gravity = 0;
        emitter.x = enemy.x;
        emitter.y = enemy.y;
        emitter.start(true, 400, null, 10);
        this.emitterPool.add(emitter);
    },
    playerDie: function() { 
        if(this.Heart!=0){
            this.enemyPool.forEach(function(enemy){ mainState.boom(enemy); })
            this.goatPool.forEach(function(enemy){ mainState.boom(enemy); })
            this.bullet.forEach(function(enemy){ mainState.boom(enemy); })
            this.enemyPool.removeAll(true);
            this.goatPool.removeAll(true);
            this.bullet.removeAll(true);
            this.Heart--;
            this.player.revive();
            this.player.x = 650/2;
            this.player.y = game.height-100;
            this.resetMenu();
        }else {
            score = this.score+this.Heart*1000;
            sound.stop();
            game.state.start('over');
        }
    },
    createEnemy: function() {
        var delete_ = game.add.group();
        this.enemyPool.forEach(function(enemy){
            if (!enemy.inWorld && enemy.y>40) delete_.add(enemy);
            if(Math.floor(enemy.y)%50==0 && enemy.y<350) mainState.demonShoot(enemy);
        });
        this.goatPool.forEach(function(enemy){
            if (!enemy.inWorld && enemy.y>40) delete_.add(enemy);
            if(Math.floor(enemy.y)%30==0 && enemy.y<350) {
                mainState.goatShoot(enemy);
            }
        });
        delete_.destroy();
        if (this.nextBOSSAt<game.time.now) {
            this.nextBOSSAt = game.time.now + this.BOSSDelay;
            if(this.BOSSDelay==500){
                this.BOSSPool.forEach(function(enemy){
                    mainState.BOSSShoot2(enemy);
                });
            }
            else{
                this.BOSSPool.forEach(function(enemy){
                    mainState.BOSSShoot1(enemy);
                });
            }
        }
        this.BOSSPool.forEach(function(enemy){
            if(enemy.y<150) enemy.body.velocity.y=150-enemy.y;
            if((enemy.x<150)) enemy.body.velocity.x = game.rnd.integerInRange(0, 40); 
            else if(enemy.x>500) enemy.body.velocity.x = game.rnd.integerInRange(-40, 0); 
        });
        if (this.nextEnemyAt<game.time.now) {
            this.emitterPool.removeAll();
            var new_demon;
            this.nextEnemyAt = game.time.now + this.enemyDelay;
            if (this.enemyStcak[this.nextEnemy]==1)
                new_demon = this.newDemon();
            else if (this.enemyStcak[this.nextEnemy]==2)
                new_demon = this.newGoat();
            else if (this.enemyStcak[this.nextEnemy]==3)
                new_demon = this.newBOSS1();
            else if (this.enemyStcak[this.nextEnemy]==4)
                new_demon = this.newBOSS2();
            else if (this.enemyStcak[this.nextEnemy]=='E'){
                score = this.score+this.Heart*1000;
                sound.stop();
                game.state.start('over');
            }
            this.nextEnemy++;
        }
    },
    enemyHit: function(bullet, enemy) {
        this.bomb.play();
        bullet.kill();
        enemy.kill();
        var blood = game.add.sprite(enemy.x, enemy.y, 'blood');
        blood.anchor.setTo(0.5);
        blood.animations.add('boom');
        blood.play('boom', 15, false, true);
        if(level=='easy')this.score+=100;
        else this.score+=300
        this.resetMenu();
    },
    goatHit: function(bullet, enemy) {
        this.bomb.play();
        bullet.kill();
        enemy.kill();
        var blood = game.add.sprite(enemy.x, enemy.y, 'blood');
        blood.anchor.setTo(0.5);
        blood.animations.add('boom');
        blood.play('boom', 15, false, true);
        if(level=='easy')this.score+=500;
        else this.score+=750
        this.resetMenu();
    },
    BOSSHit: function(bullet, enemy) {
        bullet.kill();
        if(this.BOSSblood!=0) this.BOSSblood-=5;
        else{
            enemy.kill();
            this.bomb.play();
            var blood = game.add.sprite(enemy.x, enemy.y, 'blood');
            blood.anchor.setTo(0.5);
            blood.animations.add('boom');
            blood.play('boom', 15, false, true);
            if(level=='easy')this.score+=1000;
            else this.score+=1500
            this.resetMenu();
            if(level=='easy') this.BOSSblood=100;
            else this.BOSSblood=1000;
        }
    },
    playerHit: function(player, enemy) { 
        this.bomb.play();
        enemy.destroy();
        var blood = game.add.sprite(player.x, player.y, 'blood');
        blood.anchor.setTo(0.5);
        blood.animations.add('boom');
        blood.play('boom', 15, false, true);
        player.kill();
    },
    demonShoot: function(enemy){
        if (!enemy.alive) return;
        for(var i=0; i<this.num*2; i++){
            var new_bullet = game.add.sprite(enemy.x, enemy.y, 'demon_bullet');
            this.bullet.add(new_bullet);
            new_bullet.anchor.setTo(0.5, 0.5);
            new_bullet.angle = Math.PI/this.num*i;
            new_bullet.body.velocity.x = 200*Math.sin(new_bullet.angle);
            new_bullet.body.velocity.y = 200*Math.cos(new_bullet.angle);
        }
    },
    goatShoot: function(enemy){
        if (!enemy.alive) return;
        for(var i=0; i<this.num/2; i++){
            var new_bullet = game.add.sprite(enemy.x, enemy.y, 'goat_bullet');
            this.bullet.add(new_bullet);
            new_bullet.anchor.setTo(0.5, 0.5);
            new_bullet.rotation = game.rnd.integerInRange(-100, 100)/100;
            new_bullet.body.velocity.x = -200*Math.sin(new_bullet.rotation);
            new_bullet.body.velocity.y = 200*Math.cos(new_bullet.rotation);
        }
    },
    BOSSShoot2: function(enemy){
        if (!enemy.alive) return;
        for(var i=0; i<this.num/5*8; i++){
            var new_bullet = game.add.sprite(enemy.x, enemy.y, 'bullet1');
            this.bullet.add(new_bullet);
            new_bullet.anchor.setTo(0.5, 0.5);
            new_bullet.rotation = Math.PI/this.num*5/4*(i+this.counter/12);
            new_bullet.body.velocity.x = -200*Math.sin(new_bullet.rotation);
            new_bullet.body.velocity.y = 200*Math.cos(new_bullet.rotation);
        }
        for(var i=0; i<this.num/4; i++){
            var new_bullet = game.add.sprite(enemy.x, enemy.y, 'goat_bullet');
            this.bullet.add(new_bullet);
            new_bullet.anchor.setTo(0.5, 0.5);
            new_bullet.rotation = game.rnd.integerInRange(-50, 50)/100;
            new_bullet.body.velocity.x = -200*Math.sin(new_bullet.rotation);
            new_bullet.body.velocity.y = 200*Math.cos(new_bullet.rotation);
        }
    },
    BOSSShoot1: function(enemy){
        if (!enemy.alive) return;
        for(var i=0; i<this.num/5*4; i++){
            var new_bullet = game.add.sprite(enemy.x, enemy.y, 'bullet1');
            this.bullet.add(new_bullet);
            new_bullet.anchor.setTo(0.5, 0.5);
            new_bullet.rotation = Math.PI/this.num*5/2*(i+this.counter/12);
            new_bullet.body.velocity.x = -200*Math.sin(new_bullet.rotation);
            new_bullet.body.velocity.y = 200*Math.cos(new_bullet.rotation);
        }
        for(var i=0; i<this.num; i++){
            var new_bullet = game.add.sprite(enemy.x, enemy.y, 'demon_bullet');
            this.bullet.add(new_bullet);
            new_bullet.anchor.setTo(0.5, 0.5);
            new_bullet.angle = game.rnd.integerInRange(-100, 100)/100;
            new_bullet.body.velocity.x = 200*Math.sin(new_bullet.angle);
            new_bullet.body.velocity.y = 200*Math.cos(new_bullet.angle);
        }
        this.counter++;
    },
    moveBullet: function(){
        var delete_ = game.add.group();
        this.bullet.forEach(function(new_bullet){
            if (!new_bullet.inWorld) delete_.add(new_bullet);
        });
        this.bulletPool.forEach(function(new_bullet){
            if(!new_bullet.inWorld) new_bullet.kill();
        });
        delete_.destroy();
    },
    /// ToDo 7: Finish the 4 animation part.
    fire: function() { 
        if (!this.player.alive || this.nextShotAt>game.time.now) return;
        if (this.bulletPool.countDead()==0) return;
        this.nextShotAt = game.time.now + this.shotDelay;
        var bullet = this.bulletPool.getFirstExists(false);
        bullet.reset(this.player.x+12, this.player.y-44);
        bullet.body.velocity.y = -500;
    },
    movePlayer: function() {
        if(this.mouse.y>=550 && this.mouse.y<=575 && this.mouse.x>=700 && this.mouse.x<=800){
            if(!this.start_y.visible)this.start_y.visible = true;
            if(game.input.activePointer.isDown){
                sound.stop();
                game.state.start('main');
            }
        }
        else if(this.mouse.y>=600 && this.mouse.y<=625 && this.mouse.x>=700 && this.mouse.x<=800){
            if(!this.menu_y.visible)this.menu_y.visible = true;
            if(game.input.activePointer.isDown){
                sound.stop();
                game.state.start('menu');
            }
        }else{
            if(this.start_y.visible || this.menu_y.visible){
                this.start_y.visible = false;
                this.menu_y.visible = false;
            }
        }
        if(game.input.keyboard.isDown(this.fireButton)){
            this.emitter.x = this.player.x+12;
            this.emitter.y = this.player.y-44;
            this.emitter.start(true, 400, null, 10);
            this.fire();
        }
        if (this.cursor.left.isDown) {
            this.player.body.velocity.x = -200;
            this.player.facingLeft = true;
        }
        if (this.cursor.right.isDown) { 
            this.player.body.velocity.x = 200;
            this.player.facingLeft = false;
        } 
        if (this.cursor.up.isDown) { 
            this.player.body.velocity.y = -200;
            this.player.facingLeft = false;
        }  
        if (this.cursor.down.isDown) { 
            this.player.body.velocity.y = 200;
            this.player.facingLeft = false;
        }  
        if (!this.cursor.left.isDown & !this.cursor.right.isDown & !this.cursor.up.isDown & !this.cursor.down.isDown) {
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
        }    
    },
    newDemon: function() {
        var new_demon = game.add.sprite(game.rnd.integerInRange(20, 600), 0, 'demon');
        this.enemyPool.add(new_demon);
        new_demon.anchor.setTo(0.5, 0.5);
        new_demon.animations.add('fly',[0, 1, 2, 3], 8, true);
        new_demon.body.velocity.y = game.rnd.integerInRange(30, 60);
        new_demon.play('fly');
        return new_demon;
    },
    newGoat: function() {
        var new_demon = game.add.sprite(game.rnd.integerInRange(20, 600), 0, 'goat');
        this.goatPool.add(new_demon);
        new_demon.anchor.setTo(0.5, 0.5);
        new_demon.animations.add('fly',[0, 1, 2, 3], 8, true);
        new_demon.body.velocity.y = game.rnd.integerInRange(30, 60);
        new_demon.play('fly');
        return new_demon;
    },
    newBOSS1: function() {
        var new_demon = game.add.sprite(game.rnd.integerInRange(20, 600), 0, 'BOSS1');
        this.BOSSPool.add(new_demon);
        new_demon.anchor.setTo(0.5, 0.5);
        new_demon.animations.add('fly',[0, 1, 2, 3], 8, true);
        new_demon.play('fly');
        return new_demon;
    },
    newBOSS2: function() {
        var new_demon = game.add.sprite(game.rnd.integerInRange(151, 499), 0, 'BOSS2');
        this.BOSSPool.add(new_demon);
        new_demon.anchor.setTo(0.5, 0.5);
        if (level=='easy')this.BOSSblood = 700;
        else this.BOSSblood = 1500;
        this.BOSSDelay = 500;
        this.counter = 0;
        new_demon.body.velocity.x = game.rnd.integerInRange(-40, 40); 
        return new_demon;
    },
    resetMenu: function(){
        game.add.image(0, 0, 'menu_black'); 
        game.add.text(700, 100, 'SCORE:'+this.score, {font: '20px misaki', fill: '#fff', align: 'left'});
        game.add.text(700, 150, 'HEART:'+this.Heart, {font: '20px misaki', fill: '#fff', align: 'left'});
        game.add.text(700, 550, 'RESTART', {font: '20px misaki', fill: '#fff', align: 'left'});
        game.add.text(700, 600, 'MENU', {font: '20px misaki', fill: '#fff', align: 'left'});
        this.start_y = game.add.text(700, 550, 'RESTART', {font: '20px misaki', fill: '#ff0', align: 'left'});
        this.menu_y = game.add.text(700, 600, 'MENU', {font: '20px misaki', fill: '#ff0', align: 'left'});
        this.start_y.visible = false;
        this.menu_y.visible = false;
    } 
};
var sound;
var volume_SE = 10;
var volume_BGM = 10;
var level = 'easy';
var score;
var game = new Phaser.Game(950, 700, Phaser.AUTO, 'canvas');
game.state.add('main', mainState);
game.state.add('menu', menuState);
game.state.add('option', opState);
game.state.add('over', over);
game.state.start('menu');




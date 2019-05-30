
function LoadGame() {
    var _this = this;
    this.btnObj = document.getElementById("start");
    this.ADDRESS_0 = "./res/beginAndEnd/die.png";
    this.ADDRESS_1 = "./res/beginAndEnd/dieFont.png";
    this.ADDRESS_2 = "./res/beginAndEnd/clear.png";
    this.monsterArrs = [];
    this.roleObj = new Image();
    this.roleObj.src = "./res/character4/zamboo-sheet1.png";
    this.RESOURCE_0 = "./res/character4/zamboo-sheet0.png";
    this.RESOURCE_1 = "./res/character4/zamboo-sheet1.png";
    this.RESOURCE_2 = "./res/character4/zamboo-sheet2.png";
    this.landAddress = ["./res/land/land1.png",
        "./res/land/land2_l.png",
        "./res/land/land2_r.png",
        "./res/land/land4_l.png",
        "./res/land/land4_r.png"];
    this.landArrs = [];
    this.monsterAddress = ["./res/monsterDemo/ghost.png",
        "./res/monsterDemo/jellyfish.png",
        "./res/monsterDemo/plant.png",
        "./res/monsterDemo/singleEyes.png",
        "./res/monsterDemo/skull.png",
        "./res/monsterDemo/snake.png"];
    this.currentFrame = 0;
    this.currentHealth = 10;
    this.fullHealth = 10;
    this.deathJudge = false;
    this.bulletObj = new Image();
    this.bulletObj.src = "./res/character4/bullet.png";
    this.bullets = [];
    this.DAMAGE = 1;
    this.monsterBullets1 = [];
    this.monsterBullets2 = [];
    this.isHitLand = false;
    this.isHitPlant1 = false;
    this.isHitPlant2 = false;
    this.isHitGhost = false;
    this.isHitJellyfish = false;
    this.monsterFrame = 0;
    this.ghostFrame = 0;
    this.jellyfishFrame = 0;
    this.plantFrame = 0;
    this.monsterDirection = 0;
    this.ghostDirection = 0;
    this.hitGhost = false;
    this.hitJellyfish = false;
    this.firstHitGhost = true;
    this.direction = 1;
    this.left = 0;
    this.top = 400;
    this.pressed  = false;
    this.isMove = false;
    this.justUpOrDown = false;
    this.isCrush = false;
    this.stopLeft = false;
    this.stopRight = false;
    this.stopUp = false;
    this.stopDown = false;
    this.count = 0;
    this.monsterAngle1 = 0;
    this.monsterAngle2 = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.timer = null;
    this.isTimerReady = false;
    this.plantHitMe = false;
    this.plantHitMe2 = false;
    this.ghostIsDeath = false;
    this.jellyfishIsDeath= false;
    this.plant1IsDeath = false;
    this.plant2IsDeath = false;
    this.monstersNum = 5;
    this.isHitskull = false;
    this.isskullWalkEnd = false;
    this.skullFrame = 0;
    this.skullDirection = 0;
    this.hitskull = false;
    this.firstHitskull = true;
    this.skullIsDeath = false;
    this.enterMenu = false;
    this.fontX = 300;
    this.fontX2 = 230;
    this.fontY = -50;
    this.maloX = 500;
    this.maloY = -50;
    this.titleArrived = false;

    this.init = function (x,y,index,vol,fullVol) {
        var obj = _this.getResource(_this.monsterAddress[index]);
        var dataGroup = {};
        dataGroup.x = x;
        dataGroup.y = y;
        dataGroup.width = obj.width;
        dataGroup.height = obj.height;
        dataGroup.blood = vol;
        dataGroup.fullBlood = fullVol;
        _this.monsterArrs.push(dataGroup);
    }

    this.initSum = function () {
        _this.init(0,255,2,5,5);
        _this.init(810,255,2,5,5);
        _this.init(0,0,0,8,8);
        _this.init(800,0,1,5,5);
        _this.init(780,255,8,8);
    }

    this.getResource = function (str) {
        var landObj = new Image();
        landObj.src = ""+str+"";
        return landObj;
    }

    this.drawLand = function (x,y,index) {
        var obj = _this.getResource(_this.landAddress[index]);
        obj.onload = function () {
            var count = 0;
            ctx.drawImage(obj,0,0,obj.width,obj.height,x,y,obj.width,obj.height);
            for(var i=0;i<_this.landArrs.length;i++){
                if(x!=_this.landArrs[i].x||y!=_this.landArrs[i].y){
                    count++;
                }
            }
            if(count == _this.landArrs.length){
                var land = {};
                land.x = x;
                land.y = y;
                land.width = obj.width;
                land.height = obj.height;
                _this.landArrs.push(land);
            }
            if(!(_this.left+20+40<x||x+obj.width<_this.left+20||_this.top+10+50<y||y+obj.height<_this.top+10)){
                _this.count ++;
            }
        }
    }

    this.drawFunctions = function () {
        _this.drawLand(0,150,1);
        _this.drawLand(375,130,0);
        _this.drawLand(650,150,2);
        _this.drawLand(0,300,3);
        _this.drawLand(500,300,4);
        if(_this.isTimerReady){
            _this.drawPlant1(_this.monsterArrs[0].x,_this.monsterArrs[0].y,3);
            _this.drawPlant2(_this.monsterArrs[1].x,_this.monsterArrs[1].y,2);
        }else {
            _this.drawPlant1(_this.monsterArrs[0].x,_this.monsterArrs[0].y,1);
            _this.drawPlant2(_this.monsterArrs[1].x,_this.monsterArrs[1].y,0);
        }
        _this.drawJellyfish();
        _this.drawskull();
        _this.drawGhost();
        _this.drawAim();
        if(_this.count>0){
            _this.isCrush = true;
            _this.count = 0;
        }else {
            _this.isCrush = false;
        }
    }

    this.drawGhost = function () {
        if(_this.ghostIsDeath == false){
            var obj = _this.getResource(_this.monsterAddress[0]);
            obj.onload = function () {
                _this.isHitGhost = false;
                ctx.drawImage(obj,
                    _this.ghostFrame * obj.width/4,_this.ghostDirection * obj.height/2,
                    obj.width/4,obj.height/2,
                    _this.monsterArrs[2].x,_this.monsterArrs[2].y,
                    obj.width/2,obj.height);
                if(!(_this.left+20+40<_this.monsterArrs[2].x||_this.monsterArrs[2].x+obj.width<_this.left+20||_this.top+10+50<_this.monsterArrs[2].y||_this.monsterArrs[2].y+obj.height<_this.top+10)){
                    _this.hitGhost = true;
                    if(_this.currentHealth>0){
                        _this.currentHealth--;
                        if(_this.currentHealth==0){
                            _this.deathJudge = true;
                        }
                    }
                }else {
                    _this.hitGhost = false;
                }


                for (var i = 0; i < _this.bullets.length; i++) {
                    var obj2 = _this.getResource("./res/character4/bullet.png");
                    for(var j=0;j<_this.landArrs.length;j++){
                        if(!(_this.monsterArrs[2].x+obj.width<_this.bullets[i].x||
                                _this.bullets[i].x+obj2.width<_this.monsterArrs[2].x||
                                _this.monsterArrs[2].y+obj.height<_this.bullets[i].y-26||
                                _this.bullets[i].y+obj2.height-26<_this.monsterArrs[2].y)){
                            _this.isHitGhost = true;
                        }
                    }
                    if(_this.isHitGhost){
                        _this.bullets.splice(i,1);
                        _this.monsterArrs[2].blood-=_this.DAMAGE;
                        if(_this.monsterArrs[2].blood==0){
                            _this.ghostIsDeath = true;
                            _this.monstersNum--;
                        }
                    }
                }
            }
        }else {
            _this.monsterArrs.splice(2,1," ");
        }


    }

    this.drawJellyfish = function () {
        if(_this.jellyfishIsDeath == false){
            var obj = _this.getResource(_this.monsterAddress[1]);
            obj.onload = function () {
                _this.isHitJellyfish = false;
                ctx.drawImage(obj,
                    _this.jellyfishFrame * obj.width/4,0,
                    obj.width/4,obj.height,
                    _this.monsterArrs[3].x,_this.monsterArrs[3].y,
                    obj.width/2,obj.height*2);
                if(!(_this.left+20+40<_this.monsterArrs[3].x||_this.monsterArrs[3].x+obj.width<_this.left+20||_this.top+10+50<_this.monsterArrs[3].y||_this.monsterArrs[3].y+obj.height<_this.top+10)){
                    _this.hitJellyfish = true;
                }else {
                    _this.hitJellyfish = false;
                }


                for (var i = 0; i < _this.bullets.length; i++) {
                    var obj2 = _this.getResource("./res/character4/bullet.png");
                    for(var j=0;j<_this.landArrs.length;j++){
                        if(!(_this.monsterArrs[3].x+obj.width<_this.bullets[i].x||
                                _this.bullets[i].x+obj2.width<_this.monsterArrs[3].x||
                                _this.monsterArrs[3].y+obj.height<_this.bullets[i].y-26||
                                _this.bullets[i].y+obj2.height-26<_this.monsterArrs[3].y)){
                            _this.isHitJellyfish = true;
                        }
                    }
                    if(_this.isHitJellyfish){
                        _this.bullets.splice(i,1);
                        _this.monsterArrs[3].blood-=_this.DAMAGE;
                        if(_this.monsterArrs[3].blood==0){
                            _this.jellyfishIsDeath = true;
                            _this.monstersNum--;
                        }
                    }
                }
            }
        }else {
            _this.monsterArrs.splice(3,1," ");
        }


    }

    this.drawPlant1 = function (x,y,direction) {
        if(_this.plant1IsDeath == false) {
            var obj = _this.getResource(_this.monsterAddress[2]);
            obj.onload = function () {
                _this.isHitPlant1 = false;
                ctx.drawImage(obj,
                    _this.plantFrame * obj.width / 4, direction * obj.height / 4,
                    obj.width / 4, obj.height / 4,
                    x, y,
                    obj.width / 4 * 3, obj.height / 4 * 3);

                for (var i = 0; i < _this.bullets.length; i++) {
                    var obj2 = _this.getResource("./res/character4/bullet.png");
                    for (var j = 0; j < _this.landArrs.length; j++) {
                        if (!(x + obj.width < _this.bullets[i].x ||
                                _this.bullets[i].x + obj2.width < x ||
                                y + obj.height < _this.bullets[i].y - 26 ||
                                _this.bullets[i].y + obj2.height - 26 < y)) {
                            _this.isHitPlant1 = true;
                        }
                    }
                    if (_this.isHitPlant1) {
                        _this.bullets.splice(i, 1);
                        _this.monsterArrs[0].blood -= _this.DAMAGE;
                        if(_this.monsterArrs[0].blood==0){
                            _this.plant1IsDeath = true;
                            _this.monstersNum--;
                        }
                    }
                }

            }
        }else {
            _this.monsterArrs.splice(0,1," ");
        }
    }

    this.drawPlant2 = function (x,y,direction) {
        if(_this.plant2IsDeath == false) {
            var obj = _this.getResource(_this.monsterAddress[2]);
            obj.onload = function () {
                _this.isHitPlant1 = false;
                ctx.drawImage(obj,
                    _this.plantFrame * obj.width / 4, direction * obj.height / 4,
                    obj.width / 4, obj.height / 4,
                    x, y,
                    obj.width / 4 * 3, obj.height / 4 * 3);

                for (var i = 0; i < _this.bullets.length; i++) {
                    var obj2 = _this.getResource("./res/character4/bullet.png");
                    for (var j = 0; j < _this.landArrs.length; j++) {
                        if (!(x + obj.width < _this.bullets[i].x ||
                                _this.bullets[i].x + obj2.width < x ||
                                y + obj.height < _this.bullets[i].y - 26 ||
                                _this.bullets[i].y + obj2.height - 26 < y)) {
                            _this.isHitPlant2 = true;
                        }
                    }
                    if (_this.isHitPlant2) {
                        _this.bullets.splice(i, 1);
                        _this.monsterArrs[1].blood -= _this.DAMAGE;
                        if(_this.monsterArrs[1].blood==0){
                            _this.plant2IsDeath = true;
                            _this.monstersNum--;
                        }
                    }
                }

            }
        }else {
            _this.monsterArrs.splice(1,1," ");
        }
    }

    this.drawskull = function () {
        if(_this.skullIsDeath == false){
            var obj = _this.getResource(_this.monsterAddress[4]);
            obj.onload = function () {
                _this.isHitskull = false;
                ctx.drawImage(obj,
                    _this.skullFrame * obj.width/4,_this.skullDirection * obj.height/2,
                    obj.width/4,obj.height/2,
                    _this.monsterArrs[4].x,_this.monsterArrs[4].y,
                    obj.width/4*2.5,obj.height/2*2.5);
                if(!(_this.left+20+40<_this.monsterArrs[4].x||_this.monsterArrs[4].x+obj.width<_this.left+20||_this.top+10+50<_this.monsterArrs[4].y||_this.monsterArrs[4].y+obj.height<_this.top+10)){
                    _this.hitskull = true;
                    if(_this.currentHealth>0){
                        _this.currentHealth--;
                        if(_this.currentHealth==0){
                            _this.deathJudge = true;
                        }

                    }
                }else {
                    _this.hitskull = false;
                }

                for (var i = 0; i < _this.bullets.length; i++) {
                    var obj2 = _this.getResource("./res/character4/bullet.png");
                    for(var j=0;j<_this.landArrs.length;j++){
                        if(!(_this.monsterArrs[4].x+obj.width<_this.bullets[i].x||
                                _this.bullets[i].x+obj2.width<_this.monsterArrs[4].x||
                                _this.monsterArrs[4].y+obj.height<_this.bullets[i].y-26||
                                _this.bullets[i].y+obj2.height-26<_this.monsterArrs[4].y)){
                            _this.isHitskull = true;
                        }
                    }
                    if(_this.isHitskull){
                        _this.bullets.splice(i,1);
                        _this.monsterArrs[4].blood-=_this.DAMAGE;
                        if(_this.monsterArrs[4].blood==0){
                            _this.skullIsDeath = true;
                            _this.monstersNum--;
                        }
                    }
                }
            }
        }else {
            _this.monsterArrs.splice(4,1," ");
        }


    }

    this.drawMan = function () {
        ctx.clearRect(0,0,c.width,c.height);
        ctx.beginPath();
        var img = new Image();
        img.src = "./res/character4/zamboo.png";
        ctx.drawImage(img,0,0,img.width,img.height,0,0,img.width/2,img.height/2);
        ctx.beginPath();
        ctx.moveTo(100,45);
        ctx.lineTo(100+50,45);
        ctx.lineWidth = 60;
        ctx.lineCap = "round";
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(100,45);
        ctx.lineTo(100+50*(_this.currentHealth/_this.fullHealth),45);
        ctx.lineWidth = 50;
        ctx.lineCap = "round";
        ctx.strokeStyle = "red";
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.font="oblique small-caps 900 30px arial";
        ctx.fillText(_this.currentHealth,80,55);
        ctx.beginPath();
        if(_this.hitJellyfish){
            _this.direction = 0;
            ctx.drawImage(_this.roleObj,
                _this.currentFrame * _this.roleObj.width / 5, _this.direction * _this.roleObj.height,
                _this.roleObj.width / 5, _this.roleObj.height,
                _this.left, _this.top,
                _this.roleObj.width * 1.5 / 5, _this.roleObj.height * 1.5);
        }else {
            if(_this.isMove) {
                ctx.drawImage(_this.roleObj,
                    _this.currentFrame * _this.roleObj.width / 5, _this.direction * _this.roleObj.height / 3,
                    _this.roleObj.width / 5, _this.roleObj.height / 3,
                    _this.left, _this.top,
                    _this.roleObj.width * 1.5 / 5, _this.roleObj.height * 1.5 / 3);
            }else {
                _this.direction = 0;
                ctx.drawImage(_this.roleObj,
                    _this.currentFrame * _this.roleObj.width / 10, _this.direction * _this.roleObj.height,
                    _this.roleObj.width / 10, _this.roleObj.height,
                    _this.left, _this.top,
                    _this.roleObj.width * 1.5 / 10, _this.roleObj.height * 1.5);
            }
        }

    }
    
    this.setBullet = function () {
        var angle = 0;
        var bullet = {};
        var currentBulletX = 0;
        var currentBulletY = 0;
        if(_this.mouseX<_this.left+25){
            currentBulletX = _this.left;
            currentBulletY = _this.top+25;

        }else {
            currentBulletX = _this.left+50;
            currentBulletY = _this.top+25;

        }
        angle = Math.atan2(_this.mouseY - currentBulletY,_this.mouseX - currentBulletX);
        var disX = 50*Math.cos(angle);
        var disY = 50*Math.sin(angle);

        bullet.x = currentBulletX;
        bullet.y = currentBulletY;
        bullet.addX = disX;
        bullet.addY = disY;
        bullet.angle = angle;
        _this.bullets.push(bullet);
    }

    this.setMonsterBullet = function () {
        var bullet1 = {};
        var bullet2 = {};
        bullet1.x = 40;
        bullet1.y = 275;
        bullet2.x = 820;
        bullet2.y = 275;
        bullet1.add = 10;
        bullet2.add = -10;
        if(_this.monsterBullets1!=" "){
            _this.monsterBullets1.push(bullet1);
        }
        if(_this.monsterBullets2!=" "){
            _this.monsterBullets2.push(bullet2);
        }
    }

    this.drawBullet = function () {
        if (_this.bullets.length != 0) {
            for (var i = 0; i < _this.bullets.length; i++) {
                var obj = _this.getResource("./res/character4/bullet.png");
                ctx.save();
                _this.isHitLand = false;
                ctx.translate(_this.bullets[i].x,_this.bullets[i].y);
                ctx.rotate(_this.bullets[i].angle);
                ctx.drawImage(obj, 0, 0, obj.width, obj.height, 0, 0-13, obj.width * 1.5, obj.height * 1.5);
                ctx.restore();
            }

        }
    }

    this.drawMonsterBullet = function () {
        if (_this.monsterBullets1.length != 0) {
            for (var i = 0; i < _this.monsterBullets1.length; i++) {
                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.arc(_this.monsterBullets1[i].x,_this.monsterBullets1[i].y,7,0,Math.PI*2);
                ctx.fill();
                ctx.beginPath();
                ctx.fillStyle = "green";
                ctx.arc(_this.monsterBullets1[i].x,_this.monsterBullets1[i].y,5,0,Math.PI*2);
                ctx.fill();
            }
        }
        if (_this.monsterBullets2.length != 0) {
            for (var i = 0; i < _this.monsterBullets2.length; i++) {
                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.arc(_this.monsterBullets2[i].x,_this.monsterBullets2[i].y,7,0,Math.PI*2);
                ctx.fill();
                ctx.beginPath();
                ctx.fillStyle = "green";
                ctx.arc(_this.monsterBullets2[i].x,_this.monsterBullets2[i].y,5,0,Math.PI*2);
                ctx.fill();
            }
        }
    }

    this.dieAnimations = function () {
        ctx.clearRect(0,0,c.width,c.height);
        var font = _this.getResource(_this.ADDRESS_1);
        var malo1 = _this.getResource(_this.ADDRESS_0);
        ctx.drawImage(font,_this.fontX,_this.fontY,font.width,font.height);
        ctx.drawImage(malo1,_this.maloX,_this.maloY,malo1.width*2,malo1.height*2);

        if(_this.fontY<=100){
            _this.fontY+=6;
        }

        if(_this.fontY>=100){
            _this.titleArrived = true;
        }

        if(_this.titleArrived&&_this.maloY<=200){
            _this.maloY+=6;
        }

        if(_this.enterMenu){
            ctx.clearRect(0,0,c.width,c.height);
            var gameObj = new OpenStage();
            gameObj.animations();
        }else {
            window.requestAnimationFrame(_this.dieAnimations);
        }
    }

    this.clearAnimations = function () {
        ctx.clearRect(0,0,c.width,c.height);
        var font = _this.getResource(_this.ADDRESS_2);
        ctx.drawImage(font,_this.fontX2,_this.fontY,font.width,font.height);

        if(_this.fontY<=100){
            _this.fontY+=6;
        }

        if(_this.enterMenu){
            ctx.clearRect(0,0,c.width,c.height);
            var gameObj = new OpenStage();
            gameObj.animations();
        }else {
            window.requestAnimationFrame(_this.clearAnimations);
        }
    }

    _this.btnObj.onclick = function () {
        _this.enterMenu = true;
    }

    this.update = function () {
        if(_this.plant1IsDeath==false||_this.plant2IsDeath==false) {
            _this.plantFrame = ++_this.plantFrame >= 4 ? 0 : _this.plantFrame;
        }
        if(_this.ghostIsDeath==false){
            _this.ghostFrame = ++_this.ghostFrame >=4 ? 0:_this.ghostFrame;
            _this.monsterAngle1 = Math.atan2(_this.top - _this.monsterArrs[2].y,_this.left - _this.monsterArrs[2].x);
            var disX = 8*Math.cos(_this.monsterAngle1);
            var disY = 8*Math.sin(_this.monsterAngle1);
            if(disX<0){
                _this.ghostDirection = 1;
            }else {
                _this.ghostDirection = 0;
            }
            _this.monsterArrs[2].x+=disX;
            _this.monsterArrs[2].y+=disY;
        }
        if(_this.skullIsDeath==false){
            _this.skullFrame = ++_this.skullFrame >=4 ? 0:_this.skullFrame;
            if(_this.isskullWalkEnd==false){
                _this.monsterArrs[4].x-=10;
                if(_this.monsterArrs[4].x<=500){
                    _this.isskullWalkEnd=true;
                    _this.skullDirection = 1;
                }
            }else {
                _this.monsterArrs[4].x+=10;
                if(_this.monsterArrs[4].x>=780){
                    _this.isskullWalkEnd=false;
                    _this.skullDirection = 0;
                }
            }

        }
        if(_this.jellyfishIsDeath==false){
            _this.jellyfishFrame = ++_this.jellyfishFrame >=4 ? 0:_this.jellyfishFrame;
            _this.monsterAngle2 = Math.atan2(_this.top - _this.monsterArrs[3].y,_this.left - _this.monsterArrs[3].x);
            var disX = 8*Math.cos(_this.monsterAngle2);
            var disY = 8*Math.sin(_this.monsterAngle2);
            _this.monsterArrs[3].x+=disX;
            _this.monsterArrs[3].y+=disY;
        }
        _this.drawFunctions();
        if(_this.isCrush == false){
            _this.stopRight = false;
            _this.stopLeft = false;
            _this.stopUp = false;
            _this.stopDown = false;
        }
        if(_this.hitJellyfish){
            _this.roleObj.src = _this.RESOURCE_2;
            _this.currentFrame = ++_this.currentFrame >=5 ? 0:_this.currentFrame;
        }else {
            if(_this.isMove){
                if(_this.justUpOrDown){
                    _this.currentFrame = 1;
                }else{
                    _this.currentFrame = ++_this.currentFrame >=5 ? 4:_this.currentFrame;
                }
            }else {
                _this.currentFrame = ++_this.currentFrame >=10 ? 0:_this.currentFrame;
            }
        }

        _this.drawMan();
        for (var i = 0; i < _this.bullets.length; i++) {
            var obj = _this.getResource("./res/character4/bullet.png");
            for(var j=0;j<_this.landArrs.length;j++){
                if(!(_this.landArrs[j].x+_this.landArrs[j].width<_this.bullets[i].x||
                        _this.bullets[i].x+obj.width<_this.landArrs[j].x||
                        _this.landArrs[j].y+_this.landArrs[j].height<_this.bullets[i].y-26||
                        _this.bullets[i].y+obj.height-26<_this.landArrs[j].y)){
                    _this.isHitLand = true;
                }

                if(_this.bullets[i].x<0||
                    _this.bullets[i].x+obj.width>800||
                    _this.bullets[i].y<0||
                    _this.bullets[i].y+obj.height>480){
                    _this.isHitLand = true;
                }
            }
            if(_this.isHitLand){
                _this.bullets.splice(i,1);
            }else {
                _this.bullets[i].x += _this.bullets[i].addX;
                _this.bullets[i].y += _this.bullets[i].addY;
            }
        }
        _this.drawBullet();
        if(_this.plant1IsDeath==false||_this.plant2IsDeath==false){
            if(_this.top>100&&_this.top<350&&_this.isTimerReady==false){
                _this.timer = setInterval(_this.setMonsterBullet,900);
                _this.isTimerReady=true;
            }else if(_this.top<=100||_this.top>=350){
                clearInterval(_this.timer);
                _this.isTimerReady=false;
            }
        }

        if(_this.plant1IsDeath==false){
            for (var i = 0; i < _this.monsterBullets1.length; i++) {
                if(_this.monsterBullets1[i].x<0||
                    _this.monsterBullets1[i].x>854||
                    _this.monsterBullets1[i].y<0||
                    _this.monsterBullets1[i].y>480){
                    _this.plantHitMe = true;
                }else {
                    _this.plantHitMe = false;
                }

                if(!(_this.left+20+40<_this.monsterBullets1[i].x||_this.monsterBullets1[i].x<_this.left+20||_this.top+10+50<275||275<_this.top+10)){
                    _this.plantHitMe = true;
                }else {
                    _this.plantHitMe = false;
                }
                if(_this.plantHitMe){
                    _this.monsterBullets1.splice(i,1);
                    if(_this.currentHealth>0){
                        _this.currentHealth--;
                        if(_this.currentHealth==0){
                            _this.deathJudge = true;
                        }
                    }
                }else {
                    _this.monsterBullets1[i].x += _this.monsterBullets1[i].add;
                }

            }
        }else {
            _this.monsterBullets1 = " ";
        }

        if(_this.plant2IsDeath==false) {
            for (var i = 0; i < _this.monsterBullets2.length; i++) {
                if (_this.monsterBullets2[i].x < 0 ||
                    _this.monsterBullets2[i].x > 854 ||
                    _this.monsterBullets2[i].y < 0 ||
                    _this.monsterBullets2[i].y > 480) {
                    _this.plantHitMe2 = true;
                } else {
                    _this.plantHitMe2 = false;
                }

                if (!(_this.left + 20 + 40 < _this.monsterBullets2[i].x || _this.monsterBullets2[i].x < _this.left + 20 || _this.top + 10 + 50 < 275 || 275 < _this.top + 10)) {
                    _this.plantHitMe2 = true;
                } else {
                    _this.plantHitMe2 = false;
                }
                if (_this.plantHitMe2) {
                    _this.monsterBullets2.splice(i, 1);
                    if (_this.currentHealth > 0) {
                        _this.currentHealth--;
                        if (_this.currentHealth == 0) {
                            _this.deathJudge = true;
                        }
                    }
                } else {
                    _this.monsterBullets2[i].x += _this.monsterBullets2[i].add;
                }

            }
        }else {
            _this.monsterBullets2 = " ";
        }
        _this.drawMonsterBullet();
        _this.drawAim();
        if(_this.deathJudge||_this.monstersNum==0){
            if(_this.deathJudge){
                _this.btnObj.style.display = "";
                _this.dieAnimations();
            }
            if(_this.monstersNum==0){
                _this.btnObj.style.display = "";
                _this.clearAnimations();
            }
        }else {
            setTimeout(_this.update,200);
        }
    }

    this.drawAim = function () {
        var obj = _this.getResource("./res/character4/aim.png");
        obj.onload = function () {
            ctx.drawImage(obj, _this.mouseX-obj.width/16, _this.mouseY-obj.height/16,obj.width/8,obj.height/8);
        }
    }

    document.onkeydown = function (ev) {
        ev = event || window.event;
            if(_this.hitJellyfish){
                _this.roleObj.src = _this.RESOURCE_2;
            }else {
                _this.roleObj.src = _this.RESOURCE_0;
            }
            _this.roleObj.onload = function(){
                _this.isMove = true;
                _this.drawFunctions();
                if(ev.keyCode == 65){
                    _this.stopLeft = _this.isCrush;
                    if(_this.stopRight||_this.stopUp||_this.stopDown){
                        _this.stopLeft = false;
                    }

                    if(!_this.hitJellyfish){
                        if(_this.pressed == false){
                            _this.currentFrame = 0;
                        }
                        _this.pressed=true;
                        _this.direction = 0;
                    }
                    if(_this.left > 0 && _this.stopLeft == false) {
                        if(_this.hitJellyfish){
                            _this.left -= 4;
                        }else {
                            _this.left -= 12;
                        }
                    }
                    _this.justUpOrDown = false;
                    _this.drawMan();

                }else if(ev.keyCode == 87){
                    _this.stopUp = _this.isCrush;
                    if(_this.stopRight||_this.stopLeft||_this.stopDown){
                        _this.stopUp = false;
                    }

                    _this.justUpOrDown = true;
                    if(_this.top > 0 && _this.stopUp == false){
                        if(_this.hitJellyfish){
                            _this.top -= 4;
                        }else {
                            _this.top -= 12;
                        }
                    }
                    _this.drawMan();
                }else if(ev.keyCode == 68){
                    _this.stopRight = _this.isCrush;
                    if(_this.stopUp||_this.stopLeft||_this.stopDown){
                        _this.stopRight = false;
                    }

                    if(!_this.hitJellyfish){
                        if(_this.pressed == false){
                            _this.currentFrame = 0;
                        }
                        _this.pressed=true;
                        _this.direction = 1;
                    }
                    if(_this.left < 780 && _this.stopRight == false){
                        if(_this.hitJellyfish){
                            _this.left += 4;
                        }else {
                            _this.left += 12;
                        }
                    }
                    _this.justUpOrDown = false;
                    _this.drawMan();
                }else if(ev.keyCode == 83){
                    _this.stopDown = _this.isCrush;
                    if(_this.stopRight||_this.stopLeft||_this.stopUp){
                        _this.stopDown = false;
                    }

                    _this.justUpOrDown = true;
                    if(_this.top < 400 && _this.stopDown == false){
                        if(_this.hitJellyfish){
                            _this.top += 4;
                        }else {
                            _this.top += 12;
                        }
                    }
                    _this.drawMan();
                }

                _this.drawBullet();
                _this.drawMonsterBullet();
            }


    }

    document.onkeyup = function (ev) {
            ev = event || window.event;
            if (_this.hitJellyfish) {
                _this.roleObj.src = _this.RESOURCE_2;
            } else {
                _this.roleObj.src = _this.RESOURCE_1;
            }
            _this.roleObj.onload = function () {
                if (ev.keyCode == 87) {
                    _this.justUpOrDown = false;
                }

                if (ev.keyCode == 83) {
                    _this.justUpOrDown = false;
                }
                _this.pressed = false;
                _this.isMove = false;
                _this.drawFunctions();
                _this.drawMan();
                _this.drawBullet();
                _this.drawMonsterBullet();
            }

    }

    document.onmousemove = function (ev) {
        ev = event || window.event;
        _this.mouseX = ev.pageX - c.offsetLeft;
        _this.mouseY = ev.pageY - c.offsetTop;
    }

    document.onclick = function (ev) {
        ev = event || window.event;
        if(_this.bullets.length<5){
            _this.setBullet();
        }

    }

    _this.initSum();

}


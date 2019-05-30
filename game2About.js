function LoadGame2() {
    var _this = this;
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
    this.monsterAddress = [
        "./res/monsterDemo/singleEyes.png",
        "./res/monsterDemo/skull.png",
        "./res/monsterDemo/snake.png"];
    this.currentFrame = 0;
    this.currentHealth = 10;
    this.fullHealth = 10;
    this.deathJudge = false;
    this.DAMAGE = 1;
    this.direction = 1;
    this.left = 0;
    this.top = 360;
    this.pressed  = false;
    this.isMove = false;
    this.justUpOrDown = false;
    this.isCrush = false;
    this.stopLeft = false;
    this.stopRight = false;
    this.stopUp = false;
    this.stopDown = false;
    this.count = 0;
    this.isJump = false

    this.isHitskull = false;
    this.isskullWalkEnd = false;
    this.skullFrame = 0;
    this.skullDirection = 0;
    this.hitskull = false;
    this.firstHitskull = true;
    this.skullIsDeath = false;
    this.monsterAngle1 = 0;

    this.init = function (x,y,vol,fullVol) {
        var dataGroup = {};
        dataGroup.x = x;
        dataGroup.y = y;
        dataGroup.blood = vol;
        dataGroup.fullBlood = fullVol;
        _this.monsterArrs.push(dataGroup);
    }

    this.initSum = function () {
        _this.init(780,390,8,8);
    }

    this.getResource = function (str) {
        var obj = new Image();
        obj.src = ""+str+"";
        return obj;
    }

    _this.initSum();

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
        if(_this.hitskull){
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

    this.drawskull = function () {
        if(_this.skullIsDeath == false){
            var obj = _this.getResource(_this.monsterAddress[1]);
            obj.onload = function () {
                _this.isHitskull = false;
                ctx.drawImage(obj,
                    _this.skullFrame * obj.width/4,_this.skullDirection * obj.height/2,
                    obj.width/4,obj.height/2,
                    _this.monsterArrs[0].x,_this.monsterArrs[0].y,
                    obj.width/4*2.5,obj.height/2*2.5);
                if(_this.hitskull){
                    _this.firstHitskull = false;
                }else {
                    _this.firstHitskull = true;
                }
                if(!(_this.left+20+40<_this.monsterArrs[0].x||_this.monsterArrs[0].x+obj.width<_this.left+20||_this.top+10+50<_this.monsterArrs[0].y||_this.monsterArrs[0].y+obj.height<_this.top+10)){
                    _this.hitskull = true;
                    if(_this.currentHealth>0){
                        if(_this.firstHitskull){
                            _this.currentHealth--;
                            if(_this.currentHealth==0){
                                _this.deathJudge = true;
                            }
                        }
                    }
                }else {
                    _this.hitskull = false;
                }
            }
        }else {
            _this.monsterArrs.splice(0,1," ");
        }


    }

    this.drawFunctions = function () {
        _this.drawLand(0,430,4);
        _this.drawLand(250,430,4);
        _this.drawLand(550,430,4);
        /*_this.drawLand(0,270,1);
        _this.drawLand(460,270,4);*/
        _this.drawskull();
        if(_this.count>0){
            _this.isCrush = true;
            _this.count = 0;
        }else {
            _this.isCrush = false;
        }
    }

    this.update = function () {
        if(_this.skullIsDeath==false){
            _this.skullFrame = ++_this.skullFrame >=4 ? 0:_this.skullFrame;
            _this.monsterAngle1 = Math.atan2(_this.top - _this.monsterArrs[0].y,_this.left - _this.monsterArrs[0].x);
            if(_this.isskullWalkEnd==false){
                _this.monsterArrs[0].x-=10;
                if(_this.monsterArrs[0].x<=200){
                    _this.isskullWalkEnd=true;
                    _this.skullDirection = 1;
                }
            }else {
                _this.monsterArrs[0].x+=10;
                if(_this.monsterArrs[0].x>=780){
                    _this.isskullWalkEnd=false;
                    _this.skullDirection = 0;
                }
            }

        }

        if(_this.isCrush == false){
            _this.stopRight = false;
            _this.stopLeft = false;
            _this.stopUp = false;
            _this.stopDown = false;
        }
        if(_this.hitskull){
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

        _this.drawFunctions();
        _this.stopUp = _this.isCrush;
        if(_this.isJump){
            if(_this.top>=270){
                _this.top-=15;
                if(_this.stopUp == true){
                    _this.isJump = false;
                }
            }else{
                _this.isJump = false;
            }
        }
        if(_this.isJump == false){
            if(_this.top<=350){
                _this.top+=15;
            }
        }
        _this.drawMan();
        if(_this.deathJudge){
            alert("Game Over");
            var btnObj = document.getElementById("start");
            btnObj.style.display = "";
            ctx.clearRect(0,0,c.width,c.height);
            var obj = new OpenStage();
            obj.animations();
        }else {
            setTimeout(_this.update,150);
        }
    }

    document.onkeydown = function (ev) {
        ev = event || window.event;
        if(_this.hitskull){
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
                    _this.left -= 12;
                }
                _this.justUpOrDown = false;
                _this.drawMan();

            }else if(ev.keyCode == 87){

                _this.isJump = true;
                if(_this.stopRight||_this.stopLeft||_this.stopDown){
                    _this.stopUp = false;
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
                    _this.left += 12;
                }
                _this.justUpOrDown = false;
                _this.drawMan();
            }else if(ev.keyCode == 83){
                _this.stopDown = _this.isCrush;
                if(_this.stopRight||_this.stopLeft||_this.stopUp){
                    _this.stopDown = false;
                }

                _this.justUpOrDown = true;
                _this.drawMan();
            }
        }


    }

    document.onkeyup = function (ev) {
        ev = event || window.event;
        if (_this.hitskull) {
            _this.roleObj.src = _this.RESOURCE_2;
        } else {
            _this.roleObj.src = _this.RESOURCE_1;
        }
        _this.roleObj.onload = function () {
            _this.drawFunctions();
            if (ev.keyCode == 87) {
                _this.justUpOrDown = false;
            }

            if (ev.keyCode == 83) {
                _this.justUpOrDown = false;
            }
            _this.pressed = false;
            _this.isMove = false;
            _this.drawMan();
        }

    }
}
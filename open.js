function OpenStage(){
    var _this = this;
    this.ADDRESS_0 = "./res/beginAndEnd/beginning.png";
    this.ADDRESS_1 = "./res/beginAndEnd/malo1.png";
    this.ADDRESS_2 = "./res/beginAndEnd/malo2.png";
    this.ADDRESS_3 = "./res/beginAndEnd/role.png";
    this.roleX = -80;
    this.roleY = 255;
    this.maloX = 750;
    this.maloY = 255;
    this.gameObj = null;
    this.btnObj = document.getElementById("start");
    this.enterGame = false;

    this.getResource = function (str) {
        var obj = new Image();
        obj.src = ""+str+"";
        return obj;
    }

    this.animations = function () {
        ctx.clearRect(0,0,c.width,c.height);
        var bg = _this.getResource(_this.ADDRESS_0);
        var role = _this.getResource(_this.ADDRESS_3);
        var malo1 = _this.getResource(_this.ADDRESS_1);
        var malo2 = _this.getResource(_this.ADDRESS_2);
        ctx.drawImage(bg,0,0,bg.width,bg.height);
        ctx.drawImage(role,0,0,role.width,role.height,_this.roleX,_this.roleY,role.width/2,role.height/2);
        if(_this.maloX>=400){
            ctx.drawImage(malo1,_this.maloX,_this.maloY,malo1.width,malo1.height);
        }else {
            ctx.drawImage(malo2,_this.maloX,_this.maloY,malo2.width,malo2.height);
        }

        if(_this.roleX<450){
            _this.roleX+=6;
        }
        if(_this.maloX>160){
            _this.maloX-=6;
        }

        if(_this.enterGame){
            ctx.clearRect(0,0,c.width,c.height);
            _this.gameObj = new LoadGame();
            _this.gameObj.update();
        }else {
            window.requestAnimationFrame(_this.animations);
        }
    }

    _this.btnObj.onclick = function () {
        _this.enterGame = true;
        _this.btnObj.style.display = "none";
    }
}
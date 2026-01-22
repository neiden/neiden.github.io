class Player extends GameObject{
    idleFrame = 0;
    runFrameX = 0;
    runFrameY = 1;

    localX = 0;
    localY = 0;
    direction = 1;
    xVel = 0;
    yVel = 0;
    sprintSpeed = 7;
    baseSpeed = 3;
    baseJump = 20;
    sizeMultiplier = 2;

    static idleState = new IdleState()
    static runState = new RunState()
    static jumpState = new JumpState()

    state = new IdleState()
    

    

    constructor(ctx, x, y, width, height, img, xOffset, yOffset){
        super(ctx, x, y, width, height, img, xOffset, yOffset)
    }


    input(keydown){
        this.state.handleInput(this, keydown);
    }

    changeState(newState){
        if(newState == 'idleState'){
            this.state = Player.idleState;
        }
        else if(newState == 'jumpState'){
            this.state = Player.jumpState;
        }
        else if(newState == 'runState'){
            this.state = Player.runState;
        }
    }

    
    isCollided(){
        if (super.isCollided(this.x + this.xVel, this.y + this.yVel)){
            return true;
        }
        return false;
    }

    isHorizontalCollided(mapObject, horzRect){
        // let vertRect = {
        //     x: this.x + this.xVel,
        //     y: this.y,
        //     width: this.width * this.sizeMultiplier,
        //     height: this.height * this.sizeMultiplier
        // }
        if (horzRect.x >= mapObject.x + mapObject.width){
            return false;
        }
        else if (horzRect.x + horzRect.width <= mapObject.x){
            return false;
        }
        else if (horzRect.y + horzRect.height <= mapObject.y){
            return false;
        }
        else if(horzRect.y >= mapObject.y + mapObject.height){
            return false;
        }
        else{
            return true;
        }
    }

    isIntersected(tile, rect){
        if (rect.x >= tile.x + tile.size){
            return false;
        }
        else if (rect.x + rect.width <= tile.x){
            return false;
        }
        else if (rect.y + rect.height <= tile.y){
            return false;
        }
        else if(rect.y >= tile.y + tile.size){
            return false;
        }
        else{
            return true;
        }
    }

    isVerticalCollided(mapObject, vertRect){
        if (vertRect.x >= mapObject.x + mapObject.width){
            return false;
        }
        else if (vertRect.x + vertRect.width <= mapObject.x){
            return false;
        }
        else if (vertRect.y + vertRect.height <= mapObject.y){
            return false;
        }
        else if(vertRect.y >= mapObject.y + mapObject.height){
            return false;
        }
        else{
            return true;
        }
    }


    idleRender(direction){
        super.playerRender(Math.floor(this.idleFrame / 30) * 32, 0, this.x, this.y, this.sizeMultiplier, direction); 
        this.idleFrame++;
        if (this.idleFrame > 59){
            this.idleFrame = 0;
        }
    }

    runRender(direction){
        super.playerRender(Math.floor(this.runFrameX / 5) * 32, this.runFrameY * 32, this.x, this.y, this.sizeMultiplier, direction); 
        this.runFrameX++;
        if (this.runFrameX > 9){
            this.runFrameX = 0; 
            this.runFrameY++;
        }
        if (this.runFrameY > 2){
            this.runFrameY = 1;
        }
    }

    render(){
        this.state.update(this)
    }




}
class GameObject{

    
    constructor(ctx, x, y, width, height, img, xOffset, yOffset){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = img;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
    }   

    load(){
        
    }



    render(xOffset, yOffset, x , y, size){
        if (size != undefined){
            this.ctx.drawImage(this.img, xOffset, yOffset, this.width, this.height, x, y, this.width * size, this.height * size);
        }
        if(xOffset == undefined || yOffset == undefined || x == undefined || y == undefined){
            this.ctx.drawImage(this.img, this.xOffset, this.yOffset, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        else{
            this.ctx.drawImage(this.img, xOffset, yOffset, this.width, this.height, x, y, this.width, this.height);
        }
    }

    playerRender(xOffset, yOffset, x , y, size, direction){
        if (direction > 0){
            this.ctx.drawImage(this.img, xOffset, yOffset, this.width, this.height, x-10, y, this.width*size, this.height*size);
        }
        else{
            this.ctx.translate(x+this.img.width, y);
            this.ctx.scale(-1,1);
            this.ctx.drawImage(this.img, xOffset, yOffset, this.width, this.height, 15, 0, this.width*size, this.height*size);
            this.ctx.setTransform(1,0,0,1,0,0);
        }
    }
    
}

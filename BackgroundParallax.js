class BackgroundParallax {
    constructor(layers, ctx, width, height){
        this.layers = layers;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        
    }

    render(){
        this.layers.forEach((layer) => {
            this.ctx.drawImage(layer, layer.x, layer.y, this.width, this.height);
        });
    }   



}
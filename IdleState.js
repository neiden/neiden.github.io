class IdleState extends StateInterface{
    //Handle all inputs that occur from idle and change the state of the player object to the corresponding state
    handleInput(player, input){
        
        if (input['left']){
            player.direction = -1;
            player.xVel += -player.baseSpeed;
            player.changeState('runState');
        }
        else if (input['right']){
            player.direction = 1;
            player.xVel += player.baseSpeed;
            player.changeState('runState');
        }
        else if (input['up']){
            player.yVel -= player.baseJump;
            player.changeState('jumpState');
        }
        
    }

    update(player){
        player.idleRender(player.direction)
    }

    toString(){
        return "IdleState"
    }

}   
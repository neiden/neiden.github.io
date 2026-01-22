class JumpState extends StateInterface {
    handleInput(player, input){
        if (input['left']){
            //movement
            player.direction = -1;
            player.xVel = -player.baseSpeed;
        }
        else if (input['right']){
            player.direction = 1;
            player.xVel = player.baseSpeed;
        }
        else if (input['up']){
            //player.yVel = -10;
        }
        else if (input['down']){
            player.changeState('idleState');
        }
    }

    update(player){
        player.idleRender(player.direction)
    }

    toString(){
        return "JumpState"
    }
}
class RunState extends StateInterface{
    handleInput(player, input){
        if (input['shiftLeft'] && input['right'] && input['up']){
            player.yVel = -1 *  player.baseJump;
            player.xVel += player.sprintSpeed;
            player.changeState('jumpState');
            player.direction = 1;
        }
        else if (input['shiftLeft'] && input['left'] && input['up']){
            player.direction = -1;
            player.yVel = -1 * player.baseJump;
            player.xVel += -player.sprintSpeed;
            player.changeState('jumpState');
        }
        else if (input['shiftLeft'] && input['right']){
            player.xVel = player.sprintSpeed;
            player.direction = 1;
        }
        else if(input['shiftLeft'] && input['left']){
            player.xVel = -player.sprintSpeed;
            player.direction = -1;
        }
        else if (input['up'] && input['right']){
            player.yVel = -1 * player.baseJump;
            player.xVel += player.baseSpeed;
            player.changeState('jumpState');
            player.direction = 1;
        }
        else if (input['up'] && input['left']){
            player.direction = -1;
            player.yVel -= player.baseJump;
            player.xVel += -player.baseSpeed;
            player.changeState('jumpState');
        }
        else if (input['up']){
          player.yVel = -1*player.baseJump;
          player.changeState('jumpState')
        }
        else if (input['left']){
            player.direction = -1;
            player.xVel = -player.baseSpeed
        }
        else if (input['right']){
            player.xVel = player.baseSpeed
            player.direction = 1;
        }
        // else if (!input['right'] && !input['left']){
        //     player.changeState('idleState');
        // }
    }

    update(player){
        player.runRender(player.direction)
    }

    toString(){
        return "RunState"
    }
}


function getRandomValue(min, max){
    return Math.floor(Math.random() * max - min ) + min;

}

const game = Vue.createApp({
    data(){
        return{
            monsterPower: 100,
            playerPower: 100,
            rounds: 0,
            message: null,
            logMessages: []
        }
    },
    computed: {
        playerPowFun(){
            return { width:this.playerPower+'%'}
        },
        monsterPowFun(){
            return { width:this.monsterPower+'%'}
        },
        isSpecialAttack(){
            return this.rounds % 3 !== 0;
        }
    },
    watch: {
        playerPower(value){
            if(value <= 0 && this.monsterPower <= 0){
                this.message = "Match Draw!";
            }else if(value <= 0){
                this.message = "Opps! You Lost";
            }
        },
        monsterPower(value){
            if(value <= 0 && this.playerPower <= 0){
                this.message = "Match Draw!";
            }else if(value <= 0){
                this.message = "Congrats! You Win";
            }
        }
    },
    methods: {
        attackMonster(){
            this.rounds++;
            let playerValue = getRandomValue(5,12);
            this.monsterPower -= playerValue;
            this.attackPlayer();
            this.battleLog('monster','attack', playerValue);
        },
        attackPlayer(){
            let playerValue = getRandomValue(8,15);
            this.playerPower -= playerValue;
            this.battleLog('player','attack', playerValue);
        },
        specialAttack(){
            this.rounds++;
            let playerValue = getRandomValue(10,25);
            this.monsterPower -= playerValue;
            this.battleLog('player','attack', playerValue);
        },
        healPlayer(){
            this.rounds++;
            let playerValue = getRandomValue(8,20);
            if(this.playerPower + playerValue > 100){
                this.playerValue = 100;
            }else{
                this.playerPower += playerValue;
            }
            this.attackPlayer();
            this.battleLog('player','heal', playerValue);
        },
        statNewGame(){
            this.playerPower = 100;
            this.monsterPower = 100;
            this.rounds = 0;
            this.message = null;
        },
        surrenderPlayer(){
            this.message = "Opps! You Lost";
        },
        battleLog(who, what, value){
            this.logMessages.unshift({
                attackBy: who,
                attackTo: what,
                attackValue: value
            });
        }
    }
});

game.mount('#game');

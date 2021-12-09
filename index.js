let participants = {};
let rounds = {};

const initialConfig = {
    randomise: true
};

const generate = (pArr, config = initialConfig) => {
    createNewInstance();
    addToParticipantsObj(pArr);
    createTemplateRounds(pArr.length);

    if(config.randomise) {
        let randomisedList = createRandomList(pArr);
        allot(randomisedList);
    } else {
        allot(pArr);
    }

    return {
        participants: participants,
        rounds: rounds
    }
}

const createNewInstance = () => {
    participants = {};
    rounds = {};
}

const addToParticipantsObj = arr => {
    arr.forEach(p => {
        let name = p.trim();
        participants[name] = [...Array(arr.length-1)];
    })
}

const createTemplateRounds = length => {
    for(let i=1; i<=length-1; i++) {
        rounds[`round${i}`] = {players: []};
    }
}

const createRandomList = arr => {
    let newArr = [];
    let list = [...arr];
    while(list.length !== 0) {
        let randomPosition = Math.floor(Math.random() * list.length);
        newArr.push(list[randomPosition]);
        list.splice(randomPosition, 1);
    }
    return newArr;
}

const allot = list => {
    let halfStop = list.length/2;

    for(let i=0; i<list.length; i++) {
        let player = list[i];

        if(i === 0) {
            let opponents = list.slice(i+1);
            for(j=opponents.length-1; j>=0; j--) {
                participants[player][opponents.length-j-1] = opponents[j];
                participants[opponents[j]][opponents.length-j-1] = player;

                addToRound(opponents.length-j, player, opponents[j]);
            }
        } else if(i<halfStop) {
            let opponents = list.slice(i+1, list.length-i);
            for(j=opponents.length-1; j>=0; j--) {
                participants[player][opponents.length-j-1] = opponents[j];
                participants[opponents[j]][opponents.length-j-1] = player;

                addToRound(opponents.length-j, player, opponents[j]);
            }

            let remainingPositions = participants[player]
            .map((match, index) => {if(!match) return index;})
            .filter(value => value);
            let remainingOpponents = list.slice(list.length-i).reverse();

            for(let index in remainingPositions) {
                let position = remainingPositions[index];
                let opponent = remainingOpponents[index];
                participants[player][position] = opponent;
                participants[opponent][position] = player;

                addToRound(position+1, player, opponent);
            }
        } else if(i>=halfStop) {
            break;
        }
    }

    let reversedList = list.reverse();

    for(let i=0; i<reversedList.length; i++) {
        let player = list[i];

        let halfStop = (reversedList.length/2);

        if(i<halfStop) {
            let opponents = reversedList.slice(i+1, halfStop+1);
            let remainingPositions = participants[player]
                .map((match, index) => {if(!match) return index;})
                .filter(value => value);
    
            for(let index in remainingPositions) {
                let position = remainingPositions[index];
                let opponent = opponents[index];
                participants[player][position] = opponent;
                participants[opponent][position] = player;

                addToRound(position+1, player, opponent);
            }
        } else break;
    }
}

const addToRound = (roundNo, player1, player2) => {
    let randomNumber = Math.floor(Math.random() * 2);
    let obj = {
        player1: randomNumber%2 === 0 ? player1 : player2,
        player2: randomNumber%2 === 0 ? player2 : player1
    };
    rounds[`round${roundNo}`].players.push(obj);
}

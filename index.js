let participants = {};
let rounds = {};

export const generate = pArr => {
    createNewInstance();

    addToParticipantsObj(pArr);
    createTemplateRounds(pArr.length);
    let list = createRandomList(pArr);
    allot(list);
    console.log("Participants:   ", participants);
    console.log("Rounds:   ", rounds);

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
        participants[name] = [];
    })
}

const createTemplateRounds = length => {
    for(let i=1; i<=length-1; i++) {
        rounds[`round${i}`] = {fighters: []};
    }
}

const createRandomList = arr => {
    let newArr = [];
    let list = [...arr];
    while(list.length !== 0) {
        let randomPosition = Math.floor(Math.random() * list.length);
        newArr.push(list[randomPosition].trim());
        list.splice(randomPosition, 1);
    }
    return newArr;
}

const allot = list => {
    for(let i=0; i<list.length; i++) {
        let p1 = list[i];

        let j = list.length - (i+1);
        for(j; j>0; j--) {
            participants[p1].push(list[j]);
        }

        if(participants[p1].length !== list.length-1) {
            let k = list.length - 1;
            for(k; k>list.length - (i+1); k--) {
                participants[p1].push(list[k]);
            }
        }
    }

    removeDuplicates(list[0]);
}

const removeDuplicates = firstParticipant => {
    Object.keys(participants).map(fighterId => {
        let opponents = participants[fighterId];
        let isExists = opponents.includes(fighterId);
        if(isExists) {
            let round = opponents.indexOf(fighterId);
            opponents[round] = firstParticipant;
            // firstParticpant[round] = fighterId;
        }
    })
    
    let duplicatesNotExist = Object.keys(participants).every(fighter => participants[fighter].every(o => o !== fighter));
    if(duplicatesNotExist) createRounds();
}

const createRounds = () => {
    for(let i=0; i<Object.keys(rounds).length; i++) {
        let selected = [];
        for(let fighter in participants) {
            let roundOpponent = participants[fighter][i];
            if(!selected.includes(fighter) && !selected.includes(roundOpponent)) {
                selected.push(fighter);
                selected.push(roundOpponent);
                let randomNumber = Math.floor(Math.random() * 2);
                let obj = {
                    fighter1: randomNumber%2 === 0 ? fighter : roundOpponent,
                    fighter2: randomNumber%2 === 0 ? roundOpponent : fighter
                };
                rounds[`round${i+1}`].fighters.push(obj);
            }
        }

        if(rounds[`round${i+1}`].fighters.length !== Object.keys(participants).length/2) {
            let allParticipants = Object.keys(participants);
            let remainingFighters = allParticipants.filter(fighter => !selected.includes(fighter));
            let randomNumber = Math.floor(Math.random() * 2);
            let obj = {
                fighter1: randomNumber%2 === 0 ? remainingFighters[0] : remainingFighters[1],
                fighter2: randomNumber%2 === 0 ? remainingFighters[1] : remainingFighters[0]
            };
            rounds[`round${i+1}`].fighters.push(obj);
        }
    }
    randomiseRounds();
}

const randomiseRounds = () => {
    for(let round in rounds) {
        let roundFights = rounds[round].fighters;
        let randomisedList = [];
        let workingList = [...roundFights];
        while(workingList.length !== 0) {
            let randomPosition = Math.floor(Math.random() * workingList.length);
            randomisedList.push(workingList[randomPosition]);
            workingList.splice(randomPosition, 1);
        }
        rounds[round].fighters = randomisedList;
    }
}

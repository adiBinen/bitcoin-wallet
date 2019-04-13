import storageService from './StorageService';
import utilService from './UtilService';

const USER_KEY = 'user-bitcoin';

export default {
    loadUser,
    signup,
    addMove,
    getMoves
}

function loadUser() {
    // return {
    //     name: "Ochoa Hyde",
    //     coins: 100,
    //     moves: []
    // }
    return storageService.load(USER_KEY);
}

function signup(name) {
    let newUser = {
        _id: utilService.makeId(),
        name,
        coins: 100,
        moves: []
    }
    storageService.store(USER_KEY, newUser);
}

function addMove(contact, amount) {
    // {
    //     toId: "d99e3u2ih329",
    //     to: "Moshiko", 
    //     at: 2652712571, 
    //     amount
    // }
    let currUser = storageService.load(USER_KEY);
    if (!currUser) return null;
    const move = {
        toId: contact._id,
        to: contact.name,
        at: Date.now(),
        amount
    }
    currUser.moves.unshift(move);
    currUser.coins = currUser.coins - amount;
    storageService.store(USER_KEY, currUser);
    return currUser;
}

function getMoves(id) {
    const currUser = storageService.load(USER_KEY);
    if (!id) return currUser.moves.slice(0, 3);
    else return currUser.moves.filter(move => move.toId === id);
}
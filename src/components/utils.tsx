import {cardValues} from "../types/cardValues";

/**
 * Returns size of card depending on width of the window.
 * @param w window width
 */
export function getCardSize(w: number) {
    const size = w;
    const width = size / 7 - 4;
    const height = size / 5 - 4;
    return {width, height}
}

/**
 * Returns numeric value of card.
 * @param val string value
 */
export function getCardValue(val: string) {
    switch (val) {
        case 'A':
            return 1
        case 'K':
            return 13
        case 'Q':
            return 12
        case 'J':
            return 11
        default:
            return parseInt(val)
    }
}

/**
 * Has suitA and suitB different color?
 * @param suitA
 * @param suitB
 */
export function hasDifferentColor(suitA: string, suitB: string) {
    if (suitA === 'H' || suitA === 'D') {
        return suitB === 'C' || suitB === 'S'
    } else {
        return suitB === 'H' || suitB === 'D';
    }
}

/**
 * Is the target card one value higher than moving card?
 * @param target
 * @param moving
 */
export function hasNextValue(target: string, moving: string) {
    switch (target) {
        case '2':
            return moving === 'A'
        case 'K':
            return moving === 'Q'
        case 'Q':
            return moving === 'J'
        case 'J':
            return moving === '10'
        default:
            return parseInt(moving) === (parseInt(target) - 1)
    }
}

/**
 * Creates deck of all possible cards.
 */
export function createDeck() {
    const suits = ['C', 'D', 'H', 'S'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck: cardValues[] = [];

    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push({value: values[j], suit: suits[i], numValue: getCardValue(values[j]), faceDown: false, x: 0, y:0});
        }
    }
    return deck;
}

/**
 * Shuffles deck.
 * @param d deck
 */
export function shuffle(d: any[]) {
    let deck = d;
    for (let i = d.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [d[i - 1], d[j]] = [d[j], d[i - 1]];
    }
    return deck;
}

/**
 * Map of cards images -> value - image
 */
export const imageMap = {
    '2C': require('../cards/2C.png'),
    '2D': require('../cards/2D.png'),
    '2H': require('../cards/2H.png'),
    '2S': require('../cards/2S.png'),
    '3C': require('../cards/3C.png'),
    '3D': require('../cards/3D.png'),
    '3H': require('../cards/3H.png'),
    '3S': require('../cards/3S.png'),
    '4C': require('../cards/4C.png'),
    '4D': require('../cards/4D.png'),
    '4H': require('../cards/4H.png'),
    '4S': require('../cards/4S.png'),
    '5C': require('../cards/5C.png'),
    '5D': require('../cards/5D.png'),
    '5H': require('../cards/5H.png'),
    '5S': require('../cards/5S.png'),
    '6C': require('../cards/6C.png'),
    '6D': require('../cards/6D.png'),
    '6H': require('../cards/6H.png'),
    '6S': require('../cards/6S.png'),
    '7C': require('../cards/7C.png'),
    '7D': require('../cards/7D.png'),
    '7H': require('../cards/7H.png'),
    '7S': require('../cards/7S.png'),
    '8C': require('../cards/8C.png'),
    '8D': require('../cards/8D.png'),
    '8H': require('../cards/8H.png'),
    '8S': require('../cards/8S.png'),
    '9C': require('../cards/9C.png'),
    '9D': require('../cards/9D.png'),
    '9H': require('../cards/9H.png'),
    '9S': require('../cards/9S.png'),
    '10C': require('../cards/10C.png'),
    '10D': require('../cards/10D.png'),
    '10H': require('../cards/10H.png'),
    '10S': require('../cards/10S.png'),
    'JC': require('../cards/JC.png'),
    'JD': require('../cards/JD.png'),
    'JH': require('../cards/JH.png'),
    'JS': require('../cards/JS.png'),
    'QC': require('../cards/QC.png'),
    'QD': require('../cards/QD.png'),
    'QH': require('../cards/QH.png'),
    'QS': require('../cards/QS.png'),
    'KC': require('../cards/KC.png'),
    'KD': require('../cards/KD.png'),
    'KH': require('../cards/KH.png'),
    'KS': require('../cards/KS.png'),
    'AC': require('../cards/AC.png'),
    'AD': require('../cards/AD.png'),
    'AH': require('../cards/AH.png'),
    'AS': require('../cards/AS.png'),
    'BG': require('../cards/back.png')
}

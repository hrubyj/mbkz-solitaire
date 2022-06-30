import {createDeck, getCardSize, getCardValue, hasDifferentColor, hasNextValue, shuffle} from "./utils";
import React, {useState} from "react";

import Column from "./column";
import {cardValues} from "../types/cardValues";
import {Alert, Button, Dimensions, View} from "react-native";
import Stock from "./stock";
import Foundation from "./foundation";

const {width} = Dimensions.get('window');

const Table = () => {

    const [foundationsState, setFoundationsState] = useState<cardValues[][]>([]);
    const [columnsState, setColumnsState] = useState<cardValues[][]>([]);
    const [deckState, setDeckState] = useState<cardValues[]>([]);
    const [selected, setSelected] = useState(15);

    /**
     * Prepares new game.
     */
    const shuffleCards = () => {
        const columns: cardValues[][] = [];
        const foundations: cardValues[][] = [];
        const deck = shuffle(createDeck());

        for (let i = 0; i < 7; i++) {
            let temp: cardValues[] = [];
            for (let j = 0; j <= i; j++) {
                const card = deck.pop();
                if (j === 0) {
                    temp.push({
                        value: card.value, suit: card.suit,
                        x: i * (getCardSize(width).width + 4) + 2, y: 0,
                        numValue: card.numValue,
                        faceDown: i !== j
                    });
                } else {
                    temp.push({
                        value: card.value, suit: card.suit,
                        x: 0, y: -1 * (getCardSize(width).height * 0.8),
                        numValue: card.numValue,
                        faceDown: i !== j
                    });
                }
            }
            columns.push(temp);
        }

        for (let i = 0; i < 4; i++) {
            foundations.push([])
        }
        deck.push({})
        setDeckState(deck);
        setColumnsState(columns);
        setFoundationsState(foundations);
    }

    if (columnsState.length === 0) {
        shuffleCards();
    }

    const checkMove = (to: number, value: string, suit: string) => {
        if (to > 6) {
            return checkMoveToFoundation(to, value, suit);
        } else {
            return checkMoveToColumn(to, value, suit);
        }
    }

    const checkMoveToColumn = (to: number, value: string, suit: string) => {
        const toColumn = columnsState[to];

        if (toColumn.length === 0) {
            return true
        }

        const targetCard = toColumn[toColumn.length - 1];
        return hasDifferentColor(suit, targetCard.suit) && hasNextValue(targetCard.value, value);
    }

    const checkMoveToFoundation = (to: number, value: string, suit: string) => {
        const foundationIndex = to - 7
        const toColumn = foundationsState[foundationIndex];

        if (toColumn.length === 0) {
            return value === 'A';
        }

        const targetCard = toColumn[toColumn.length - 1];
        return suit === targetCard.suit && hasNextValue(value, targetCard.value);
    }

    const moveCard = (from: number, to: number, cardValue: string) => {
        if (to > 6) {
            moveCardToFoundation(from, to, cardValue);
        } else {
            moveCardToColumn(from, to, cardValue);
        }
    }

    const moveCardToFoundation = (from: number, to: number, cardValue: string) => {
        const tempFounds: cardValues[][] = [...foundationsState];
        const foundationIndex = to - 7
        const toColumn = tempFounds[foundationIndex];

        const tempCols: cardValues[][] = [...columnsState];
        const fromColumn = [...tempCols[from]];

        const index = fromColumn.findIndex(card => card.value + card.suit === cardValue);
        const movingCards = fromColumn.splice(index, fromColumn.length);

        for (const movingCard of movingCards) {
            toColumn.push(movingCard)
        }
        if (fromColumn.length !== 0) {
            fromColumn[fromColumn.length - 1].faceDown = false;
        }
        tempCols[from] = fromColumn;
        tempFounds[foundationIndex] = toColumn.map((i, index) => ({...i, x: 0, y: 0}));
        setColumnsState(tempCols);
        setFoundationsState(tempFounds);
    }

    const moveCardToColumn = (from: number, to: number, cardValue: string) => {
        const temp: cardValues[][] = [...columnsState];
        const fromColumn = [...temp[from]];
        const toColumn = [...temp[to]];

        const index = fromColumn.findIndex(card => card.value + card.suit === cardValue);
        const movingCards = fromColumn.splice(index, fromColumn.length);

        for (const movingCard of movingCards) {
            toColumn.push(movingCard)
        }
        if (fromColumn.length !== 0) {
            fromColumn[fromColumn.length - 1].faceDown = false;
        }
        temp[from] = fromColumn;
        temp[to] = toColumn.map((i, index) => index == 0 ?
            ({...i, x: to * (getCardSize(width).width + 4) + 2, y: 0}) :
            ({...i, x: 0, y: -1 * (getCardSize(width).height * 0.8)})
        );
        setColumnsState(temp);
    }

    const moveStockCard = (to: number, card: cardValues) => {
        if (to > 6) {
            moveStockCardToFoundation(to, card);
        } else {
            moveStockCardToColumn(to, card);
        }
    }

    const moveStockCardToColumn = (to: number, card: cardValues) => {
        const temp: cardValues[][] = [...columnsState];
        const toColumn = [...temp[to]];
        toColumn.push(card)

        temp[to] = toColumn.map((i, index) => index == 0 ?
            ({...i, x: to * (getCardSize(width).width + 4) + 2, y: 0, numValue: getCardValue(i.value)}) :
            ({...i, x: 0, y: -1 * (getCardSize(width).height * 0.8),  numValue: getCardValue(i.value)})
        );

        setColumnsState(temp);
    }

    const moveStockCardToFoundation = (to: number, card: cardValues) => {
        const foundationIndex = to - 7
        const temp: cardValues[][] = [...foundationsState];
        const toColumn = [...temp[foundationIndex]];
        toColumn.push(card)

        temp[foundationIndex] = toColumn.map((i, index) => ({...i, x: 0, y: 0}));
        setFoundationsState(temp);
    }

    if (foundationsState.length !== 0 && foundationsState[0].length === 13 && foundationsState[1].length === 13
        && foundationsState[2].length === 13 && foundationsState[3].length === 13) {
        Alert.alert('Win', 'You won!');
        shuffleCards();
    }

    return (
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', bottom: 10}}>
                <Button title={'Restart'} onPress={shuffleCards}/>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', bottom: 10}}>
                <View>
                    <Stock initCards={deckState} checkMove={checkMove} moveCard={moveStockCard}/>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Foundation initCards={foundationsState[0]}/>
                    <Foundation initCards={foundationsState[1]}/>
                    <Foundation initCards={foundationsState[2]}/>
                    <Foundation initCards={foundationsState[3]}/>
                </View>
            </View>
            <Column key={'col1'} columnId={0} cards={columnsState[0]} checkMove={checkMove}
                    moveCard={moveCard} selected={selected} setSelected={setSelected}/>
            <Column key={'col2'} columnId={1} cards={columnsState[1]} checkMove={checkMove}
                    moveCard={moveCard} selected={selected} setSelected={setSelected}/>
            <Column key={'col3'} columnId={2} cards={columnsState[2]} checkMove={checkMove}
                    moveCard={moveCard} selected={selected} setSelected={setSelected}/>
            <Column key={'col4'} columnId={3} cards={columnsState[3]} checkMove={checkMove}
                    moveCard={moveCard} selected={selected} setSelected={setSelected}/>
            <Column key={'col5'} columnId={4} cards={columnsState[4]} checkMove={checkMove}
                    moveCard={moveCard} selected={selected} setSelected={setSelected}/>
            <Column key={'col6'} columnId={5} cards={columnsState[5]} checkMove={checkMove}
                    moveCard={moveCard} selected={selected} setSelected={setSelected}/>
            <Column key={'col7'} columnId={6} cards={columnsState[6]} checkMove={checkMove}
                    moveCard={moveCard} selected={selected} setSelected={setSelected}/>
        </View>
    )

}
export default Table;

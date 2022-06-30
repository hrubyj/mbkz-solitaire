import React, {useState} from 'react';
import {Dimensions, PanResponderGestureState, TouchableWithoutFeedback, View} from 'react-native';

import {cardValues} from "../types/cardValues";
import Card from "./card";
import Draggable from "react-native-draggable/Draggable";
import {getCardSize} from "./utils";

const {width} = Dimensions.get('window');

interface StockProps {
    initCards: (cardValues)[]; //init stock cards
    checkMove: (to: number, value: string, suit: string) => boolean; //callback to check move
    moveCard: (to: number, card: cardValues) => void; //callback to move card from stock
}

const Stock = ({ initCards, checkMove, moveCard }: StockProps) => {

    const [cards, setCards] = useState<cardValues[]>([]);
    const [shownTrio, setShownTrio] = useState<cardValues[]>([])
    const [touches, setTouches] = useState(0)

    const onDragRelease = (state: PanResponderGestureState, card: cardValues) => {
        const targetY = state.dy
        const cardWidth = getCardSize(width).width
        const cardMiddleX = (cardWidth + ((touches-1)*10)) + (cardWidth / 2);
        const targetX = cardMiddleX + state.dx;
        let targetColumnIndex = Math.trunc((targetX) / cardWidth);
        targetColumnIndex = targetColumnIndex > 6 ? 6 : targetColumnIndex;
        targetColumnIndex = targetColumnIndex < 0 ? 0 : targetColumnIndex;

        if (targetY > -20 && targetY < 20) {
            targetColumnIndex += 4;
        }
        if (checkMove(targetColumnIndex, card.value, card.suit)) {
            moveCard(targetColumnIndex, card);
            deleteCardFromStock();
        }
    }

    const renderCards = () => {
        return shownTrio.map((card, i) => {
            let source = card.value + card.suit;
            if (i < shownTrio.length-1) {
                return (
                    <View key={source} style={{position: 'absolute', left: i * 10}}>
                        <Card image={source}/>
                    </View>
                )
            } else {
                return (
                    <View key={source} style={{position: 'absolute', left: i * 10}}>
                        <Draggable shouldReverse onDragRelease={(e, gestureState) =>
                                       onDragRelease(gestureState, card)}>
                            <Card image={source}/>
                        </Draggable>
                    </View>
                )
            }
        })
    }


    const getShownCards = (c: number, cards: cardValues[]) => {
        let shownTrio = [];
        const count = cards.length < c ? cards.length : c;
        for (let i = 0; count > i; i++) {
            shownTrio.push(cards[i]);
        }
        return shownTrio;
    }

    const nextThree = () => {
        if (cards.length === 0) {
            return;
        }
        let tempCards = [...cards]
        let tempTchs = touches
        if (touches < 3) {
            tempTchs++;
        } else if (touches === 3) {
            // @ts-ignore
            tempCards.push(tempCards.shift());
        }
        setCards(tempCards);
        setShownTrio(getShownCards(tempTchs, tempCards));
        setTouches(tempTchs);
    }


    const deleteCardFromStock = () => {
        const temp = [...cards];
        temp.splice(touches-1, 1);
        const tempTchs = touches-1;
        setTouches(tempTchs);
        setCards(temp);
        setShownTrio(getShownCards(tempTchs, temp));
    }

    if (initCards.length === 25) {
        initCards.splice(initCards.length-1, 1);
        setTouches(0);
        setCards(initCards);
        setShownTrio(getShownCards(0, initCards));
    }

    const size = getCardSize(width);

    return (
        <View style={{flexDirection: 'row'}}>
            <TouchableWithoutFeedback onPress={() => nextThree()}>
                <View style={{width: size.width, height: size.height, borderWidth: 1, margin: 2, borderRadius: 5}}>
                    <Card image={'BG'}/>
                </View>
            </TouchableWithoutFeedback>
            <View style={{width: size.width, height: size.height, margin: 2, borderRadius: 5}}>
                <View style={{flexDirection: 'row'}}>
                    {renderCards()}
                </View>
            </View>
        </View>
    )
}
export default Stock;

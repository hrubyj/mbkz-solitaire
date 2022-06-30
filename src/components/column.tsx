import {Dimensions, PanResponderGestureState, View} from "react-native";
import {getCardSize} from "./utils";
import React from "react";
import Draggable from "react-native-draggable/Draggable";
import {cardValues} from "../types/cardValues";
import Card from "./card";

interface ColumnProps {
    columnId: number; // column index
    cardIndex?: number; // current card index
    cards: (cardValues)[]; // cards
    selected: number; // value of the selected card
    setSelected: (val: number) => void; // callback to select card
    checkMove: (to: number, value: string, suit: string) => boolean; // callback to check move
    moveCard: (from: number, to: number, cardValue: string) => void; // callback to move card
}

const {width} = Dimensions.get('window');

const Column = ({ columnId, cardIndex = 0, cards, checkMove, moveCard, selected, setSelected }: ColumnProps) => {

    const onPress = (val: number) => {
        setSelected(val);
    }

    const onDragRelease = (state: PanResponderGestureState, value: string, suit: string) => {
        const targetY = state.dy
        const cardWidth = getCardSize(width).width
        const cardMiddleX = (cardWidth * columnId) + (cardWidth / 2);
        const targetX = cardMiddleX + state.dx;
        let targetColumnIndex = Math.trunc((targetX) / cardWidth);
        targetColumnIndex = targetColumnIndex > 6 ? 6 : targetColumnIndex;
        targetColumnIndex = targetColumnIndex < 0 ? 0 : targetColumnIndex;

        if (targetY < -70) {
            targetColumnIndex += 4;
        }
        if (checkMove(targetColumnIndex, value, suit)) {
            moveCard(columnId, targetColumnIndex, value+suit)
        }

        setSelected(15);
    }

    if (cards && cards.length !== 0) {
        const card: cardValues = cards[cardIndex];
        if (card) {
            const image: string = card.faceDown ? 'BG' : card.value + card.suit;
            if (cardIndex+1 < cards.length) { // is card last in column?
                return (
                    <View>
                        <Draggable key={'drag' + card.value + card.suit} x={card.x} y={card.y} shouldReverse disabled={card.faceDown || selected < card.numValue}
                                   onDragRelease={(e, gestureState) =>
                                       onDragRelease(gestureState, card.value, card.suit)}
                                   onPressIn={(() => onPress(card.numValue))}>
                            <Card key={card.value + card.suit} image={image}/>
                            <Column columnId={columnId} cards={cards} cardIndex={cardIndex+1} checkMove={checkMove} moveCard={moveCard} selected={selected} setSelected={setSelected}/>
                        </Draggable>
                    </View>
                );
            }
            return (
                <View>
                    <Draggable key={'drag' + card.value + card.suit} x={card.x} y={card.y} shouldReverse disabled={card.faceDown || selected < card.numValue}
                               onDragRelease={(e, gestureState) =>
                                   onDragRelease(gestureState, card.value, card.suit)}
                               onPressIn={(() => onPress(card.numValue))}>
                        <Card key={card.value + card.suit} image={image}/>
                    </Draggable>
                </View>
            );
        }
    }
    return null
}
export default Column;


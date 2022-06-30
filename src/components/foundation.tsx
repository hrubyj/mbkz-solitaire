import React, {Component, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {getCardSize} from './utils';
import Card from "./card";
import {cardValues} from "../types/cardValues";

const {width} = Dimensions.get('window');

interface FoundationProps {
    initCards: (cardValues)[];
}

const Foundation = ({initCards}: FoundationProps) => {

    const renderCards = () => {
        if (initCards.length === 0) {
            return (
                <View style={{position: 'absolute'}}/>
            )
        }

        const card = initCards[initCards.length-1];
        return (
            <View key={card.value + card.suit} style={{position: 'absolute'}}>
                <Card image={card.value + card.suit}/>
            </View>
        )

    }

    const size = getCardSize(width);
    return (
        <View style={{width: size.width, height: size.height, borderWidth: 1, margin: 2, borderRadius: 5,}}>
            {renderCards()}
        </View>
    )

}
export default Foundation;

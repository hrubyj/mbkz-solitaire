import {Dimensions, Image} from "react-native";
import {getCardSize, imageMap} from "./utils";
import React from "react";

interface ImageName {
    image: string;
}

const { width } = Dimensions.get('window');

const Card = ({ image }: ImageName) => {

    // @ts-ignore
    return (<Image source={imageMap[image]}
                style={{
                    height: getCardSize(width).height,
                    width: getCardSize(width).width,
                    borderRadius: 5,
                    borderWidth: 1
                }}
            />);

}
export default Card;


import {ImageBackground, View} from 'react-native';
import background from './src/cards/background.jpg';
import Table from "./src/components/table";


export default function App() {
    return (
        <View style={{flex: 1}}>
            <ImageBackground  source={background} resizeMode="cover" style={{flex: 1, justifyContent: "flex-start"}}>
                <View style={{top: 100}}>
                    <Table/>
                </View>
            </ImageBackground>
        </View>
    );
}

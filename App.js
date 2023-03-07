import { useRef } from 'react';
import { Platform, View, StatusBar, BackHandler, Alert } from 'react-native';
import { WebView } from "react-native-webview";

export default function App() {

    const webViewRef = useRef();



    let count = 0;
    BackHandler.addEventListener('hardwareBackPress', () => {
        const sendData = "뒤로가기";
        if (count >= 1) {
            Alert.alert("", "앱을 종료하시겠습니까?", [
                {
                    text: "아니오",
                    onPress: () => null,
                    style: "cancel"
                },
                {
                    text: "네",
                    onPress: () => { BackHandler.exitApp() }
                }
            ]);
        } else {
            webViewRef.current.goBack();
        }
        setTimeout(() => {
            count = 0;
        }, 500)
        webViewRef.current.postMessage(sendData);
        count++;
        return true;
    });

    // 웹뷰에서 데이터를 받을 때 필요한 함수입니다. 
    const handleOnMessage = (e) => {
        alert(e.nativeEvent.data);
    };
    return Platform.OS === "web" ? (

        // 회원 수첩이였음
        // <iframe src="http://192.168.0.14:3000/" height={'100%'} width={'100%'} style={{ border: "none" }} />
        <iframe src="https://jcidg.com/" height={'100%'} width={'100%'} style={{ border: "none" }} />
    ) : (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor={"#503aff"} />
            <WebView
                ref={webViewRef}
                source={{ uri: "https://jcidg.com/" }}
            // source={{ uri: "http://192.168.0.14:3000/" }}
            />
        </View>
    )
}

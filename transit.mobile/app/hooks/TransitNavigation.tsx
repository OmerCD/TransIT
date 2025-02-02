import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Register: undefined;
};

const useTransitNavigation = () => {
    return useNavigation<NativeStackNavigationProp<RootStackParamList>>();
}

export {useTransitNavigation};
    
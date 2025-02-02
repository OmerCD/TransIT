import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "./Home";
import {Button, StyleSheet, View} from "react-native";
import {useAuth} from "../context/AuthContext";
import Listings from "./Listings";

const Main = () => {
    const Tab = createBottomTabNavigator();
    const {onLogout} = useAuth();
    return (
        <Tab.Navigator
            screenOptions={{
                headerRight: () => (
                    <View style={styles.logoutButton}>
                        <Button onPress={onLogout} title="Çıkış Yap"/>
                    </View>
                ),
            }}
        >
            <Tab.Screen
                options={{title: `Anasayfa`}}
                name={`Home`} component={Home}/>
            <Tab.Screen
                options={{title: `İlanlar`}}
                name={`Listings`} component={Listings}/>
        </Tab.Navigator>
    )
};

const styles = StyleSheet.create({
    logoutButton: {
        marginRight: 10,
    }
});

export default Main;
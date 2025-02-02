import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useAuth} from "./app/context/AuthContext";
import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import Login from "./app/screens/Login";
import {Colors} from "./app/constants/style-constants";
import Register from "./app/screens/Register";
import Main from "./app/screens/Main";

const Stack = createNativeStackNavigator();

export const Layout = () => {
    const {authState} = useAuth();
    return (
        <NavigationContainer theme={darkTheme}>
            <Stack.Navigator>
                {authState?.authenticated ? (
                    <Stack.Screen name={`Main`}
                                  component={Main}
                                  options={{
                                      headerShown: false,
                                  }}
                    />
                ) : (
                    <>
                        <Stack.Screen name={`Login`}
                                      options={{title: 'Kullanıcı Girişi'}}
                                      component={Login}/>
                        <Stack.Screen navigationKey={'Register'}
                                      options={{title: 'Kayıt Ol'}}
                                      name={`Register`} component={Register}/>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const darkTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: Colors.backgroundColor,
        primary: Colors.primaryColor,
        card: Colors.secondaryColor,
        text: Colors.textColor,
        border: Colors.borderColor
    }
}
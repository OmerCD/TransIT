import {Button, Image, StyleSheet, Text, TextInput, View} from "react-native";
import {useState} from "react";
import {useAuth} from "../context/AuthContext";
import {AuthError, CheckAuthError} from "../../services/AuthService";
import {Colors} from "../constants/style-constants";
import {useTransitNavigation} from "../hooks/TransitNavigation";

const Login = () => {
    const [email, setEmail] = useState("omercd@hotmail.com.tr");
    const [password, setPassword] = useState("123456");
    const {onLogin} = useAuth();
    const navigation = useTransitNavigation();

    const login = async () => {
        const result = await onLogin!(email, password);
        if (result && CheckAuthError(result)) {
            const authError = result as AuthError;
            alert(authError.msg);
        }
    }

    const navigateToRegisterPage = () => {
        navigation.navigate('Register');
    }

    return (
        <View style={styles.container}>
            <Image source={require("../../assets/logo.png")} style={styles.image}/>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder={`E-Posta`}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder={`Şifre`}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                />
                <Button color={Colors.primaryColor} title={`Giriş`} onPress={login}/>
            </View>
            <View style={styles.registerView}>
                <Text style={styles.registerText}
                      onPress={navigateToRegisterPage}
                >
                    Kayıt Ol
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: `50%`,
        height: `50%`,
        resizeMode: `contain`
    },
    form: {
        gap: 10,
        width: `80%`
    },
    input: {
        height: 64,
        borderWidth: 2,
        borderRadius: 4,
        padding: 10,
        backgroundColor: `#fff`,
        fontSize: 21
    },
    container: {
        alignItems: `center`,
        width: `100%`,
    },
    registerView: {
        alignItems: `flex-end`,
        width: `80%`
    },
    registerText: {
        color: `blue`,
        fontSize: 18,
        marginTop: 20,
        textDecorationLine: "underline"
    }
});

export default Login;
import {Button, Image, StyleSheet, Text, TextInput, View} from "react-native";
import {useState} from "react";
import {Colors} from "../constants/style-constants";
import {AuthError, CheckAuthError} from "../../services/AuthService";
import {useAuth} from "../context/AuthContext";
import {useNavigation} from "@react-navigation/native";

class RegisterUserInfo {
    username: string = "DeepNightBlueSky";
    email: string = "semaozturk@gmail.com";
    firstName: string = "Sema";
    lastName: string = "Danacioglu";
    password: string = "123456";
    confirmPassword: string = "123456";
}

const Register = () => {
    const [userInfo, setUserInfo] = useState<RegisterUserInfo>(new RegisterUserInfo());
    const {onRegister} = useAuth();
    const navigation = useNavigation();

    async function register() {
        const result = await onRegister!(userInfo);
        if (!(result && CheckAuthError(result))) {
            navigation.navigate('Login');
        }
    }

    return (
        <View style={styles.container}>
            <Image source={require("../../assets/logo.png")} style={styles.image}/>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder={`E-Posta`}
                    value={userInfo.email}
                    onChangeText={(text) => setUserInfo({...userInfo, email: text})}
                />
                <TextInput
                    style={styles.input}
                    placeholder={`Kullanıcı Adı`}
                    value={userInfo.username}
                    onChangeText={(text) => setUserInfo({...userInfo, username: text})}
                />
                <TextInput
                    style={styles.input}
                    placeholder={`Ad`}
                    value={userInfo.firstName}
                    onChangeText={(text) => setUserInfo({...userInfo, firstName: text})}
                />
                <TextInput
                    style={styles.input}
                    placeholder={`Soyad`}
                    value={userInfo.lastName}
                    onChangeText={(text) => setUserInfo({...userInfo, lastName: text})}
                />
                <TextInput
                    style={styles.input}
                    placeholder={`Şifre`}
                    value={userInfo.password}
                    onChangeText={(text) => setUserInfo({...userInfo, password: text})}
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    placeholder={`Şifre Tekrar`}
                    value={userInfo.confirmPassword}
                    onChangeText={(text) => setUserInfo({...userInfo, confirmPassword: text})}
                    secureTextEntry={true}
                />
                <Button color={Colors.primaryColor} title={`Kayıt Ol`} onPress={register}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: `50%`,
        height: `30%`,
        resizeMode: `contain`
    },
    container: {
        alignItems: `center`,
        width: `100%`,
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
    }
});

export default Register;
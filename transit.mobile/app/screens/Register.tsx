import {StyleSheet, Text, TextInput, View} from "react-native";
import {useState} from "react";

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
    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder={`E-Posta`}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{},
    form:{},
    input:{}
});

export default Register;
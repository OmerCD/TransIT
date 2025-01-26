import {Text, View} from "react-native";
import {useAuthService} from "../../services/AuthService";
import {useEffect, useState} from "react";

const Home = () => {
    const authService = useAuthService();
    const [tempData, setTempData] = useState()

    useEffect(() => {
        const testCall = async () => {
            const axiosClient = authService.getAxiosClient();
            const result = await axiosClient.get(`/authentication/test`);
            setTempData(result.data);
        }

        testCall();
    }, []);

    return (
        <View>
            <Text>Home</Text>
            <Text>{tempData}</Text>
        </View>
    )
};

export default Home;
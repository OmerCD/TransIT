﻿import {Platform} from "react-native";
import * as SecureStore from "expo-secure-store";

class StorageService {
    async setItem(key: string, value: string) {
        if (Platform.OS === `web`) {
            localStorage.setItem(key, value);
        } else {
            await SecureStore.setItemAsync(key, value);
        }
    }

    async getItem(key: string) {
        if (Platform.OS === `web`) {
            return localStorage.getItem(key);
        } else {
            return await SecureStore.getItemAsync(key);
        }
    }

    async deleteItem(key: string) {
        if (Platform.OS === `web`) {
            localStorage.removeItem(key);
        } else {
            await SecureStore.deleteItemAsync(key);
        }
    }
}

export default StorageService;
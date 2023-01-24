import AsyncStorage from '@react-native-async-storage/async-storage';

export const ACCESS_TOKEN_KEY = 'access_token';
export const ID_TOKEN_KEY = 'id_token';

class StorageClientClass {
  // async getAccessToken(): Promise<string | null> {
  //   return AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  // }

  // setAccessToken = async (token: string) => {
  //   return AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
  // };

  // async removeAccessToken() {
  //   const token = await this.getAccessToken();
  //   if (token) {
  //     await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
  //   }
  // }

  async getIdToken(): Promise<string | null> {
    return AsyncStorage.getItem(ID_TOKEN_KEY);
  }

  setIdToken = async (token: string) => {
    return AsyncStorage.setItem(ID_TOKEN_KEY, token);
  };

  async removeIdToken() {
    const token = await this.getIdToken();
    if (token) {
      await AsyncStorage.removeItem(ID_TOKEN_KEY);
    }
  }
}

export const StorageClient = new StorageClientClass();

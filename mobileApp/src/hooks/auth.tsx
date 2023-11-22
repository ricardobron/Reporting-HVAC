import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from 'src/services/api';
import { Alert } from 'react-native';

interface IProps {
  children: React.ReactNode;
}

interface User {
  id: string;
  email: string;
  name: string;
}

interface Company {
  id: string;
}

interface AuthState {
  token: string;
  user?: User;
  company?: Company;
}

interface SignInCredentialsAdmin {
  email: string;
  password: string;
}

interface SignInCredentialsCompany {
  code: string;
}

interface AuthContextData {
  token?: string;
  user?: User;
  company?: Company;
  loading: boolean;
  signInAdmin(credentials: SignInCredentialsAdmin): Promise<void>;
  signInCompany(credentials: SignInCredentialsCompany): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: IProps) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      setLoading(true);

      const [token, user, company] = await AsyncStorage.multiGet([
        '@SSAC:token',
        '@SSAC:user',
        '@SSAC:company',
      ]);

      if (token[1] && (user[1] || company[1])) {
        const userData = user[1];
        const companyData = company[1];

        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({
          token: token[1],
          user: userData ? JSON.parse(userData) : null,
          company: companyData ? JSON.parse(companyData) : null,
        });
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signInAdmin = useCallback(
    async ({ email, password }: SignInCredentialsAdmin) => {
      try {
        setLoading(true);

        const response = await api.post('sessions/admin', {
          email,
          password,
        });

        const { access_token, user } = response.data;

        await AsyncStorage.multiSet([
          ['@SSAC:token', access_token],
          ['@SSAC:user', JSON.stringify(user)],
        ]);

        api.defaults.headers.authorization = `Bearer ${access_token}`;

        setData({ token: access_token, user });

        setLoading(false);
      } catch {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, verifique as credenciais.'
        );

        setLoading(false);
      }
    },
    []
  );

  const signInCompany = useCallback(
    async ({ code }: SignInCredentialsCompany) => {
      try {
        setLoading(true);
        const response = await api.post('sessions/company', {
          code,
        });

        const { access_token, company_id } = response.data;

        const companyObject: Company = {
          id: company_id,
        };

        await AsyncStorage.multiSet([
          ['@SSAC:token', access_token],
          ['@SSAC:company', JSON.stringify(companyObject)],
        ]);

        api.defaults.headers.authorization = `Bearer ${access_token}`;

        setData({ token: access_token, company: companyObject });
        setLoading(false);
      } catch {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, verifique as credenciais.'
        );

        setLoading(false);
      }
    },
    []
  );

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@SSAC:user',
      '@SSAC:token',
      '@SSAC:company',
    ]);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token: data.token,
        user: data.user,
        company: data.company,
        loading,
        signInAdmin,
        signInCompany,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };

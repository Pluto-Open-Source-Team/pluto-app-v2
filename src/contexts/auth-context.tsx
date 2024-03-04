import { createContext, useEffect, useReducer, useCallback } from 'react';
import type { FC, ReactNode } from 'react';
import { authApi } from '@/api/auth-api';

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: {
    email: string;
  } | null;
}

enum ActionType {
  INITIALIZE = 'INITIALIZE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

type InitializeAction = {
  type: ActionType.INITIALIZE;
  payload: {
    isAuthenticated: boolean;
    user: {
      email: string;
    } | null;
  };
};

type LoginAction = {
  type: ActionType.LOGIN;
  payload: {
    user: {
      email: string;
    };
  };
};

type LogoutAction = {
  type: ActionType.LOGOUT;
};

type Action = InitializeAction | LoginAction | LogoutAction;

type Handler = (state: State, action: any) => State;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers: Record<ActionType, Handler> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state: State, action: LoginAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export interface AuthContextValue extends State {
  login: (accessToken: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async (): Promise<void> => {
    try {
      const accessToken = globalThis.localStorage.getItem('ACCESS_TOKEN');

      if (accessToken) {
        const user = await authApi.tokenInfo(accessToken);

        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: true,
            user: {
              email: user.email,
            },
          },
        });
      } else {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (err) {
      dispatch({
        type: ActionType.INITIALIZE,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [dispatch]);

  useEffect(() => {
    initialize();
  }, []);

  const login = useCallback(
    async (accessToken: string): Promise<void> => {
      const userResponse = await authApi.tokenInfo(accessToken);

      localStorage.setItem('ACCESS_TOKEN', accessToken);

      dispatch({
        type: ActionType.LOGIN,
        payload: {
          user: {
            email: userResponse.email,
          },
        },
      });
    },
    [dispatch],
  );

  const logout = useCallback(async (): Promise<void> => {
    localStorage.removeItem('ACCESS_TOKEN');
    dispatch({ type: ActionType.LOGOUT });
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;

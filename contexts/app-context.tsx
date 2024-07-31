import { createContext, useMemo, useReducer, useState } from 'react';
import { appReducer, initialState } from '@/reducers';
import { AppContextType, AppProviderType, QuestionStatusType } from '@/types';

export const AppContext = createContext<AppContextType>({
  questionId: {
    prev: null,
    current: 0,
    next: 1,
  },
  setQuestionId: () => {},
  dispatch: () => {},
  progress: 0,
  responses: initialState,
});

AppContext.displayName = 'AppContext';

export const AppProvider = ({ children }: AppProviderType) => {
  const [questionId, setQuestionId] = useState<QuestionStatusType>({
    prev: null,
    current: 0,
    next: 1,
  });

  const [state, dispatch] = useReducer(appReducer, initialState);

  const progress = useMemo(() => {
    let count = 0;
    Object.values(state).forEach(value => {
      if (typeof value === 'string' && value) count++;
      else if (Array.isArray(value) && value.length > 0) count++;
    });

    return count;
  }, [state]);

  const contextValue = {
    questionId,
    setQuestionId,
    responses: state,
    dispatch,
    progress,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

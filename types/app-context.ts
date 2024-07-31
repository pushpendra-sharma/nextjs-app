import { Dispatch, ReactNode, SetStateAction } from 'react';
import { QuestionStatusType } from './question';
import { ActionType } from '@/reducers/actions';
import { ResponseStateType } from '@/reducers';

export type AppContextType = {
  questionId: QuestionStatusType;
  setQuestionId: Dispatch<SetStateAction<QuestionStatusType>>;
  responses: ResponseStateType;
  dispatch: Dispatch<ActionType>;
  progress: number;
};

export type AppProviderType = {
  children: ReactNode;
};

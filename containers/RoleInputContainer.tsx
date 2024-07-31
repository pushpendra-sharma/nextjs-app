import { SelectInput } from '@/components';
import { MouseEventHandler, useContext } from 'react';
import { roleOptions } from '@/utils/constants';
import { QuestionType } from '@/types';
import { AppContext } from '@/contexts/app-context';
import { SET_ROLE } from '@/reducers/actions';

type Props = {
  type: QuestionType;
};

export function RoleInputContainer({ type }: Props) {
  const { questionId, setQuestionId, dispatch, responses } =
    useContext(AppContext);
  const selectedVal = [responses.role];

  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    const button = e.currentTarget;
    setQuestionId({
      prev: Number(questionId.prev) + 1,
      current: questionId.current + 1,
      next: questionId.next + 1,
    });
    dispatch({ type: SET_ROLE, payload: button.value });
  };

  return (
    <div className='w-64'>
      <SelectInput
        title=''
        values={selectedVal}
        options={roleOptions}
        handleClick={handleClick}
      />
    </div>
  );
}

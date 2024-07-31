import { Button, Error, SelectInput } from '@/components';
import { MouseEventHandler, useContext, useState } from 'react';
import { roleOptions } from '@/utils/constants';
import { QuestionType } from '@/types';
import { AppContext } from '@/contexts/app-context';

type Props = {
  type: QuestionType;
};

export function GoalInputContainer({ type }: Props) {
  const { questionId, setQuestionId, dispatch, responses } =
    useContext(AppContext);
  const selectedVal = responses.goal;
  const [error, setError] = useState(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    const button = e.currentTarget;
    dispatch({ type: `SET_${type.toUpperCase()}`, payload: button.value });
  };

  const handleClick2 = () => {
    if (selectedVal.length >= 2) {
      setQuestionId({
        prev: Number(questionId.prev) + 1,
        current: questionId.current + 1,
        next: questionId.next + 1,
      });
    } else setError(true);
  };

  return (
    <div className='w-64'>
      <SelectInput
        title=''
        values={selectedVal}
        options={roleOptions}
        handleClick={handleClick}
      />
      {error && <Error message="Hmm... that email doesn't look right" />}

      <Button label='OK' onClick={handleClick2} />
    </div>
  );
}

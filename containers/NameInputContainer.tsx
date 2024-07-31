import { ChangeEventHandler, useContext, useEffect, useState } from 'react';
import { Button, Error, TextInput } from '@/components';
import { AppContext } from '@/contexts/app-context';
import { QuestionType } from '@/types';
import { SET_NAME } from '@/reducers/actions';

type Props = {
  type: QuestionType;
};

export function NameInputContainer({ type }: Props) {
  const { questionId, setQuestionId, dispatch, responses } =
    useContext(AppContext);

  const [value, setValue] = useState(responses.name);
  const [error, setError] = useState(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (!value) setError(true);
    else setError(false);
  }, [value]);

  const handleClick = () => {
    if (value) {
      setQuestionId({
        prev: Number(questionId.prev) + 1,
        current: questionId.current + 1,
        next: questionId.next + 1,
      });
      dispatch({ type: SET_NAME, payload: value });
    } else setError(true);
  };

  return (
    <div className='flex flex-col gap-4'>
      <TextInput
        value={value}
        handleChange={handleChange}
        placeholder='Type your answer here...'
      />
      {error && <Error message='Please fill this in' />}
      <Button label='OK' onClick={handleClick} />
    </div>
  );
}

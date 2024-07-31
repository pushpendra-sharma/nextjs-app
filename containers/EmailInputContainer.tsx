import { ChangeEventHandler, useContext, useState } from 'react';
import { Button, Error, TextInput } from '@/components';
import { AppContext } from '@/contexts/app-context';
import { QuestionType } from '@/types';
import { isValidEmail } from '@/utils/helper';
import { SET_EMAIL } from '@/reducers/actions';

type Props = {
  type: QuestionType;
};

export function EmailInputContainer({ type }: Props) {
  const { questionId, setQuestionId, dispatch, responses } =
    useContext(AppContext);

  const [value, setValue] = useState(responses.email);
  const [error, setError] = useState(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    if (isValidEmail(value)) {
      setQuestionId({
        prev: Number(questionId.prev) + 1,
        current: questionId.current + 1,
        next: questionId.next + 1,
      });
      dispatch({ type: SET_EMAIL, payload: value });
    } else setError(true);
  };

  return (
    <div className='flex flex-col gap-4'>
      <TextInput
        value={value}
        handleChange={handleChange}
        placeholder='name@example.com'
      />
      {error && <Error message="Hmm... that email doesn't look right" />}
      <Button label='OK' onClick={handleClick} />
    </div>
  );
}

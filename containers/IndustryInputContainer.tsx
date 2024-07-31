import { Button, Error, SelectInput, TextInput } from '@/components';
import {
  ChangeEventHandler,
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from 'react';
import { roleOptions } from '@/utils/constants';
import { QuestionType } from '@/types';
import { AppContext } from '@/contexts/app-context';
import { SET_INDUSTRY } from '@/reducers/actions';

type Props = {
  type: QuestionType;
};

export function IndustryInputContainer({ type }: Props) {
  const { questionId, setQuestionId, dispatch, responses } =
    useContext(AppContext);

  const [value, setValue] = useState(responses.industry);
  const [error, setError] = useState(false);
  const selectedVal = responses.industry;


  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    if (value) {
      // setQuestionId({
      //   prev: Number(questionId.prev) + 1,
      //   current: questionId.current + 1,
      //   next: questionId.next + 1,
      // });
      dispatch({ type: SET_INDUSTRY, payload: value });
    } else setError(true);
  };

  return (
    <div className='flex flex-col gap-4'>
      <SelectInput
        title=''
        values={selectedVal}
        options={roleOptions}
        handleClick={handleClick}
      />
      {error && <Error message='Please fill this in' />}
      <Button label='OK' onClick={handleClick} />
    </div>
  );
}

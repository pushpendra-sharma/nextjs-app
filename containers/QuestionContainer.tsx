import { QuestionDetails } from '@/components';
import { questions } from '@/utils/constants';
import { QuestionType } from '@/types';
import {
  EmailInputContainer,
  GoalInputContainer,
  IndustryInputContainer,
  NameInputContainer,
  RoleInputContainer,
} from './';

type Props = {
  type: QuestionType;
};

export function QuestionContainer({ type }: Props) {
  const { heading, description, required } = questions[type];

  return (
    <>
      <QuestionDetails
        heading={heading}
        description={description}
        isRequired={required}
      />
      {type === 'name' && <NameInputContainer type={type} />}
      {type === 'role' && <RoleInputContainer type={type} />}
      {type === 'industry' && <IndustryInputContainer type={type} />}
      {type === 'email' && <EmailInputContainer type={type} />}
      {type === 'goal' && <GoalInputContainer type={type} />}
    </>
  );
}

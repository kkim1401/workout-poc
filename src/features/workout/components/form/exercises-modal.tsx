import { Modal } from '@/features/common/components';
import { List as ExercisesList } from '@/features/exercise/components';
import { getAllUserExercises } from '@/lib/api/db/exercises/queries/client';
import { Exercise } from '@/lib/api/db/exercises/types';
import { useSupabaseBrowser } from '@/lib/supabase/client';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { forwardRef } from 'react';

type ExercisesModalProps = {
  // eslint-disable-next-line no-unused-vars
  onExerciseClick: (exercise: Exercise) => void;
};

const ExercisesModal = forwardRef<HTMLDialogElement, ExercisesModalProps>(
  ({ onExerciseClick }, ref) => {
    const client = useSupabaseBrowser();
    const { data: exercises } = useQuery(getAllUserExercises(client));

    return (
      <Modal ref={ref}>
        <ExercisesList
          exercises={exercises}
          onExerciseClick={onExerciseClick}
        />
      </Modal>
    );
  }
);

ExercisesModal.displayName = 'ExercisesModal';

export default ExercisesModal;

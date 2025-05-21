import { Modal } from '@/features/common/components';
import { ExerciseList } from '@/features/exercise/components';
import { getAllUserExercises } from '@/lib/api/db/exercises/queries/client';
import { Exercise } from '@/lib/api/db/exercises/types';
import { useSupabaseBrowser } from '@/lib/supabase/client';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { forwardRef } from 'react';

type ExerciseModalProps = {
  // eslint-disable-next-line no-unused-vars
  onExerciseClick: (exercise: Exercise) => void;
};

const ExerciseModal = forwardRef<HTMLDialogElement, ExerciseModalProps>(
  ({ onExerciseClick }, ref) => {
    const client = useSupabaseBrowser();
    const { data: exercises } = useQuery(getAllUserExercises(client));

    return (
      <Modal ref={ref}>
        <ExerciseList exercises={exercises} onExerciseClick={onExerciseClick} />
      </Modal>
    );
  }
);

ExerciseModal.displayName = 'ExerciseModal';

export default ExerciseModal;

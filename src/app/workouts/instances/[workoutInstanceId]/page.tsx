export default async function ActiveWorkoutPage({
  params,
}: {
  params: Promise<{ workoutInstanceId: string }>;
}) {
  const { workoutInstanceId } = await params;
  return (
    <div>
      <h1>Active Workout Page</h1>
      <p>Workout Instance Id: {workoutInstanceId}</p>
    </div>
  );
}

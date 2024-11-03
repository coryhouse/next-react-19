export function Errors({ errors }: { errors: string[] }) {
  return (
    <ul>
      {errors.map((error) => (
        <li key={error} className="text-red-500">
          {error}
        </li>
      ))}
    </ul>
  );
}

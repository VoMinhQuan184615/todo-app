export function NoTasksState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium">No tasks yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Create one to get started!
        </p>
      </div>
    </div>
  );
}

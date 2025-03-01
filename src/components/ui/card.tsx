export const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-lg shadow-sm p-4 bg-white">{children}</div>
);

export const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-2">{children}</div>
);
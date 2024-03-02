export type ReadFileCallback =
    (error: NodeJS.ErrnoException | null, data: string ) => void;

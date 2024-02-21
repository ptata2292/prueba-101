export type mode = 'view' | 'edit'; 
export type action = 'create' | 'update' | 'delete' | 'view'; 
export enum securityCode {
    NONE = 0,
    READ = 3,
    WRITE = 7,
    COPY = 15,
};
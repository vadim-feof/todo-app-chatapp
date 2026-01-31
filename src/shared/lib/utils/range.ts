
export const range = (count: number = 0, start: number = 0, step: number = 1) => {
    return Array.from({ length: count }, (_, index) => start + index * step);
}

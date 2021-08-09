export default (milliseconds: number): Promise<unknown> => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

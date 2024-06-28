export const validatePositiveNumbers = (e: KeyboardEvent) => {
    const regex = e.key !== "Backspace" && !/^\d+$/.test(e.key);
    if (regex) {
        e.preventDefault();
    }
};
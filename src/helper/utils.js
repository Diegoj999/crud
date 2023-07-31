export const formattedNumber = (number) => {
    return new Intl.NumberFormat('de-DE').format(number);
};

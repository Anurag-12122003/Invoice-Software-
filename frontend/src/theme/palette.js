export const getPalette = (mode) => ({
    mode,
    primary: {
        main: mode === 'light' ? "#0000ff" : "#FFFFFF"
    },
    textColor: {
        main: mode === 'light' ? "#FFFFFF" : "#0000FF"
    },
    background: {
        default: mode === 'light' ? "#FFFFFF" : "#010101"
    }
});
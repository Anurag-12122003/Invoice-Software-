export const getPalette = (mode) => ({
    mode,
    btn: {
        text: mode === 'light',
        background: "#305CDE"
    },
    primary: {
        main: mode === 'light' ? "#305CDE" : "#FFFFFF"
    },
    textColor: {
        main: mode === 'light' ? "#FFFFFF" : "#0000FF"
    },
    background: {
        default: mode === 'light' ? "#FFFFFF" : "#010101"
    }
});
import minimist from "minimist";

export const args = minimist(process.argv.slice(2), { default: { p: 9988, h: 'localhost', w: true  } })
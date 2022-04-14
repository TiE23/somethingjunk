import logger from "pino";
import dayjs from "dayjs";

// NODE_ENV is set to "test" when jest is running.
const inTest = process.env.NODE_ENV === "test";

const log = logger({
  enabled: !inTest,
  transport: !inTest ? {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  } : undefined,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;

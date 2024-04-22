import os from "os";
import { execSync } from "child_process";

const isWindows = os.platform() === "win32";

if (isWindows) {
  execSync("tsc && vite build && echo /* /index.html 200 >dist/_redirects", {
    stdio: "inherit",
  });
} else {
  execSync(
    'tsc && vite build && echo "/* /index.html 200" | cat >dist/_redirects',
    { stdio: "inherit" }
  );
}
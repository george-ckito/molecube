const { spawnSync, spawn } = require("child_process");
const fs = require("fs");

jest.setTimeout(10000);
test("run cli and check if folder is created", async (done) => {
  const cliCommand = `node`;
  const cliPath = `D:\\CLI\\src\\index.js`;
  fs.accessSync(cliPath, fs.constants.R_OK);
  const cli = spawn(cliCommand, [cliPath], {
    input: "a\n1\ndescription\ntoken\nnothing",
    encoding: "utf-8",
  });

  let cliOutput = "";
  cli.stdout.on("data", (data) => {
    cliOutput += data;
  });

  cli.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  cli.on("close", (code) => {
    if (code !== 0) {
      console.error(`child process exited with code ${code}`);
    }
    console.log("ERROR CODE = " + code);
    expect(fs.existsSync(`${process.cwd()}/a`)).toBe(true);
    done();
  });
  cli.on("error", (err) => {
    console.log(err);
  });

  cli.stdin.write("a\n");
  cli.stdin.end();
  expect(fs.existsSync(`${process.cwd()}/a`)).toBe(true);
});

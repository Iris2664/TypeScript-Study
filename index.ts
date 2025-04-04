import { createSolutionBuilderWithWatchHost } from "typescript";

const file = Bun.file("output.txt");
const source = await file.text();
console.log(source);

const now = new Date();


const writer = file.writer();
writer.write(source);
writer.write("\n");
writer.write(createSolutionBuilderWithWatchHost.toString());
writer.end();
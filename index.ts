const file = Bun.file("output.txt");
const source = await file.text();

const memo: string = Bun.argv.pop() ?? "";

const writer = file.writer();
writer.write(source);
writer.write("\n");
writer.write(memo);
writer.end();

const result = await file.text();
console.log(result);
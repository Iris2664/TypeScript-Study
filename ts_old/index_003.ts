import { formatToItem } from "./format";

//output.txtをファイルとして取得し，テキストを読み出す
const file = Bun.file("output.txt");
const source = await file.text();

if (Bun.argv.length === 3) {
    //コマンドライン引数の最後の文字列を取得する
    const memo: string = Bun.argv.pop() ?? "";
    const item: string = formatToItem(memo);

    //ファイルに元のテキストと改行，日時を書き込む
    const writer = file.writer();
    writer.write(source);
    if (source.length > 0) { // source に内容がある場合のみ改行を書き込む
        writer.write("\n");
    }
    writer.write(item);
    writer.end();

    //ファイルから再びテキストを読み出す
    const result = await file.text();
    console.log(result);
} else if (Bun.argv.length === 2) {
    console.log(source);
} else {
    throw new Error("追加のコマンドライン引数は1つまでです．");
}
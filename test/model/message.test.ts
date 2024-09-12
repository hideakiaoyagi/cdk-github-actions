import { message } from "../../src/model/message";

test('正しいメッセージが返却される', () => {
    expect(message('hoge', 'fuga')).toEqual(`Hello, fuga! You've hit hoge\n`)
})
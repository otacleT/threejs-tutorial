## Three.jsを触ってみよう

### ローカル環境セットアップ

1. 依存関係のインストール、セットアップ

```
bun install
```

2. TypeScriptのコンパイル

```
bun compile
```

3. ローカル環境立ち上げ

```
bun run dev
```

### フォルダー構造について

```
.
├── .vscode/ # vscodeの設定ファイル群
├── output/ # ts compileの出力先
├── public/ # 3dモデル(glbファイル)の格納
├── src/ # TSファイル群
├── *.html 
└── package.json
```
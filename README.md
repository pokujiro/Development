# TodoPet - ゲーミフィケーションタスク管理アプリ

日々のタスク管理に、ペット育成の要素を加えてモチベーションを維持しやすくするWebアプリケーションです。タスクを完了することでペットの「愛情度」が上がり、ユーザーの継続的な利用を促します。

![TodoPet Screenshot](images/todopet-demo.png)


## ✨ コンセプト (Concept)

多くの人にとって、日々のタスク管理は時に退屈で、続けるのが難しいものです。このアプリケーションは、タスクを完了するごとにバーチャルペットが成長するという「ゲーミフィケーション」の要素を取り入れることで、日々のタスク達成に小さな「ご褒美」と「楽しさ」を加え、モチベーションを維持することを目的としています。

## 🚀 主な機能 (Features)

-   タスクの追加・削除機能
-   タスクの完了・未完了を切り替えるチェックリスト機能
-   タスク完了と連動したペットの育成システム（愛情度が上がるとレベルアップ）
-   カレンダーによる日付管理機能

## 🛠️ 使用技術 (Tech Stack)

このプロジェクトは、フロントエンドとバックエンドを分離した構成で開発されています。

-   **フロントエンド:** React, JavaScript, HTML, CSS
-   **バックエンド:** FastAPI, Python
-   **データベース:** SQLite (開発初期段階)
-   **サーバー:** Uvicorn

## 📦 環境構築と実行手順 (Setup and How to Run)

このアプリケーションをローカル環境で実行するための手順です。

### 1. 前提条件

-   Git
-   Node.js (v16以上推奨) と npm
-   Python (v3.8以上推奨)

### 2. インストール

まず、リポジトリをクローンし、フロントエンドとバックエンドそれぞれの依存関係をインストールします。

```bash
# 1. リポジトリをクローン
git clone [あなたのリポジトリのURL]
cd [クローンしたリポジトリ名]

# 2. バックエンドのセットアップ
cd backend
python -m venv myenv
source myenv/bin/activate  # Mac/Linuxの場合
# myenv\Scripts\activate   # Windowsの場合
pip install -r requirements.txt

# 3. フロントエンドのセットアップ
cd ../todopet
npm install
```

### 3. 実行

開発サーバーを起動するには、**2つのターミナル**が必要です。

**ターミナル1：バックエンドサーバーの起動**

```bash
# プロジェクトのルートからbackendフォルダに移動
cd path/to/project/backend

# 仮想環境を有効化
source myenv/bin/activate # Mac/Linux
# myenv\Scripts\activate  # Windows

# Uvicornサーバーを起動
uvicorn app.main:app --reload
# → http://localhost:8000 でサーバーが起動します
```
**ターミナル2：フロントエンドサーバーの起動**

```bash
# プロジェクトのルートからtodopetフォルダに移動
cd path/to/project/todopet

# React開発サーバーを起動
npm start
# → http://localhost:3000 でサーバーが起動します
```

全てのサーバーが起動したら、Webブラウザで http://localhost:3000 にアクセスしてください。

🌱 今後の展望 (Future Plans)
- [ ] データ永続化: バックエンドとAPI連携を行い、タスクとペットの情報をデータベースに保存する。
- [ ] 認証機能の追加: ユーザーごとにデータを管理できるようにログイン機能を追加する。
- [ ] ペットのアニメーション: 愛情度に応じてペットが動いたり、表情が変わったりする機能。

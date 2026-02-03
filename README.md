# GeoTurnFight（国名対戦ゲーム）(開発中)

ターン制で国名を交互に言い合い、より長く答え続けたプレイヤーが勝利する対戦ゲームです。

## 目次
- [GeoTurnFight（国名対戦ゲーム）(開発中)](#geoturnfight国名対戦ゲーム開発中)
  - [目次](#目次)
  - [機能概要](#機能概要)
  - [画面フロー](#画面フロー)
  - [技術スタック](#技術スタック)
  - [ディレクトリ構成](#ディレクトリ構成)
  - [セットアップ](#セットアップ)
  - [開発サーバー起動](#開発サーバー起動)
  - [環境変数](#環境変数)
    - [Seed（国名データ投入）](#seed国名データ投入)
  - [動作環境](#動作環境)
  - [API（REST）](#apirest)
    - [認証](#認証)
    - [ルーム](#ルーム)
  - [Socket.IO イベント](#socketio-イベント)
  - [ゲームルール](#ゲームルール)

## 機能概要
- ユーザー登録/ログイン
- ルーム作成/参加
- 2人対戦のターン制国名バトル
- 国名履歴の共有・重複チェック

## 画面フロー
1. ログイン画面 (`/`)
2. 新規登録 (`/registerUser`)
3. ルーム作成/参加 (`/room`)
4. マッチング (`/match`)
5. ゲーム本編 (`/CountryBattleGame`)

## 技術スタック
**Frontend**
- React + Vite
- React Router
- Tailwind CSS
- Socket.IO Client

**Backend**
- Express
- Socket.IO
- Prisma
- Swagger UI

## ディレクトリ構成
```
.
├── client/                # フロントエンド（Vite + React）
│   └── src/
│       ├── pages/          # 画面
│       ├── hooks/          # Socket/状態ロジック
│       ├── components/     # UIコンポーネント
│       └── lib/            # socket初期化
├── server/                # バックエンド（Express + Prisma）
│   └── src/
│       ├── features/       # auth/room など機能別
│       ├── socket/         # Socket.IO 初期化
│       └── openapi/        # Swagger定義
└── package.json           # ルートのスクリプト（client/server 起動）
```

## セットアップ
```bash
npm run install
```

## 開発サーバー起動
```bash
npm run dev
```

- フロントエンド: Vite のデフォルトポート（例: http://localhost:5173）
- バックエンド: `http://localhost:3000`（API/Socket）

## 環境変数の設定（必須）

バックエンドの起動には、PostgreSQL の接続情報を表す  
`DATABASE_URL` の設定が必要です。

### 手順

1. `.env.example` をコピーして `.env` を作成します
```bash
cp .env.example .env
```
2. .env 内の DATABASE_URL を、自分の PostgreSQL 接続URLに書き換えてください
（Supabase / Render / ローカルPostgreSQL など）
```
DATABASE_URL="postgresql://user:password@host:5432/database"
```
*補足*
- DATABASE_URL は APIキーではありません
- PostgreSQL への 接続文字列（Connection URL） です
- .env は Gitにコミットしない でください

Prisma Client は `postinstall` で生成されます。
```
cd server
npm install
```

### Seed（国名データ投入）
```
cd server
npx prisma db seed
```

## 動作環境
Node.js と npm のバージョンを統一すると、開発環境の差異が減ります。  
本リポジトリでは明示していないため、以下は実行確認済みのバージョンです。

- Node.js: v20.19.6
- npm: 10.8.2

確認コマンド:
```bash
node -v
npm -v
```

## API（REST）
ベースURL: `http://localhost:3000`

主要なエンドポイントを簡易リストで記載します。  
詳細なリクエスト/レスポンスは、`server/src/openapi/openapi.yml` を参照してください。

### 認証
| メソッド | パス | 説明 |
| --- | --- | --- |
| POST | `/api/auth/register` | ユーザー登録 |
| POST | `/api/auth/login` | ログイン |

### ルーム
| メソッド | パス | 説明 |
| --- | --- | --- |
| POST | `/api/room/createRoom` | ルーム作成 |
| GET | `/api/room/allRooms` | ルーム一覧取得 |
| POST | `/api/room/findRoom` | ルーム検索 |
| GET | `/api/room/getRoomId?name=roomA` | ルームID取得 |

## Socket.IO イベント
**クライアント → サーバ**
| イベント名 | ペイロード | 説明 |
| --- | --- | --- |
| `joinGame` | `{ roomName, userName }` | ルーム参加 |
| `checkCountry` | `{ roomName, player, country }` | 国名チェック |

**サーバ → クライアント**
| イベント名 | ペイロード | 説明 |
| --- | --- | --- |
| `assignPlayer` | `"player1" \| "player2"` | プレイヤー割り当て |
| `matchUpdate` | `{ player1, player2 }` | マッチング更新 |
| `toGameButton` | `{ player2 }` | ゲーム開始ボタン表示 |
| `turnUpdate` | `"player1" \| "player2"` | ターン更新 |
| `historyUpdate` | `{ countryNames: string[] }` | 国名履歴更新 |
| `errorMessage` | `string` | エラー通知 |

## ゲームルール
- 国名はDBに登録された国のみ有効。
- 既に使われた国名は使用不可。
- ターン制で交互に回答。
- 降参ボタンで負け判定。

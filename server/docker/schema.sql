-- 一旦テーブルを作った時のSQLを残しておくだけ
-- TODO:追々ここを元にコンテナ起動時にテーブルを作成するようにする

CREATE TABLE recipes (
    recipe_index SERIAL PRIMARY KEY,
    create_user_id INTEGER NOT NULL,
    recipe_name VARCHAR(255) NOT NULL,
    description TEXT,
    cooking_time INTEGER, -- 分単位で想定
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ingredients TEXT -- カンマ区切りか配列で保存
);


CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    oauth_provider VARCHAR(50),
    oauth_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    profile_picture TEXT,
    favorites INTEGER[] -- お気に入りレシピのindexを配列で格納
);


CREATE TABLE access_tokens (
    user_id INTEGER NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, token),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


-- ダミーデータ
INSERT INTO recipes (create_user_id, recipe_name, description, cooking_time, ingredients) VALUES
(1, 'トマトスパゲッティ', 'フレッシュなトマトとハーブで作るシンプルなスパゲッティ', 30, 'トマト,スパゲッティ,ハーブ'),
(1, 'チキンカレー', 'スパイシーなチキンと野菜のカレー', 45, 'チキン,カレー粉,玉ねぎ'),
(2, 'ビーフシチュー', 'じっくり煮込んだビーフシチュー', 120, 'ビーフ,人参,ジャガイモ'),
(2, '寿司', '新鮮な魚を使った寿司', 60, 'シャリ,マグロ,サーモン'),
(3, 'ラーメン', '自家製スープのラーメン', 90, '麺,チャーシュー,味玉');

INSERT INTO users (user_name, email, oauth_provider, oauth_id, profile_picture, favorites) VALUES
('ユーザー1', 'user1@example.com', 'google', 'google-oauth-id-1', 'https://example.com/pic1.jpg', '{1,2}'),
('ユーザー2', 'user2@example.com', 'facebook', 'facebook-oauth-id-1', 'https://example.com/pic2.jpg', '{3}'),
('ユーザー3', 'user3@example.com', 'twitter', 'twitter-oauth-id-1', 'https://example.com/pic3.jpg', '{4,5}'),
('ユーザー4', 'user4@example.com', 'google', 'google-oauth-id-2', 'https://example.com/pic4.jpg', '{1,3,5}'),
('ユーザー5', 'user5@example.com', 'facebook', 'facebook-oauth-id-2', 'https://example.com/pic5.jpg', '{2,4}');

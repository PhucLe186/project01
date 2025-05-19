-- Bảng người dùng
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng video
CREATE TABLE Videos (
    video_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(36),
    video_url TEXT,
    caption TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    view_count INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Bảng like video
CREATE TABLE Likes (
    user_id VARCHAR(36),
    video_id VARCHAR(36),
    liked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, video_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (video_id) REFERENCES Videos(video_id) ON DELETE CASCADE
);

-- Bảng bình luận video
CREATE TABLE Comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    video_id VARCHAR(36),
    user_id VARCHAR(36),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (video_id) REFERENCES Videos(video_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Bảng theo dõi người dùng
CREATE TABLE Follows (
    follower_id VARCHAR(36),
    following_id VARCHAR(36),
    followed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower_id, following_id),
    FOREIGN KEY (follower_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (following_id) REFERENCES Users(user_id) ON DELETE CASCADE
);


-- Bảng lưu video
CREATE TABLE SavedVideos (
    user_id VARCHAR(36),
    video_id VARCHAR(36),
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, video_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (video_id) REFERENCES Videos(video_id) ON DELETE CASCADE
);


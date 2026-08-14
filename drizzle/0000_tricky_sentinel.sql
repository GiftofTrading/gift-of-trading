CREATE TABLE `blog_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`excerpt` text,
	`content` text NOT NULL,
	`category` enum('market-news','trading-tips','options','investing','portfolio','education') NOT NULL DEFAULT 'education',
	`coverImage` varchar(500),
	`published` boolean NOT NULL DEFAULT false,
	`featured` boolean NOT NULL DEFAULT false,
	`authorName` varchar(255) DEFAULT 'Sounia Gill',
	`readTime` int DEFAULT 5,
	`tags` text,
	`metaTitle` varchar(255),
	`metaDescription` text,
	`youtubeUrl` varchar(500),
	`videoId` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`publishedAt` timestamp,
	CONSTRAINT `blog_posts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_posts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`firstName` varchar(255) NOT NULL,
	`lastName` varchar(255),
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`inquiryType` enum('masterclass','coaching','portfolio','webinar','stock-market-made-easy','general') NOT NULL DEFAULT 'general',
	`message` text NOT NULL,
	`source` varchar(100) DEFAULT 'contact-form',
	`status` enum('new','contacted','converted','closed') NOT NULL DEFAULT 'new',
	`emailSent` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`role` varchar(255) DEFAULT 'Trading Student',
	`content` text NOT NULL,
	`rating` int DEFAULT 5,
	`avatarUrl` varchar(500),
	`featured` boolean NOT NULL DEFAULT false,
	`published` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
--> statement-breakpoint
CREATE TABLE `webinars` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`hostName` varchar(255) DEFAULT 'Sounia Gill',
	`scheduledAt` timestamp NOT NULL,
	`durationMinutes` int DEFAULT 90,
	`status` enum('upcoming','live','completed','cancelled') NOT NULL DEFAULT 'upcoming',
	`registrationUrl` varchar(500),
	`videoUrl` varchar(500),
	`thumbnailUrl` varchar(500),
	`maxAttendees` int,
	`registeredCount` int DEFAULT 0,
	`isFree` boolean NOT NULL DEFAULT true,
	`price` int DEFAULT 0,
	`topics` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `webinars_id` PRIMARY KEY(`id`),
	CONSTRAINT `webinars_slug_unique` UNIQUE(`slug`)
);

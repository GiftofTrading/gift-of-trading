CREATE TABLE `masterclass_applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`firstName` varchar(255) NOT NULL,
	`lastName` varchar(255),
	`email` varchar(320) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`experienceLevel` enum('beginner','intermediate','advanced') NOT NULL DEFAULT 'beginner',
	`whyInterested` text,
	`status` enum('new','contacted','enrolled','rejected') NOT NULL DEFAULT 'new',
	`emailSent` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `masterclass_applications_id` PRIMARY KEY(`id`)
);

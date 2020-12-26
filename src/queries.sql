create table questions(  id int PRIMARY KEY AUTO_INCREMENT,  question varchar(255) );
INSERT into questions (question) values (  "You find it takes effort to introduce yourself to other people" );
INSERT into questions (question) values (  "You consider yourself more practical than creative" );
INSERT into questions (question) values ("Winning a debate matters less to you than making sure no one gets upset"), ("You get energized going to social events that involve many interactions"), ("You often spend time exploring unrealistic and impractical yet intriguing ideas"), ("Deadlines seem to you to be of relative rather than absolute importance"), ("Logic is usually more important than heart when it comes to making important decisions"), ("Your home and work environments are quite tidy"), ("You do not mind being at the center of attention"), ("Keeping your options open is more important than having a to-do list");


create table users (  id int PRIMARY KEY AUTO_INCREMENT,  email varchar(255) );

create table answers (
	id int primary key AUTO_INCREMENT,
    question_id int,
    answer int,
    user_id int,
    foreign key (user_id) references users(id),
    foreign key (question_id) references questions(id)
);


ALTER TABLE `questions` 
ADD COLUMN `dimension` VARCHAR(45) NOT NULL AFTER `question`,
ADD COLUMN `direction` TINYINT(2) NULL AFTER `dimension`;


UPDATE `questions` SET `dimension` = 'EL', `direction` = '1' WHERE (`id` = '1');
UPDATE `questions` SET `dimension` = 'SN', `direction` = '-1' WHERE (`id` = '2');
UPDATE `questions` SET `dimension` = 'TF', `direction` = '1' WHERE (`id` = '3');
UPDATE `questions` SET `id` = '4', `dimension` = 'EL', `direction` = '-1' WHERE (`id` = '4');
UPDATE `questions` SET `dimension` = 'SN', `direction` = '1' WHERE (`id` = '5');
UPDATE `questions` SET `dimension` = 'JP', `direction` = '1' WHERE (`id` = '6');
UPDATE `questions` SET `dimension` = 'TF', `direction` = '-1' WHERE (`id` = '7');
UPDATE `questions` SET `dimension` = 'JP', `direction` = '-1' WHERE (`id` = '8');
UPDATE `questions` SET `dimension` = 'EL', `direction` = '-1' WHERE (`id` = '9');
UPDATE `questions` SET `dimension` = 'JP', `direction` = '1' WHERE (`id` = '10');

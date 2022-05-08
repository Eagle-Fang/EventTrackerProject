-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema jobhuntdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `jobhuntdb` ;

-- -----------------------------------------------------
-- Schema jobhuntdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `jobhuntdb` DEFAULT CHARACTER SET utf8 ;
USE `jobhuntdb` ;

-- -----------------------------------------------------
-- Table `company`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `company` ;

CREATE TABLE IF NOT EXISTS `company` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL,
  `poc_name` VARCHAR(45) NULL,
  `poc_email` VARCHAR(100) NULL,
  `location` VARCHAR(200) NULL,
  `website` VARCHAR(300) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `job`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `job` ;

CREATE TABLE IF NOT EXISTS `job` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `company_id` INT NOT NULL,
  `title` VARCHAR(10045) NULL,
  `date` DATE NULL,
  `salary_min` INT NULL,
  `salary_max` INT NULL,
  `url` VARCHAR(100) NULL,
  `description` VARCHAR(300) NULL,
  `location` VARCHAR(45) NULL,
  `requirements` VARCHAR(300) NULL,
  `supervisory` TINYINT NULL,
  `status_update` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_job_company_idx` (`company_id` ASC),
  CONSTRAINT `fk_job_company`
    FOREIGN KEY (`company_id`)
    REFERENCES `company` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS jobhunt@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'jobhunt'@'localhost' IDENTIFIED BY 'jobhunt';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'jobhunt'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `company`
-- -----------------------------------------------------
START TRANSACTION;
USE `jobhuntdb`;
INSERT INTO `company` (`id`, `name`, `poc_name`, `poc_email`, `location`, `website`) VALUES (1, 'WeHireAll', 'Andy Anderson', 'andy@wehireall.com', 'Virtual', 'insert website url');
INSERT INTO `company` (`id`, `name`, `poc_name`, `poc_email`, `location`, `website`) VALUES (2, 'AcmeSoftwareInc', 'Robert Robertson', 'Rob@acme.com', 'Washington DC', 'insert website url');
INSERT INTO `company` (`id`, `name`, `poc_name`, `poc_email`, `location`, `website`) VALUES (3, 'BigCorp', 'JaneJaneway', 'Jane@BigCorp.com', 'New York', 'insert website url');

COMMIT;


-- -----------------------------------------------------
-- Data for table `job`
-- -----------------------------------------------------
START TRANSACTION;
USE `jobhuntdb`;
INSERT INTO `job` (`id`, `company_id`, `title`, `date`, `salary_min`, `salary_max`, `url`, `description`, `location`, `requirements`, `supervisory`, `status_update`) VALUES (1, 1, 'Full Stack Engineer ', '2022-05-01', 100000, 125000, 'fullstack@url.com', 'Lorem ipsum dolor sit amet. Sit beatae culpa non nisi consequatur est ipsa itaque est autem.', 'Remote', 'Knowledge of Java', FALSE, 'Submitted initial application ');
INSERT INTO `job` (`id`, `company_id`, `title`, `date`, `salary_min`, `salary_max`, `url`, `description`, `location`, `requirements`, `supervisory`, `status_update`) VALUES (2, 1, 'Software Engineer I', '2022-05-01', 85000, 100000, 'fullstack@url.com', 'Lorem ipsum dolor sit amet. Sit beatae culpa non nisi consequatur est ipsa itaque est autem.', 'Washington DC', 'Experience with Object Oriented programming.', FALSE, 'Submitted initial application ');
INSERT INTO `job` (`id`, `company_id`, `title`, `date`, `salary_min`, `salary_max`, `url`, `description`, `location`, `requirements`, `supervisory`, `status_update`) VALUES (3, 1, 'Software Tester I', '2022-05-01', 75000, 110000, 'fullstack@url.com', 'Lorem ipsum dolor sit amet. Sit beatae culpa non nisi consequatur est ipsa itaque est autem.', 'Colorado', 'Experience Testing software.', FALSE, 'Submitted initial application ');
INSERT INTO `job` (`id`, `company_id`, `title`, `date`, `salary_min`, `salary_max`, `url`, `description`, `location`, `requirements`, `supervisory`, `status_update`) VALUES (4, 2, 'Full Stack Engineer II', '2022-05-01', 90000, 130000, 'fullstack@url.com', 'Lorem ipsum dolor sit amet. Sit beatae culpa non nisi consequatur est ipsa itaque est autem.', 'Remote', '10 years experience developing software. ', FALSE, 'Submitted initial application ');
INSERT INTO `job` (`id`, `company_id`, `title`, `date`, `salary_min`, `salary_max`, `url`, `description`, `location`, `requirements`, `supervisory`, `status_update`) VALUES (5, 2, 'DBA II', '2022-05-01', 100000, 140000, 'fullstack@url.com', 'Lorem ipsum dolor sit amet. Sit beatae culpa non nisi consequatur est ipsa itaque est autem.', 'Florida', 'Experience serving as  a DBA.', FALSE, 'Submitted initial application ');
INSERT INTO `job` (`id`, `company_id`, `title`, `date`, `salary_min`, `salary_max`, `url`, `description`, `location`, `requirements`, `supervisory`, `status_update`) VALUES (6, 2, 'Software Tester II', '2022-05-01', 130000, 150000, 'fullstack@url.com', 'Lorem ipsum dolor sit amet. Sit beatae culpa non nisi consequatur est ipsa itaque est autem.', 'California', 'Certified scrum master.', TRUE, 'Submitted initial application ');
INSERT INTO `job` (`id`, `company_id`, `title`, `date`, `salary_min`, `salary_max`, `url`, `description`, `location`, `requirements`, `supervisory`, `status_update`) VALUES (7, 3, 'Software QA Lead', '2022-05-01', 100000, 110000, 'fullstack@url.com', 'Lorem ipsum dolor sit amet. Sit beatae culpa non nisi consequatur est ipsa itaque est autem.', 'Remote', '3 years experience as software QA.', FALSE, 'Submitted initial application ');
INSERT INTO `job` (`id`, `company_id`, `title`, `date`, `salary_min`, `salary_max`, `url`, `description`, `location`, `requirements`, `supervisory`, `status_update`) VALUES (8, 3, 'FrontEnd Developer', '2022-05-01', 75000, 85000, 'fullstack@url.com', 'Lorem ipsum dolor sit amet. Sit beatae culpa non nisi consequatur est ipsa itaque est autem.', 'Remote', '2 years experience serving as a frontend developer.', FALSE, 'Submitted initial application ');
INSERT INTO `job` (`id`, `company_id`, `title`, `date`, `salary_min`, `salary_max`, `url`, `description`, `location`, `requirements`, `supervisory`, `status_update`) VALUES (9, 3, 'Backend Developer', '2022-05-01', 95000, 155000, 'fullstack@url.com', 'Lorem ipsum dolor sit amet. Sit beatae culpa non nisi consequatur est ipsa itaque est autem.', 'NewYork', 'Experience serving as a backend developer.', TRUE, 'Submitted initial application ');

COMMIT;


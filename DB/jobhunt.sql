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
  `date` VARCHAR(45) NULL,
  `salary_max` INT NULL,
  `salary_min` INT NULL,
  `url` VARCHAR(100) NULL,
  `description` VARCHAR(45) NULL,
  `location` VARCHAR(45) NULL,
  `requirements` VARCHAR(45) NULL,
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
INSERT INTO `company` (`id`, `name`, `poc_name`, `poc_email`, `location`, `website`) VALUES (1, 'WeHireAll', NULL, NULL, 'Virtual', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `job`
-- -----------------------------------------------------
START TRANSACTION;
USE `jobhuntdb`;
INSERT INTO `job` (`id`, `company_id`, `title`, `date`, `salary_max`, `salary_min`, `url`, `description`, `location`, `requirements`, `supervisory`, `status_update`) VALUES (1, 1, 'Full Stack Engineer', NULL, NULL, 100000, NULL, NULL, NULL, NULL, NULL, NULL);

COMMIT;


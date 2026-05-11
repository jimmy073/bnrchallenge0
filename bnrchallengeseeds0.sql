-- MySQL dump 10.13  Distrib 8.0.33, for macos13 (arm64)
--
-- Host: localhost    Database: bnr
-- ------------------------------------------------------
-- Server version	8.0.32

create database bnr;
use bnr;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `application`
--

DROP TABLE IF EXISTS `application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `application` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `state` enum('APPROVED','DRAFT','INFO_REQUESTED','RESUBMITTED','SUBMITTED','UNDER_REVIEW','VERIFIED') NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `version` bigint DEFAULT NULL,
  `audit_log_id` bigint DEFAULT NULL,
  `institution_id` bigint DEFAULT NULL,
  `application_name` varchar(255) DEFAULT NULL,
  `application_type` varchar(255) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `institutionpk` bigint DEFAULT NULL,
  `reference_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKoiemyi1t7vmqofh193snkdhkm` (`audit_log_id`),
  KEY `FKb8muakl5985gw6voe938ntisj` (`institution_id`),
  CONSTRAINT `FKb8muakl5985gw6voe938ntisj` FOREIGN KEY (`institution_id`) REFERENCES `institution` (`id`),
  CONSTRAINT `FKbwgei0u04m42b1wciq6fy28a7` FOREIGN KEY (`audit_log_id`) REFERENCES `audit_log` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `application_action`
--

DROP TABLE IF EXISTS `application_action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `application_action` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `action_state` enum('APPROVED','DRAFT','INFO_REQUESTED','RESUBMITTED','SUBMITTED','UNDER_REVIEW','VERIFIED') DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `application_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKb1ewl3be05qirqayp2249f7fv` (`application_id`),
  KEY `FKr66jltotgffhpr4ohdt20u3bh` (`user_id`),
  CONSTRAINT `FKb1ewl3be05qirqayp2249f7fv` FOREIGN KEY (`application_id`) REFERENCES `application` (`id`),
  CONSTRAINT `FKr66jltotgffhpr4ohdt20u3bh` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `application_document`
--

DROP TABLE IF EXISTS `application_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `application_document` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content_type` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `mime_type` varchar(255) DEFAULT NULL,
  `size` bigint DEFAULT NULL,
  `stored_file_name` varchar(255) DEFAULT NULL,
  `version` bigint DEFAULT NULL,
  `application_id` bigint DEFAULT NULL,
  `uploaded_by_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK949sx1qkharvq1jcw1em3me1s` (`application_id`),
  KEY `FK10asdo8go1egum0ia43a7e3c7` (`uploaded_by_id`),
  CONSTRAINT `FK10asdo8go1egum0ia43a7e3c7` FOREIGN KEY (`uploaded_by_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK949sx1qkharvq1jcw1em3me1s` FOREIGN KEY (`application_id`) REFERENCES `application` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `audit_log`
--

DROP TABLE IF EXISTS `audit_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_log` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `action` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `new_state` enum('APPROVED','DRAFT','INFO_REQUESTED','RESUBMITTED','SUBMITTED','UNDER_REVIEW','VERIFIED') NOT NULL,
  `old_state` enum('APPROVED','DRAFT','INFO_REQUESTED','RESUBMITTED','SUBMITTED','UNDER_REVIEW','VERIFIED') NOT NULL,
  `acted_by_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKixncjitpdycoamwh1eremkvra` (`acted_by_id`),
  CONSTRAINT `FKixncjitpdycoamwh1eremkvra` FOREIGN KEY (`acted_by_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `mime_type` varchar(255) DEFAULT NULL,
  `size` bigint DEFAULT NULL,
  `version` bigint DEFAULT NULL,
  `application_id` bigint DEFAULT NULL,
  `uploaded_by_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK44725n9linud4cn2b1rsmavia` (`application_id`),
  KEY `FK9wys1yod64gek3ssxdk6jpfji` (`uploaded_by_id`),
  CONSTRAINT `FK44725n9linud4cn2b1rsmavia` FOREIGN KEY (`application_id`) REFERENCES `application` (`id`),
  CONSTRAINT `FK9wys1yod64gek3ssxdk6jpfji` FOREIGN KEY (`uploaded_by_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `institution`
--

DROP TABLE IF EXISTS `institution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institution` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `abbreviation` varchar(255) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `tin` varchar(255) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6vp8bw43tw3a4rohtp8iottcm` (`abbreviation`),
  UNIQUE KEY `UKqhw15h5f7nc4g3ndva8sory1u` (`name`),
  UNIQUE KEY `UK58ldeue67sqx0bxjy37cv1twm` (`tin`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `display_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK2ojme20jpga3r4r79tdso17gi` (`name`),
  UNIQUE KEY `UK4oq21uwhoyw0ssoi196kahaph` (`display_name`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `display_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK8sewwnpamngi6b1dwaa88askk` (`name`),
  UNIQUE KEY `UKac56dul55smn5it0ce76jswg3` (`display_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `role_permission`
--

DROP TABLE IF EXISTS `role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permission` (
  `role_id` bigint NOT NULL,
  `perm_id` bigint NOT NULL,
  KEY `FKsmptisptxmu9dit58tx7i99l` (`perm_id`),
  KEY `FKa6jx8n8xkesmjmv6jqug6bg68` (`role_id`),
  CONSTRAINT `FKa6jx8n8xkesmjmv6jqug6bg68` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `FKsmptisptxmu9dit58tx7i99l` FOREIGN KEY (`perm_id`) REFERENCES `permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `logged_in` bit(1) NOT NULL,
  `national_id` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE','PENDING','REJECTED') DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `role_id` bigint DEFAULT NULL,
  `institution_id` bigint DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UK5rni7sst5cu05f85kawcglq6s` (`national_id`),
  UNIQUE KEY `UKdi6l3e0al57de4042735uty9w` (`telephone`),
  KEY `FKn82ha3ccdebhokx3a8fgdqeyy` (`role_id`),
  KEY `FKjbkkfl7f3ffm66dmg5aw4yfv3` (`institution_id`),
  CONSTRAINT `FKjbkkfl7f3ffm66dmg5aw4yfv3` FOREIGN KEY (`institution_id`) REFERENCES `institution` (`id`),
  CONSTRAINT `FKn82ha3ccdebhokx3a8fgdqeyy` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-11 14:15:52


USE bnr;

INSERT INTO institution (
    id,
    abbreviation,
    created_at,
    created_by,
    location,
    name,
    tin,
    updated_at
)
VALUES
(
    1,
    'BK',
    NOW(),
    'SYSTEM',
    'Kigali',
    'Bank of Kigali',
    '100200300',
    NOW()
),
(
    2,
    'BPR',
    NOW(),
    'SYSTEM',
    'Kigali',
    'BPR Bank Rwanda',
    '200300400',
    NOW()
);

INSERT INTO permission(id, name, display_name, description) VALUES
(1, 'MANAGE_USERS', 'Manage Users', 'Able to manage user accounts'),
(2, 'VIEW_USERS', 'View Users', 'Able to view users'),
(3, 'CREATE_USERS', 'Create Users', 'Able to create users'),
(4, 'UPDATE_USERS', 'Update Users', 'Able to update users'),
(5, 'DELETE_USERS', 'Delete Users', 'Able to delete users'),
(6, 'MANAGE_ROLES', 'Manage Roles', 'Able to manage roles'),
(7, 'MANAGE_PERMISSIONS', 'Manage Permissions', 'Able to manage permissions'),
(8, 'CREATE_APPLICATION', 'Create Application', 'Able to create application'),
(9, 'VIEW_APPLICATION', 'View Application', 'Able to view applications'),
(10, 'UPDATE_APPLICATION', 'Update Application', 'Able to update applications'),
(11, 'DELETE_APPLICATION', 'Delete Application', 'Able to delete applications'),
(12, 'SUBMIT_APPLICATION', 'Submit Application', 'Able to submit applications'),
(13, 'REVIEW_APPLICATION', 'Review Application', 'Able to review applications'),
(14, 'RETURN_APPLICATION', 'Return Application', 'Able to return applications for correction'),
(15, 'VERIFY_APPLICATION', 'Verify Application', 'Able to verify applications'),
(16, 'APPROVE_APPLICATION', 'Approve Application', 'Able to approve applications'),
(17, 'REJECT_APPLICATION', 'Reject Application', 'Able to reject applications'),
(18, 'UPLOAD_DOCUMENT', 'Upload Document', 'Able to upload documents'),
(19, 'VIEW_DOCUMENT', 'View Document', 'Able to view documents'),
(20, 'DELETE_DOCUMENT', 'Delete Document', 'Able to delete documents'),
(21, 'VERIFY_DOCUMENT', 'Verify Document', 'Able to verify documents'),
(22, 'VIEW_AUDIT_LOGS', 'View Audit Logs', 'Able to view audit logs'),
(23, 'VIEW_REPORTS', 'View Reports', 'Able to view reports'),
(24, 'EXPORT_REPORTS', 'Export Reports', 'Able to export reports'),
(25, 'SEND_NOTIFICATION', 'Send Notification', 'Able to send notifications'),
(26, 'VIEW_DASHBOARD', 'View Dashboard', 'Able to access dashboard'),
(27, 'GENERATE_LICENSE', 'Generate License', 'Able to generate licenses'),
(28, 'VIEW_LICENSE', 'View License', 'Able to view licenses'),
(29, 'REVOKE_LICENSE', 'Revoke License', 'Able to revoke licenses'),
(30, 'ADD_COMMENT', 'Add Comment', 'Able to add comments on applications'),
(31, 'VIEW_COMMENTS', 'View Comments', 'Able to view comments'),
(32, 'RESET_PASSWORD', 'Reset Password', 'Able to reset user passwords'),
(33, 'LOCK_USER_ACCOUNT', 'Lock User Account', 'Able to lock user accounts'),
(34, 'UNLOCK_USER_ACCOUNT', 'Unlock User Account', 'Able to unlock user accounts'),
(35, 'DOWNLOAD_AUDIT_LOGS', 'Download Audit Logs', 'Able to download audit logs'),
(36, 'MANAGE_INSTITUTIONS', 'Manage Institutions', 'Able to manage institutions'),
(37, 'CREATE_INSTITUTION', 'Create Institution', 'Able to create institutions'),
(38, 'VIEW_INSTITUTION', 'View Institution', 'Able to view institutions'),
(39, 'UPDATE_INSTITUTION', 'Update Institution', 'Able to update institutions'),
(40, 'DELETE_INSTITUTION', 'Delete Institution', 'Able to delete institutions'),
(41, 'ASSIGN_USERS_TO_INSTITUTION', 'Assign Users To Institution', 'Able to assign users to institutions');


INSERT INTO role (id, name, display_name) VALUES
(1, 'ROLE_ADMIN', 'Administrator'),
(2, 'ROLE_APPLICANT', 'Applicant'),
(3, 'ROLE_REVIEWER', 'Reviewer'),
(4, 'ROLE_VERIFIER', 'Verifier'),
(5, 'ROLE_APPROVER', 'Approver');

INSERT INTO role_permission (role_id, perm_id) VALUES
(1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),
(1,10),(1,11),(1,12),(1,13),(1,14),(1,15),(1,16),(1,17),
(1,18),(1,19),(1,20),(1,21),(1,22),(1,23),(1,24),(1,25),
(1,26),(1,27),(1,28),(1,29),(1,30),(1,31),(1,32),(1,33),
(1,34),(1,35),(1,36),(1,37),(1,38),(1,39),(1,40),(1,41);


INSERT INTO role_permission (role_id, perm_id) VALUES
(2,8),(2,9),(2,10),(2,12),(2,18),
(2,19),(2,30),(2,31),(2,26),(2,25);


INSERT INTO role_permission (role_id, perm_id) VALUES
(3,9),(3,13),(3,14),(3,18),
(3,19),(3,30),(3,31),(3,26);


INSERT INTO role_permission (role_id, perm_id) VALUES
(4,9),(4,15),(4,21),
(4,19),(4,30),(4,31),(4,26);


INSERT INTO role_permission (role_id, perm_id) VALUES
(5,9),(5,16),(5,17),(5,27),
(5,28),(5,19),(5,30),(5,31),(5,26);


-- PASSWORD = 12345678


INSERT INTO user (
    id,
    email,
    first_name,
    last_name,
    logged_in,
    national_id,
    password,
    status,
    telephone,
    role_id,
    institution_id,
    title
)
VALUES
(
    1,
    'admin@bnr.rw',
    'System',
    'Admin',
    b'0',
    '1199999999999991',
    '$2a$10$5.EDDWsbgzcASbBEzHwks.EZ88IEdH9TTcJ/4mQWUbwmfxtXYX1Qe',
    'ACTIVE',
    '0788000001',
    1,
    1,
    'Administrator'
),
(
    2,
    'applicant@bk.rw',
    'John',
    'Doe',
    b'0',
    '1199999999999992',
    '$2a$10$5.EDDWsbgzcASbBEzHwks.EZ88IEdH9TTcJ/4mQWUbwmfxtXYX1Qe',
    'ACTIVE',
    '0788000002',
    2,
    1,
    'Business Owner'
),
(
    3,
    'reviewer@bnr.rw',
    'Jane',
    'Reviewer',
    b'0',
    '1199999999999993',
    '$2a$10$5.EDDWsbgzcASbBEzHwks.EZ88IEdH9TTcJ/4mQWUbwmfxtXYX1Qe',
    'ACTIVE',
    '0788000003',
    3,
    1,
    'Reviewer Officer'
),
(
    4,
    'verifier@bnr.rw',
    'Eric',
    'Verifier',
    b'0',
    '1199999999999994',
    '$2a$10$5.EDDWsbgzcASbBEzHwks.EZ88IEdH9TTcJ/4mQWUbwmfxtXYX1Qe',
    'ACTIVE',
    '0788000004',
    4,
    2,
    'Verification Officer'
),
(
    5,
    'approver@bnr.rw',
    'Alice',
    'Approver',
    b'0',
    '1199999999999995',
    '$2a$10$5.EDDWsbgzcASbBEzHwks.EZ88IEdH9TTcJ/4mQWUbwmfxtXYX1Qe',
    'ACTIVE',
    '0788000005',
    5,
    1,
    'Approval Manager'
);

INSERT INTO audit_log (
    id,
    action,
    created_at,
    new_state,
    old_state,
    acted_by_id
)
VALUES
(
    1,
    'Application Submitted',
    NOW(),
    'SUBMITTED',
    'DRAFT',
    2
),
(
    2,
    'Application Sent For Review',
    NOW(),
    'UNDER_REVIEW',
    'SUBMITTED',
    3
);

INSERT INTO application (
    id,
    created_at,
    state,
    updated_at,
    version,
    audit_log_id,
    institution_id,
    application_name,
    application_type,
    contact_email,
    contact_phone,
    created_by,
    description,
    institutionpk,
    reference_number
)
VALUES
(
    1,
    NOW(),
    'SUBMITTED',
    NOW(),
    0,
    1,
    1,
    'Forex Trading License',
    'FOREX',
    'applicant@bk.rw',
    '0788000002',
    'applicant@bk.rw',
    'Application for forex trading operations',
    1,
    'APP-2026-001'
),
(
    2,
    NOW(),
    'UNDER_REVIEW',
    NOW(),
    0,
    2,
    2,
    'Microfinance License',
    'MICROFINANCE',
    'applicant@bk.rw',
    '0788000002',
    'applicant@bk.rw',
    'Application for microfinance services',
    2,
    'APP-2026-002'
);

INSERT INTO application_action (
    id,
    action_state,
    comment,
    created_at,
    application_id,
    user_id
)
VALUES
(
    1,
    'SUBMITTED',
    'Application submitted successfully',
    NOW(),
    1,
    2
),
(
    2,
    'UNDER_REVIEW',
    'Review process started',
    NOW(),
    2,
    3
);

INSERT INTO application_document (
    id,
    content_type,
    created_at,
    file_name,
    file_path,
    mime_type,
    size,
    stored_file_name,
    version,
    application_id,
    uploaded_by_id
)
VALUES
(
    1,
    'application/pdf',
    NOW(),
    'business-plan.pdf',
    '/uploads/business-plan.pdf',
    'application/pdf',
    204800,
    '172839_business-plan.pdf',
    0,
    1,
    2
),
(
    2,
    'application/pdf',
    NOW(),
    'financial-statement.pdf',
    '/uploads/financial-statement.pdf',
    'application/pdf',
    304800,
    '172840_financial-statement.pdf',
    0,
    2,
    2
);
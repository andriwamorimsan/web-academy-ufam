CREATE TABLE `UserType` (
  `id` VARCHAR(20) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UserType_name_key` (`name`)
);

CREATE TABLE `Product` (
  `id` CHAR(36) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `stockQuantity` INTEGER NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `Product_name_key` (`name`)
);

CREATE TABLE `User` (
  `id` CHAR(36) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `userTypeId` VARCHAR(20) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `User_email_key` (`email`),
  CONSTRAINT `User_userTypeId_fkey` FOREIGN KEY (`userTypeId`) REFERENCES `UserType` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE `Purchase` (
  `id` CHAR(36) NOT NULL,
  `userId` CHAR(36) NOT NULL,
  `total` DECIMAL(10, 2) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  CONSTRAINT `Purchase_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE `PurchaseItem` (
  `id` CHAR(36) NOT NULL,
  `purchaseId` CHAR(36) NOT NULL,
  `productId` CHAR(36) NOT NULL,
  `quantity` INTEGER NOT NULL,
  `unitPrice` DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `PurchaseItem_purchaseId_fkey` FOREIGN KEY (`purchaseId`) REFERENCES `Purchase` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `PurchaseItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

INSERT INTO `UserType` (`id`, `name`) VALUES ('ADMIN', 'Administrador');
INSERT INTO `UserType` (`id`, `name`) VALUES ('CLIENT', 'Cliente');

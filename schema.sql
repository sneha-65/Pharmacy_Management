CREATE DATABASE IF NOT EXISTS PharmacyManagement;

USE PharmacyManagement;

-- ==========================================
-- CUSTOMERS
-- ==========================================

CREATE TABLE Customers (

    CustomerID INT PRIMARY KEY AUTO_INCREMENT,

    CustomerName VARCHAR(100) NOT NULL,

    Phone VARCHAR(20),

    Address VARCHAR(255),

    Email VARCHAR(100)

);

-- ==========================================
-- SUPPLIERS
-- ==========================================

CREATE TABLE Suppliers (

    SupplierID INT PRIMARY KEY AUTO_INCREMENT,

    SupplierName VARCHAR(100) NOT NULL,

    Phone VARCHAR(20),

    Email VARCHAR(100),

    Address VARCHAR(255)

);

-- ==========================================
-- MEDICINES
-- ==========================================

CREATE TABLE Medicines (

    MedicineID INT PRIMARY KEY AUTO_INCREMENT,

    MedicineName VARCHAR(150) NOT NULL,

    Category VARCHAR(100),

    Manufacturer VARCHAR(100),

    Price DECIMAL(10,2),

    ExpiryDate DATE,

    BatchNumber VARCHAR(50)

);

-- ==========================================
-- INVENTORY
-- ==========================================

CREATE TABLE Inventory (

    InventoryID INT PRIMARY KEY AUTO_INCREMENT,

    MedicineID INT,

    CurrentStock INT,

    ReorderLevel INT,

    LastUpdated DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (MedicineID)
    REFERENCES Medicines(MedicineID)

);
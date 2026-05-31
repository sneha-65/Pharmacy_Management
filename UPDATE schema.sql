CREATE TABLE Purchases (

    PurchaseID INT PRIMARY KEY AUTO_INCREMENT,

    SupplierID INT,

    PurchaseDate DATETIME DEFAULT CURRENT_TIMESTAMP,

    TotalAmount DECIMAL(10,2),

    FOREIGN KEY (SupplierID)
    REFERENCES Suppliers(SupplierID)

);


CREATE TABLE PurchaseItems (

    PurchaseItemID INT PRIMARY KEY AUTO_INCREMENT,

    PurchaseID INT,

    MedicineID INT,

    Quantity INT,

    UnitPrice DECIMAL(10,2),

    SubTotal DECIMAL(10,2),

    FOREIGN KEY (PurchaseID)
    REFERENCES Purchases(PurchaseID),

    FOREIGN KEY (MedicineID)
    REFERENCES Medicines(MedicineID)

);


CREATE TABLE Sales (

    SaleID INT PRIMARY KEY AUTO_INCREMENT,

    CustomerID INT,

    SaleDate DATETIME DEFAULT CURRENT_TIMESTAMP,

    TotalAmount DECIMAL(10,2),

    FOREIGN KEY (CustomerID)
    REFERENCES Customers(CustomerID)

);


CREATE TABLE SaleItems (

    SaleItemID INT PRIMARY KEY AUTO_INCREMENT,

    SaleID INT,

    MedicineID INT,

    Quantity INT,

    UnitPrice DECIMAL(10,2),

    SubTotal DECIMAL(10,2),

    FOREIGN KEY (SaleID)
    REFERENCES Sales(SaleID),

    FOREIGN KEY (MedicineID)
    REFERENCES Medicines(MedicineID)

);


CREATE TABLE Bills (

    BillID INT PRIMARY KEY AUTO_INCREMENT,

    SaleID INT,

    GSTAmount DECIMAL(10,2),

    GrandTotal DECIMAL(10,2),

    PaymentStatus VARCHAR(50),

    BillDate DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (SaleID)
    REFERENCES Sales(SaleID)

);
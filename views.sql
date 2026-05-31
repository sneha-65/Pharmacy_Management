~
# 1. Customer Sales View

Shows customer purchase history.

    sql
CREATE OR REPLACE VIEW vw_CustomerSales AS

SELECT

    c.CustomerID,
    c.CustomerName,
    m.MedicineName,
    s.QuantitySold,
    s.SaleDate,
    b.GrandTotal

FROM Sales s

JOIN Customers c
ON s.CustomerID = c.CustomerID

JOIN Medicines m
ON s.MedicineID = m.MedicineID

LEFT JOIN Bills b
ON s.SaleID = b.SaleID;
    

Test:

    sql
SELECT * FROM vw_CustomerSales;
    

---

# 2. Inventory Status View

Used for inventory page.

    sql
CREATE OR REPLACE VIEW vw_InventoryStatus AS

SELECT

    i.InventoryID,
    m.MedicineID,
    m.MedicineName,
    i.CurrentStock,
    i.ReorderLevel,

    CASE

        WHEN i.CurrentStock <= i.ReorderLevel
        THEN 'LOW STOCK'

        ELSE 'AVAILABLE'

    END AS StockStatus

FROM Inventory i

JOIN Medicines m
ON i.MedicineID = m.MedicineID;
    

Test:

    sql
SELECT * FROM vw_InventoryStatus;
    

---

# 3. Low Stock Medicines View

    sql
CREATE OR REPLACE VIEW vw_LowStockMedicines AS

SELECT

    m.MedicineID,
    m.MedicineName,
    i.CurrentStock,
    i.ReorderLevel

FROM Inventory i

JOIN Medicines m
ON i.MedicineID = m.MedicineID

WHERE i.CurrentStock <= i.ReorderLevel;
    

Test:

    sql
SELECT * FROM vw_LowStockMedicines;
    

---

# 4. Expiry Medicines View

    sql
CREATE OR REPLACE VIEW vw_ExpiryMedicines AS

SELECT

    MedicineID,
    MedicineName,
    ExpiryDate

FROM Medicines

WHERE ExpiryDate <= DATE_ADD(CURDATE(), INTERVAL 60 DAY);
    

Test:

    sql
SELECT * FROM vw_ExpiryMedicines;
    

---

# 5. Supplier Purchases View

Shows medicines purchased from suppliers.

    sql
CREATE OR REPLACE VIEW vw_SupplierPurchases AS

SELECT

    p.PurchaseID,
    s.SupplierName,
    m.MedicineName,
    p.QuantityPurchased,
    p.PurchasePrice,
    p.PurchaseDate

FROM Purchases p

JOIN Suppliers s
ON p.SupplierID = s.SupplierID

JOIN Medicines m
ON p.MedicineID = m.MedicineID;
    

Test:

    sql
SELECT * FROM vw_SupplierPurchases;
    

---

# 6. Sales Report View

    sql
CREATE OR REPLACE VIEW vw_SalesReport AS

SELECT

    s.SaleID,
    c.CustomerName,
    m.MedicineName,
    s.QuantitySold,
    s.SaleDate,
    b.GrandTotal

FROM Sales s

JOIN Customers c
ON s.CustomerID = c.CustomerID

JOIN Medicines m
ON s.MedicineID = m.MedicineID

LEFT JOIN Bills b
ON s.SaleID = b.SaleID;
    

Test:

    sql
SELECT * FROM vw_SalesReport;
    

---

# 7. Dashboard Summary View

Used for analytics dashboard.

    sql
CREATE OR REPLACE VIEW vw_DashboardSummary AS

SELECT

(
    SELECT COUNT(*)
    FROM Customers
) AS TotalCustomers,

(
    SELECT COUNT(*)
    FROM Medicines
) AS TotalMedicines,

(
    SELECT COUNT(*)
    FROM Suppliers
) AS TotalSuppliers,

(
    SELECT COUNT(*)
    FROM Sales
) AS TotalSales,

(
    SELECT IFNULL(SUM(GrandTotal),0)
    FROM Bills
) AS TotalRevenue;
    

Test:

    sql
SELECT * FROM vw_DashboardSummary;
    

---

# 8. Audit Log View

    sql
CREATE OR REPLACE VIEW vw_AuditHistory AS

SELECT

    LogID,
    Username,
    ActionPerformed,
    ActionTime

FROM AuditLogs

ORDER BY ActionTime DESC;
    

Test:

    sql
SELECT * FROM vw_AuditHistory;
    


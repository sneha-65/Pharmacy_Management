USE PharmacyManagement;

-- ==========================================
-- CUSTOMERS
-- ==========================================

INSERT INTO Customers(

CustomerName,
Phone,
Address,
Email

)

VALUES

(
'Rahul Sharma',
'9876543210',
'Hyderabad',
'rahul@gmail.com'
),

(
'Priya Verma',
'9876501234',
'Bangalore',
'priya@gmail.com'
);

-- ==========================================
-- SUPPLIERS
-- ==========================================

INSERT INTO Suppliers(

SupplierName,
Phone,
Email,
Address

)

VALUES

(
'Sun Pharma',
'9000011111',
'sales@sunpharma.com',
'Mumbai'
),

(
'Cipla',
'9000022222',
'contact@cipla.com',
'Pune'
);

-- ==========================================
-- MEDICINES
-- ==========================================

INSERT INTO Medicines(

MedicineName,
Category,
Manufacturer,
Price,
ExpiryDate,
BatchNumber

)

VALUES

(
'Dolo 650',
'Fever',
'Micro Labs',
30,
'2027-12-31',
'D650A'
),

(
'Paracetamol',
'Pain Relief',
'Cipla',
20,
'2027-08-15',
'P100B'
),

(
'Amoxicillin',
'Antibiotic',
'Sun Pharma',
120,
'2028-03-10',
'A500C'
);

-- ==========================================
-- INVENTORY
-- ==========================================

INSERT INTO Inventory(

MedicineID,
CurrentStock,
ReorderLevel

)

VALUES

(
1,
200,
50
),

(
2,
300,
75
),

(
3,
150,
40
);
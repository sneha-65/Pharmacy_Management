from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import jwt
import datetime

app = Flask(__name__)
CORS(app)
SECRET_KEY = "pharmacy_secret"
def get_connection():

    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Mysql6537@js",
        database="PharmacyManagement",
        autocommit=True
    )

@app.route("/")
def home():

    return "Pharmacy Backend Running"
@app.route("/login", methods=["POST"])
def login():

    data = request.json

    conn = get_connection()
    cur = conn.cursor(dictionary=True)

    cur.execute("""

    SELECT *

    FROM Users

    WHERE Username=%s
    AND PasswordHash=%s

    """,(

        data["username"],
        data["password"]

    ))

    user = cur.fetchone()

    if not user:

        return jsonify({
            "error":"Invalid Login"
        }),401

    token = jwt.encode(

        {

            "user":

            user["Username"],

            "role":

            user["Role"],

            "exp":

            datetime.datetime.utcnow()
            +
            datetime.timedelta(hours=8)

        },

        SECRET_KEY,

        algorithm="HS256"

    )

    return jsonify({

        "token":token,

        "role":user["Role"]

    })

def log_activity(username, action):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""

    INSERT INTO AuditLogs(

    Username,
    ActionPerformed

    )

    VALUES(%s,%s)

    """,(

        username,
        action

    ))

    conn.commit()

    cur.close()
    conn.close()
@app.route("/auditLogs")
def audit_logs():

    conn=get_connection()
    cur=conn.cursor(dictionary=True)

    cur.execute("""

    SELECT *

    FROM AuditLogs

    ORDER BY ActionTime DESC

    """)

    data=cur.fetchall()

    cur.close()
    conn.close()

    return jsonify(data)
# ====================================
# DASHBOARD
# ====================================

@app.route("/dashboard")
def dashboard():

    conn = get_connection()
    cur = conn.cursor(dictionary=True)

    # Total Customers

    cur.execute("""
    SELECT COUNT(*) AS totalCustomers
    FROM Customers
    """)

    customers = cur.fetchone()

    # Total Medicines

    cur.execute("""
    SELECT COUNT(*) AS totalMedicines
    FROM Medicines
    """)

    medicines = cur.fetchone()

    # Total Revenue

    cur.execute("""
    SELECT IFNULL(SUM(GrandTotal),0)
    AS totalRevenue
    FROM Bills
    """)

    revenue = cur.fetchone()

    # Total Sales

    cur.execute("""
    SELECT COUNT(*) AS totalSales
    FROM Sales
    """)

    sales = cur.fetchone()

    cur.close()
    conn.close()

    return jsonify({

        "customers":
        customers["totalCustomers"],

        "medicines":
        medicines["totalMedicines"],

        "revenue":
        revenue["totalRevenue"],

        "sales":
        sales["totalSales"]

    })

# ====================================
# CUSTOMERS
# ====================================

@app.route("/customers")
def customers():

    conn = get_connection()
    cur = conn.cursor(dictionary=True)

    cur.execute("""
    SELECT *
    FROM Customers
    """)

    data = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify(data)

@app.route("/addCustomer", methods=["POST"])
def add_customer():

    data = request.json

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
    INSERT INTO Customers(
    CustomerName,
    Phone,
    Address,
    Email
    )
    VALUES(%s,%s,%s,%s)
    """,
    (
        data["name"],
        data["phone"],
        data["address"],
        data["email"]
    ))

    conn.commit()
    log_activity(
        data["name"],
        "Added Customer"
    )

    cur.close()
    conn.close()

    return jsonify({"message":"Customer Added"})
@app.route("/updateCustomer/<int:id>", methods=["PUT"])
def update_customer(id):

    data = request.json

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
    UPDATE Customers
    SET
    CustomerName=%s,
    Phone=%s,
    Address=%s,
    Email=%s
    WHERE CustomerID=%s
    """,
    (
        data["name"],
        data["phone"],
        data["address"],
        data["email"],
        id
    ))

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({"message":"Customer Updated"})
@app.route("/deleteCustomer/<int:id>", methods=["DELETE"])
def delete_customer(id):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
    DELETE FROM Customers
    WHERE CustomerID=%s
    """,(id,))

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({"message":"Customer Deleted"})

# ====================================
# MEDICINES
# ====================================

@app.route("/medicines")
def medicines():

    conn = get_connection()
    cur = conn.cursor(dictionary=True)

    cur.execute("""

    SELECT

    m.*,
    i.CurrentStock

    FROM Medicines m

    JOIN Inventory i

    ON m.MedicineID=i.MedicineID

    """)

    data = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify(data)

@app.route("/addMedicine", methods=["POST"])
def add_medicine():

    data = request.json

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
    INSERT INTO Medicines(
    MedicineName,
    Category,
    Manufacturer,
    Price,
    ExpiryDate,
    BatchNumber
    )
    VALUES(%s,%s,%s,%s,%s,%s)
    """,
    (
        data["medicineName"],
        data["category"],
        data["manufacturer"],
        data["price"],
        data["expiryDate"],
        data["batchNumber"]
    ))

    medicine_id = cur.lastrowid

    cur.execute("""
    INSERT INTO Inventory(
    MedicineID,
    CurrentStock,
    ReorderLevel
    )
    VALUES(%s,%s,%s)
    """,
    (
        medicine_id,
        data["stock"],
        data["reorderLevel"]
    ))

    conn.commit()
    log_activity(
        "admin",
        "Added Medicine"
    )
    cur.close()
    conn.close()

    return jsonify({"message":"Medicine Added"})
@app.route("/deleteMedicine/<int:id>", methods=["DELETE"])
def delete_medicine(id):

    conn = get_connection()
    cur = conn.cursor()

    try:

        cur.execute("""
        DELETE FROM Inventory
        WHERE MedicineID=%s
        """,(id,))

        cur.execute("""
        DELETE FROM Medicines
        WHERE MedicineID=%s
        """,(id,))

        conn.commit()

        return jsonify({
            "message":"Medicine Deleted"
        })

    except Exception as e:

        return jsonify({
            "error":str(e)
        })

    finally:

        cur.close()
        conn.close()
@app.route("/expiryMedicines")
def expiry_medicines():

    conn = get_connection()
    cur = conn.cursor(dictionary=True)

    cur.execute("""

    SELECT *

    FROM Medicines

    WHERE ExpiryDate <=

    DATE_ADD(CURDATE(),INTERVAL 60 DAY)

    """)

    data = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify(data)
@app.route("/addPurchase",methods=["POST"])
def add_purchase():

    data=request.json

    conn=get_connection()
    cur=conn.cursor()

    cur.execute("""

    INSERT INTO Purchases(

    SupplierID,
    MedicineID,
    QuantityPurchased,
    PurchasePrice

    )

    VALUES(%s,%s,%s,%s)

    """,(

        data["supplierID"],
        data["medicineID"],
        data["quantity"],
        data["purchasePrice"]

    ))

    conn.commit()
    log_activity(
    "admin",
    "Created Purchase"
    )

    cur.close()
    conn.close()

    return jsonify({
        "message":"Purchase Added"
    })

# ====================================
# INVENTORY
# ====================================



# ====================================
# LOW STOCK
# ====================================

@app.route("/lowStock")
def low_stock():

    conn = get_connection()
    cur = conn.cursor(dictionary=True)

    cur.execute("""

    SELECT

    m.MedicineName,
    i.CurrentStock,
    i.ReorderLevel

    FROM Inventory i

    JOIN Medicines m

    ON i.MedicineID=m.MedicineID

    WHERE CurrentStock <= ReorderLevel

    """)

    data = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify(data)

# ====================================
# SALES REPORT
# ====================================

@app.route("/salesReport")
def sales_report():

    conn = get_connection()
    cur = conn.cursor(dictionary=True)

    cur.execute("""
    SELECT *
    FROM SalesReport
    """)

    data = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify(data)
@app.route("/addSale", methods=["POST"])
def add_sale():

    data = request.json

    conn = get_connection()
    cur = conn.cursor()

    try:

        cur.callproc(

            "AddSale",

            (

                data["customerID"],
                data["medicineID"],
                data["quantity"]

            )

        )

        conn.commit()
        log_activity(
            "admin",
            "Completed Sale"
        )

        return jsonify({

            "message":"Sale Completed"

        })

    except Exception as e:

        return jsonify({

            "error":str(e)

        })

    finally:

        cur.close()
        conn.close()
# ====================================
# SUPPLIERS
# ====================================
@app.route("/suppliers")
def suppliers():

    conn=get_connection()
    cur=conn.cursor(dictionary=True)

    cur.execute("""
    SELECT *
    FROM Suppliers
    """)

    data=cur.fetchall()

    cur.close()
    conn.close()

    return jsonify(data)
@app.route("/addSupplier",methods=["POST"])
def add_supplier():

    data=request.json

    conn=get_connection()
    cur=conn.cursor()

    cur.execute("""

    INSERT INTO Suppliers(

    SupplierName,
    ContactPerson,
    Phone,
    Email,
    Address

    )

    VALUES(%s,%s,%s,%s,%s)

    """,(

        data["supplierName"],
        data["contactPerson"],
        data["phone"],
        data["email"],
        data["address"]

    ))

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({
        "message":"Supplier Added"
    })

@app.route("/inventory")
def inventory():

    conn = get_connection()
    cur = conn.cursor(dictionary=True)

    cur.execute("""
    SELECT

    i.InventoryID,
    m.MedicineName,
    i.CurrentStock,
    i.ReorderLevel

    FROM Inventory i

    JOIN Medicines m
    ON i.MedicineID = m.MedicineID
    """)

    data = cur.fetchall()

    cur.close()
    conn.close()

@app.route("/reports")
def reports():

    conn = get_connection()
    cur = conn.cursor(dictionary=True)

    cur.execute("""
    SELECT

    COUNT(*) AS TotalSales,
    SUM(GrandTotal) AS Revenue

    FROM Bills
    """)

    report = cur.fetchone()

    cur.close()
    conn.close()

    return jsonify(report)

if __name__ == "__main__":
    app.run(debug=True)
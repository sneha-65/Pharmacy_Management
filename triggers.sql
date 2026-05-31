USE PharmacyManagement;

DROP TRIGGER IF EXISTS trg_ReduceStock;

DELIMITER $$

CREATE TRIGGER trg_ReduceStock

AFTER INSERT

ON SaleItems

FOR EACH ROW

BEGIN

    UPDATE Inventory

    SET CurrentStock = CurrentStock - NEW.Quantity

    WHERE MedicineID = NEW.MedicineID;

END $$

DELIMITER ;

SELECT *
FROM Inventory;
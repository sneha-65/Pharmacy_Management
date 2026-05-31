USE PharmacyManagement;

DROP PROCEDURE IF EXISTS AddSale;

DELIMITER $$

CREATE PROCEDURE AddSale(

    IN pCustomerID INT,
    IN pMedicineID INT,
    IN pQuantity INT

)

BEGIN

    DECLARE vPrice DECIMAL(10,2);
    DECLARE vSubtotal DECIMAL(10,2);
    DECLARE vGST DECIMAL(10,2);
    DECLARE vGrandTotal DECIMAL(10,2);
    DECLARE vSaleID INT;

    -- Get medicine price

    SELECT Price
    INTO vPrice
    FROM Medicines
    WHERE MedicineID = pMedicineID;

    SET vSubtotal = vPrice * pQuantity;

    SET vGST = vSubtotal * 0.18;

    SET vGrandTotal = vSubtotal + vGST;

    -- Create sale

    INSERT INTO Sales(

        CustomerID,
        TotalAmount

    )

    VALUES(

        pCustomerID,
        vSubtotal

    );

    SET vSaleID = LAST_INSERT_ID();

    -- Add sale item

    INSERT INTO SaleItems(

        SaleID,
        MedicineID,
        Quantity,
        UnitPrice,
        SubTotal

    )

    VALUES(

        vSaleID,
        pMedicineID,
        pQuantity,
        vPrice,
        vSubtotal

    );

    -- Generate bill

    INSERT INTO Bills(

        SaleID,
        GSTAmount,
        GrandTotal,
        PaymentStatus

    )

    VALUES(

        vSaleID,
        vGST,
        vGrandTotal,
        'Paid'

    );

END $$

DELIMITER ;

CALL AddSale(

1,
1,
5

);
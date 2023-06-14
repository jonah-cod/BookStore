

-- view 
-- year, month, day, product_id, product_name, sales, 


CREATE OR ALTER VIEW  sales.daily_sales
(
    y,
    m,
    d,
    product_id,
    product_name,
    sales
)
AS
    SELECT
        year(o.order_date) AS y,
        MONTH(o.order_date) AS m,
        DAY(o.order_date) As d,
        p.product_id,
        p.product_name,
        i.quantity * (i.list_price* 1-i.discount) AS sales

    FROM sales.orders o
        INNER JOIN sales.order_items i ON i.order_id = o.order_id
        INNER JOIN production.products p ON p.product_id = i.product_id




select *
from sales.daily_sales_per_year
where y = 2018


DROP  VIEW IF EXISTS sales.daily_sales

EXEC sp_rename @objname= 'sales.daily_sales', @newname = 'daily_sales_per_year';

SELECT OBJECT_DEFINITION(
    OBJECT_ID('sales.daily_sales_per_year')
)viewinfo

# 🧪 Inventory & Invoice Management System

**Company:** UD TECHNOLOGIES (PVT) LTD

---

## 📋 Project Overview

This project is developed as part of the **Intern Test – Inventory & Invoice System** using:

* **Backend:** ASP.NET Core Web API
* **Frontend:** Angular (Reactive Forms)
* **Database:** SQL Server with Entity Framework Core

The system provides **Item Management (CRUD)** and **Invoice Creation (Master–Detail)** functionalities.

---

## 🎯 Features

### 1. Item Management

* Create, Read, Update, Delete items via API.
* Fields: Item ID, Item Name, Price, Available Stock.
* Angular Features:

  * Display items in a data table.
  * Reactive Forms with validations.
  * API service integration for CRUD.

### 2. Invoice Panel

**Invoice Header:**

* Customer Name
* Invoice Date

**Invoice Body (Dynamic Item Grid):**

* Dropdown for item selection.
* Auto-fill price when an item is selected.
* Input for quantity.
* Auto-calculate line total.
* Add/Remove item rows dynamically.
* Display Grand Total.

**On Save:**

* Save invoice and invoice items to the database via API (master–detail).

---

## 🗄 Database Schema

### Item Table

| Column        | Type    | Notes         |
| ------------- | ------- | ------------- |
| ItemId        | int PK  | Primary Key   |
| Name          | string  | Item Name     |
| Price         | decimal | Item Price    |
| StockQuantity | int     | Available Qty |

### Invoice Table

| Column       | Type     | Notes         |
| ------------ | -------- | ------------- |
| InvoiceId    | int PK   | Primary Key   |
| CustomerName | string   | Customer Name |
| InvoiceDate  | DateTime | Invoice Date  |
| GrandTotal   | decimal  | Total Amount  |

### InvoiceItem Table

| Column        | Type    | Notes              |
| ------------- | ------- | ------------------ |
| InvoiceItemId | int PK  | Primary Key        |
| InvoiceId     | int FK  | Linked to Invoice  |
| ItemId        | int FK  | Linked to Item     |
| Quantity      | int     | Quantity Purchased |
| UnitPrice     | decimal | Price per Unit     |
| Total         | decimal | Line Total         |

---

## 🌐 API Endpoints

**Item Management**

* GET `/api/items`
* POST `/api/items`
* PUT `/api/items/{id}`
* DELETE `/api/items/{id}`

**Invoice Management**

* POST `/api/invoices`
* GET `/api/invoices`
* GET `/api/invoices/{id}`

---

## 🖥️ Frontend (Angular)

* Item Management Page – CRUD operations
* Invoice Creation Page – Reactive Forms, dynamic item rows, auto-calculations.
* Services – API calls handled via Angular services.
* Form Validations – Required fields, number validations, and positive values.

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/Apsara770/UD-Intern-Task.git
```

### 2. Backend Installation & Setup (Visual Studio)

1. Navigate to the InventoryInvoiceAPI (backend) folder:

2) Open the `.sln` solution file in **Visual Studio 2022** (or later).
3) Ensure you have the following installed via Visual Studio Installer:

   * ASP.NET and web development workload
   * .NET 6.0 SDK or later
   * SQL Server Data Tools (optional but recommended)
4) Update `appsettings.json` with your SQL Server connection string.
5) Open **Package Manager Console** and run:

```powershell
dotnet ef database update
```

6. Press **F5** or click **Start** in Visual Studio to run the API.

### 3. Database Setup

* Restore the provided `.bak` file in SQL Server Management Studio.
* Ensure the database name matches the one configured in `appsettings.json`.

### 4. Frontend Installation & Setup

1. Navigate to the frontend folder:

```bash
cd InventorySystem
```

2. Install dependencies:

```bash
npm install
```

3. Start the Angular application:

```bash
ng serve
```

4. Application runs on:

```
http://localhost:4200
```

---

## 📦 Deliverables

* Full source code (Backend + Frontend)
* SQL database backup
* README.md file

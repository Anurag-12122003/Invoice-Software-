# 🧾 Invoice & Company Management System (Backend REST API)

Welcome to the backend repository of the **Invoice & Company Management System**. This is a production-ready, beginner-friendly RESTful API built using **Node.js, Express, and MongoDB (Mongoose)**. It provides secure authentication and helps users manage multiple companies, customers, products, and dynamic invoices seamlessly.

---

## 🏗️ Database Architecture & Relations

Understanding how data points link together is crucial. Here is the visual hierarchy and relationship structure of the database:

### 🌟 Project Hierarchy Data Flow
```text
User (Owner)
 │
 └── Company
        │
        ├── Customer ──┐
        │              ├───> Invoice
        ├── Product ───┘        │
        │                       ├──> Items (Invoice Items)
        │                       └──> Payment
        └── Invoice
```

### 🔗 Detailed Relationship Rules
* **User ➔ Company (1:N):** 1 User can create and manage **Many** Companies.
* **Company ➔ Customer (1:N):** 1 Company can add **Many** Customers.
* **Company ➔ Product (1:N):** 1 Company can list **Many** Products.
* **Company ➔ Invoice (1:N):** 1 Company can generate **Many** Invoices.
* **Customer ➔ Invoice (1:N):** 1 Customer can receive **Many** Invoices from the company.
* **Invoice ➔ Items (1:N):** 1 Invoice contains **Many** Individual Line Items (Snapshot of Product fields at sale time).
* **Invoice ➔ Payment (1:N):** 1 Invoice tracks **Many** Payment breakdowns.

---

## 💡 Mongoose Quick Guide for Beginners

If you are new to Mongoose database modelling, here are the core concepts heavily implemented in this project:

### 1. Linking Models Together (Referencing)
To connect tables (e.g., assigning a Customer to a specific Company), we store the parent document's `ObjectId` and point a reference (`ref`) to that model:
```javascript
const customerSchema = new mongoose.Schema({
   company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company" // Must match the exact name of the Company Model
   }
});
```

### 2. Fetching Relational Data (`.populate()`)
By default, Mongo query returns only IDs. To fetch the actual document fields hidden behind that ID, we run `.populate()`:
```javascript
// This replaces the "company ID string" with the complete "Company Data Object"
const customer = await Customer.find().populate("company");
```

### 3. Smart Update Rules (`findByIdAndUpdate` / `findOneAndUpdate`)
When modifying documents, we inject specific helper attributes inside the query option block to maintain database health:
* **`$set: req.body`** ➔ Updates *only* the new incoming fields present in the payload. It keeps all other pre-existing data secure.
* **`new: true`** ➔ Forces MongoDB to instantly return the freshly updated, brand-new document in the API response rather than the old outdated version.
* **`runValidators: true`** ➔ Enforces strict schema rules check during the update phase (e.g., if a user updates `saleprize` to a negative number, it will throw a validation error).

---

## 🧠 Deep Dive: Invoice Controller Architecture

Doosre developers ke liye Invoice implementation ki logical pipeline aur system workflow ka breakdown niche diya gaya hai:

### 🛠️ 1. Create Invoice Flow (`createInvoice`)
Jab frontend se request payload aata hai, to backend yeh sequential logic run karta hai:

1. **Security & Ownership Verification:** 
   * Sabse pehle `Company` model me check hota hai ki requested Company active authenticated user (`req.user.userId`) ki hi hai ya nahi.
   * Uske baad verify hota hai ki `Customer` us particular company ke under registered hai ya nahi.
2. **Dynamic Price & Taxes Engine (Looping `items` Array):**
   * Frontend sirf `product` ID aur `Quantity` bhejta hai. Rate aur GSTPercent directly database se secure runtime standard records se fetch kiye jaate hain taaki manipulation na ho sake.
   * **Calculations Formulations:**
     * $\text{TaxableAmount} = \text{Quantity} \times \text{Product.SalePrice}$
     * $\text{GSTAmount} = \frac{\text{TaxableAmount} \times \text{Product.GSTPercent}}{100}$
     * $\text{TotalAmount} = \text{TaxableAmount} + \text{GSTAmount}$
3. **Automated Serial Number Generator:**
   * System us company ke total invoices count karta hai (`countDocuments`). Usme $+1$ jodkar dynamic serial generate karta hai (e.g., `INV-1`, `INV-2`).
4. **GST Splitting & Deductions:**
   * Tax compliances ke liye pure global total tax ko bifurcate kiya jata hai: $\text{CGST} = \frac{\text{TotalGST}}{2}$ aur $\text{SGST} = \frac{\text{TotalGST}}{2}$.
   * Final payout block banaya jata hai: $\text{GrandTotal} = \text{TotalTaxableAmount} + \text{TotalGSTAmount} - \text{Discount}$.

### 📂 2. Data Retrieval Framework (`getInvoices` & `getInvoiceById`)
* **Bulk Overview:** `getInvoices` endpoint user-specific sorting implementation (`createdAt: -1`) use karta hai taaki sabse naya invoice top par dikhe. Performance optimization ke liye selected strings ko hi populate kiya jata hai (jaise `CompanyName` aur `CustomerName`).
* **Granular Drilldown:** `getInvoiceById` execution chain deep nesting population follow karti hai: `.populate("items.product")`. Isse invoice array ke andar maujood specific sub-document items ke product links bhi direct objects me parse ho jaate hain.

### 🔄 3. Ledger Lifecycle Updates (`updateInvoiceStatus` & `deleteInvoice`)
* **Atomic Status Updates:** Invoice object data structures me database security priority hai, isliye core schema document update controller logic `invoice.save()` standard method trigger karta hai. Yeh lifecycle hooks execute karne aur strict atomic single field mutation tracking me madad karta hai.
* **Purge Execution:** `deleteOne()` standard structure verify hone par document record ko direct flush clear kar deta hai.

---

## 🛠️ Core Tech Stack & Middleware

* **JWT (JSON Web Token):** Handles user session generation and secure endpoint tracking.
* **Cookie Parser:** Safely reads and injects authentication tokens straight inside the browser cookies.
* **Bcryptjs:** Enforces absolute security by hashing user passwords into unreadable strings before database storage.
* **CORS:** Blocks untrusted external sites and allows safe cross-origin data resource access.
* **Dotenv:** Secures app secrets (like DB URIs or Private Keys) inside hidden environment files.

---

## 🚀 REST API Endpoint Documentation

### 🔐 1. Authentication Routes (`/api`)

| Method | Endpoint | Payload / Rules | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/sign-up` | `email`, `password`, `name` | Registers a fresh user on the platform. |
| **POST** | `/api/log-in` | `email`, `password` | Logs user in, signs JWT, and drops it securely inside browser cookies. |
| **POST** | `/api/log-out` | None | Destroys active user token from cookies instantly. |

-------------------------------------------------------------------------------------------------------

### 1. User Registration (Sign Up)
Creates an inactive account and sends a secure 6-digit verification code to the user's inbox.
* **URL:** `/api/sign-up`
* **Method:** `POST`
* **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "securepassword123"
  }
  ```
* **Success Response (201):**
  ```json
  {
    "message": "User registered successfully! Please check your email for the 6-digit code."
  }
  ```

-------------------------------------------------------------------------------------------------------

### 🏢 2. Company Routes (`/api`)

| Method | Endpoint | Payload / Rules | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/companies` | Auth Token Required | Fetches all companies created by the currently logged-in user session. |
| **POST** | `/api/create-company`| `company-name` (Required), Others (Optional) | Provisions a new company profile. |
| **PATCH** | `/api/update-company`| `companyId` in body | Modifies company parameters. **GSTIN unique validation applies; cannot update if it already exists.** |
| **DELETE**| `/api/delete-company`| `companyId` in body | Hard deletes a company document by tracking its unique ID. |

### 👥 3. Customer Routes (`/api`)

| Method | Endpoint | Payload / Rules | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/get-customer` | Auth Token Required | Global search: Retrieves every single customer created by the current user. |
| **GET** | `/api/customers` | Query / Body: `companyId` | Strict filter: Returns customers linked only to the selected active Company. |
| **POST** | `/api/create-customer`| Required: `companyId`, `customerName`. Unique: `GSTIN`, `Email`. | Registers a client under a specific business entity. Enforces uniqueness. |
| **PATCH** | `/api/update-customer`| `customerId` | Modifies client parameters. Checks if updated GSTIN overlaps with another existing customer. |
| **DELETE**| `/api/delete-customer`| `customerId` | Safely purges a customer profile from the system. |

### 📦 4. Product Routes (`/api`)

| Method | Endpoint | Payload / Rules | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/products` | Active Company Session | Fetches active goods (`Status: true`) listed inside the currently selected company. |
| **GET** | `/api/product/:id` | URL Parameter: `id` | Pulls out detailed breakdown data for one exact product ID. |
| **POST** | `/api/create-product` | Required: `company`, `name`, `saleprize`, `user` | Adds a new commodity unit into inventory arrays. |
| **PATCH** | `/api/update-product/:id`| URL Parameter: `id` | Live edits inventory profiles. Triggers schema validators immediately. |
| **PATCH** | `/api/delet-product/:id`| URL Parameter: `id` | **Soft Delete Execution:** Protects historical data. Does not drop rows; flips status field from `true` to `false`. |

### 🧾 5. Invoice Routes (`/api`)

| Method | Endpoint | Payload / Rules | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/create-invoice` | `company`, `customer`, `items: [{product, Quantity}]`, `Discount`, `Notes`, `DueDate` | Creates a new structured retail invoice with automated math calculation algorithms. |
| **GET** | `/api/invoices` | Auth Token Required | Gets all invoices for user sorted by newest first. Includes populated company & customer metadata placeholders. |
| **GET** | `/api/invoice/:id` | URL Parameter: `id` | Pulls highly verbose structural reports for one invoice, nesting full metadata objects. |

## 💳 6. Payment Module

The Payment module is responsible for tracking invoice collections, partial payments, and updating invoice status automatically.

### 🔄 Payment Lifecycle

```text
Invoice Created
      │
      ▼
Payment Added
      │
      ├── Partial Payment → Invoice Status = Partially Paid
      │
      └── Full Payment → Invoice Status = Paid
```

### 📌 Business Rules

* One Invoice can have Multiple Payments.
* Overpayment is not allowed.
* Invoice status updates automatically.
* Payment deletion recalculates invoice status.

### 💳 Payment Routes (`/api`)

| Method     | Endpoint                  | Payload / Rules                                              | Description                                                                    |
| :--------- | :------------------------ | :----------------------------------------------------------- | :----------------------------------------------------------------------------- |
| **POST**   | `/api/create-payment`     | `invoice`, `Amount`, `PaymentMode`, `ReferenceNo`, `Remarks` | Creates a payment against an invoice and updates invoice status automatically. |
| **GET**    | `/api/payments`           | Auth Token Required                                          | Returns all payments of the logged-in user.                                    |
| **GET**    | `/api/payment/:id`        | URL Parameter: `id`                                          | Returns complete details of a specific payment.                                |
| **DELETE** | `/api/delete-payment/:id` | URL Parameter: `id`                                          | Deletes payment and recalculates invoice status.                               |

### 📊 Payment Status Logic

```text
Grand Total = ₹50,000

Payment = ₹20,000
Status = Partially Paid

Remaining Payment = ₹30,000
Status = Paid
```

---

## 📈 7. Dashboard Module

The Dashboard acts as the business overview layer and provides quick insights into the complete system.

### Dashboard Routes (`/api`)

| Method  | Endpoint         | Description                                   |
| :------ | :--------------- | :-------------------------------------------- |
| **GET** | `/api/dashboard` | Returns business analytics and summary cards. |

### Dashboard Metrics

The dashboard provides:

```text
Total Companies

Total Customers

Total Products

Total Invoices

Paid Invoices

Pending Invoices

Total Revenue

Outstanding Amount
```

### Revenue Formula

```text
Total Revenue
=
Sum(Payment.Amount)
```

### Outstanding Formula

```text
Outstanding Amount
=
Total Invoice Amount
-
Total Revenue
```

---

## 👤 8. Profile Module

The Profile module allows authenticated users to manage their account information.

### Profile Routes (`/api`)

| Method    | Endpoint              | Payload / Rules     | Description                                             |
| :-------- | :-------------------- | :------------------ | :------------------------------------------------------ |
| **GET**   | `/api/profile`        | Auth Token Required | Fetches currently logged-in user's profile information. |
| **PATCH** | `/api/update-profile` | `name`, `mobile`    | Updates profile information.                            |

### Profile Features

* View account details.
* Update profile information.
* Secure password storage using Bcrypt.
* JWT protected access.

---

## 🔐 9. Reset Password (Update Action)
Verifies the 15-minute recovery token and safely overwrites the old credentials with the newly hashed password.
* **URL:** `/api/reset-password`
* **Method:** `POST`
* **Request Body:**
  ```json
  {
    "email": "johndoe@example.com",
    "resetCode": "B3F9A2",
    "newPassword": "mybrandnewpassword987"
  }
  ```
* **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Password updated successfully! You can now log in."
  }
  ```

---

## 🔐 10. Forgot Password (OTP Request)
Generates a short-lived recovery token (expires in 15 minutes) and emails it to the user.
* **URL:** `/api/forgot-password`
* **Method:** `POST`
* **Request Body:**
  ```json
  {
    "email": "johndoe@example.com"
  }
  ```
* **Success/OWASP Response (200):**
  *(Note: To prevent email harvesting, the response status and message remain identical even if the email does not exist in the database).*
  ```json
  {
    "message": "If that email exists, a password reset code has been sent."
  }
  ```

---


## 11. Email Verification (OTP Check)
Validates the 6-digit uppercase alphanumeric token sent to the user's mail to flip `isVerified` to `true`.
* **URL:** `/api/verify-email`
* **Method:** `POST`
* **Request Body:**
  ```json
  {
    "email": "johndoe@example.com",
    "verificationCode": "X7R2W9"
  }
  ```
* **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Email verified successfully! You can now log in."
  }
  ```

---

## 🚧 Current Project Progress

```text
Authentication          ✅ Completed

Company Module          ✅ Completed

Customer Module         ✅ Completed

Product Module          ✅ Completed

Invoice Module          ✅ Completed

Payment Module          ✅ Completed

Dashboard Module        ✅ Completed

Profile Module          ✅ Completed

Forgot Password         ✅ Completed

Reset Password          ✅ Completed

Email Verification      ✅ Completed

PDF Generation          ⏳ Planned

Reports Module          ⏳ Planned

Company Settings        ⏳ Planned

Inventory Management    ⏳ Optional Future Enhancement
```

### 🎯 Upcoming Roadmap

```text
1. Forgot Password
2. Reset Password
3. Email Verification
4. Invoice PDF Generation
5. Reports & Analytics
6. Company Settings
7. Inventory Management
```


## 🏃‍♂️ Local Installation & Setup

1. **Clone the project repository:**
   ```bash
   git clone <your-repository-url>
   cd <project-folder-name>
   ```

2. **Install all essential modules:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a file named `.env` in the root folder and configure the following parameters:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key_string
   ```

4. **Boot up the server:**
   ```bash
   # Run development environment via nodemon
   npm run dev
   
   # Or run normal production environment
   npm start
   ```

---
Made with ❤️ by Developers for Developers. Happy Coding!

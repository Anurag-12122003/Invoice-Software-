User
 │
 └── Company
        │
        ├── Customer
        │       │
        │       └── Invoice
        │
        ├── Product
        │       │
        │       └── Invoice Item
        │
        └── Invoice
                 │
                 ├── Items
                 │
                 └── Payment

# user -> company (1 user make multiple company);
  1 User
   ↓
Many Companies

# company -> customer (1 company make multiple customer);
 1 Company
    ↓
Many Customers

# company -> product (1 company make multiple product);
 1 Company
    ↓
Many Products

# company -> Invoice (1 company make multiple invoice)
 1 Company
    ↓
Many Invoices

# customer -> Invoice (1 customer make multiple invoice)
  1 Customer
     ↓
Many Invoices

# Invoice -> Items (1 invoice make multiple items)
  1 Invoice
    ↓
Many Items



### Aur jab relation dena ho to
const customerSchema = new mongoose.Schema({
   company:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Company"
   }
});
 
### Aur jab data nikalna ho
const customer = await Customer.find()
   .populate("company");

# Relation in model in this project

User → Company (1:N)
Company → Customer (1:N)
Company → Product (1:N)
Company → Invoice (1:N)
Customer → Invoice (1:N)
Invoice → Payment (1:N)
Invoice → Items (1:N)
Product → Invoice Item (1:N)




# We use Tech Stack For 
    JWT -> For token generation
    cokkies parser -> For storing token in cookies
    bcryptjs -> For hashing password
    cors -> it  is a security mechanism restricting cross-origin website resource requests.
    dotenv -> for environment variable.
import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [2, "Name must be at least 2 characters long"],
      maxLength: [100, "Name must be at most 100 characters long"],
    },
    desctiption: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minLength: [10, "Description must be at least 10 characters long"],
      maxLength: [500, "Description must be at most 500 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a greater than 0"],
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      enum: ["USD", "EUR", "PKR"],
      default: "USD",
    },
    frequency: {
      type: String,
      required: [true, "Frequency is required"],
      enum: ["monthly", "yearly"],
      default: "monthly",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Entertainment", "Education", "Productivity", "Health", "Other"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      enum: ["Credit Card", "PayPal", "Bank Transfer"],
    },
    status: {
      type: String,
      enum: ["active", "expired", "canceled"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start Date must be in Past",
      },
    },
    renewalDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal Date must be after Start Date",
      },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    }
  },
  { timestamps: true },
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

//Auto-calculate renewal date based on frequency

subscriptionSchema.pre("save", function(next){
    if(!this.renewalDate){
        const renewalPeriods = {
        monthly: "30",
        yearly: "365"
    }



    this.renewalDate = new Date(this.startDate)
    this.renewalDate.setDate(this.renewalDate.getDate() + parseInt(renewalPeriods[this.frequency]))
}
if(this.renewalDate < new Date()){
    this.status = 'Expired'
}

next()
})
export default Subscription;

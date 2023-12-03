const Razorpay = require("razorpay");
const { RAZORPAY_API_KEY, RAZORPAY_API_SECRET } = require("../config");
const { APIError } = require("../utils/errors/app-errors");
const { GenerateHmacSha256 } = require("../utils/helpers");

class RazorpayService {
  constructor() {
    (this.apiKey = RAZORPAY_API_KEY),
      (this.apiSecret = RAZORPAY_API_SECRET),
      (this.rzp = new Razorpay({
        key_id: this.apiKey,
        key_secret: this.apiSecret,
      }));
  }

  async CreateRazorpayOrder(options) {
    try {
      const order = await this.rzp.orders.create(options);
      return order;
    } catch (e) {
      throw new APIError(e, e.statusCode);
    }
  }

  async VerifyOrder(options) {
    try {
      const { order_id, razorpay_payment_id, razorpay_signature } = options;
      const generated_signature = GenerateHmacSha256(
        `${order_id}|${razorpay_payment_id}`,
        this.apiSecret,
      );
      if (generated_signature == razorpay_signature) {
        return true;
      }
      return false;
    } catch (e) {
      throw new APIError(e, e.statusCode);
    }
  }
}

module.exports = RazorpayService;

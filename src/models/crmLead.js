const mongoose = require('mongoose');
const { Schema } = mongoose;

const crmLeadSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, default: 'new' }, // Статус лида (новый, в работе, закрыт и т.д.)
  orderDetails: { type: String, required: false }, // Информация о заказе
  createdAt: { type: Date, default: Date.now }
});

const CRMLead = mongoose.model('CRMLead', crmLeadSchema);
module.exports = CRMLead;

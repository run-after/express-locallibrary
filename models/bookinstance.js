var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const { DateTime } = require('luxon');

var BookInstanceSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, //reference to the associated book
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    due_back: {type: Date, default: Date.now}
  }
);

// Virtual for bookinstance's URL
BookInstanceSchema
.virtual('url')
.get(function () {
  return '/catalog/bookinstance/' + this._id;
});

BookInstanceSchema.virtual('due_back_formatted')
  .get(function () {
    return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
  });

BookInstanceSchema.virtual('form_due_back').get(function () {
  return `${this.due_back.getFullYear()}-${('0' + (this.due_back.getMonth() + 1)).slice(-2)}-${('0' + this.due_back.getDate()).slice(-2)}`;
})

//Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);
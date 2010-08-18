// Fix brain-damaged Error.toString()
if (new Error().toString() === '[object Error]') {
    Error.prototype.toString = function () {
	return this.name + ': ' +
	       (typeof this.description == 'string' ? this.description : this.message);
    };
}

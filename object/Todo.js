module.exports.Todo = function() {
  this.index =null;
  this.description = null;
  this.createdDate = null;
  this.lastDate = null
  this.owner = null;
  this.setIndex = function(index) {
    this.index=index;
  };
this.setCreatedDate = function(createdDate) {
    this.createdDate=createdDate;
  };
this.setDescription = function(description) {
    this.description=description;
  };
this.setLastDate = function(lastDate) {
    this.lastDate=lastDate;
  };
this.setOwner = function(owner) {
    this.owner=owner;
  };
};


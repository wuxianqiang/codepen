function Promise (executor) {
  let self = this;
  self.value = undefined;
  self.reason = undefined;
  self.status = 'pending';
  self.onResolvedCallbacks = [];
  self.onRejectedCallbacks = [];
  function resolve (value) {

  }
  function reject (reason) {

  }

  try {
    executor()
  } catch (error) {
    reject(error)
  }
}
